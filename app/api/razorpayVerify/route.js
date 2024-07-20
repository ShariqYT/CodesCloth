import { NextResponse } from "next/server";
import { validatePaymentVerification } from "razorpay/dist/utils/razorpay-utils";
import connectDB from "@/db/connectDB";
import Order from "@/models/Order";
import Product from "@/models/Product";
import PromoCodes from "@/models/PromoCodes";

export const POST = async (req) => {
    try {
        await connectDB();
        const body = await req.json();
        const { orderCreationId, razorpayOrderId, promocode, razorpayPaymentId, razorpaySignature, cart } = body;

        let sumTotal = 0;
        for (let item in cart) {
            sumTotal += cart[item].price * cart[item].qty;
            const product = await Product.findOne({ slug: item });

            if (!product) {
                return NextResponse.json({ success: false, error: 'Product not found. Please try again later' }, { status: 404 });
            }

            if (product.availableQty < cart[item].qty) {
                return NextResponse.json({ success: false, error: 'Product out of stock. Please try again later' }, { status: 500 });
            }

            if (product.price !== cart[item].price) {
                return NextResponse.json({ success: false, error: 'Price has been changed. Please try again later or Pay at your own risk' }, { status: 500 });
            }
        }

        const order = await Order.findOne({ orderId: orderCreationId });

        if (!order) {
            return NextResponse.json({ success: false, error: "Order ID not found" }, { status: 404 });
        }

        const isValid = validatePaymentVerification(
            { order_id: razorpayOrderId, payment_id: razorpayPaymentId },
            razorpaySignature,
            process.env.RAZORPAY_SECRET
        );

        if (isValid) {
            if (promocode) {
                const promoCode = await PromoCodes.findOne({ code: promocode });
                if (promoCode) {
                    await PromoCodes.updateOne({ code: promocode }, { $inc: { used: 1 } });
                } else {
                    return NextResponse.json({ success: false, error: 'Invalid discount code' }, { status: 200 });
                }
            }
            await Order.findOneAndUpdate({ orderId: orderCreationId }, { status: "Paid", paymentInfo: JSON.stringify(body), transactionId: razorpayPaymentId });
            const products = order.products;
            for (let slug in products) {
                await Product.findOneAndUpdate({ slug: slug }, { $inc: { availableQty: -products[slug].qty, sold: products[slug].qty } });
            }
            return NextResponse.json({ success: true, message: "Payment verified successfully", order }, { status: 200 });
        } else {
            // Handle case where payment verification fails (user closed the window)
            await Order.findOneAndUpdate({ orderId: orderCreationId }, { status: "Failed" });
            return NextResponse.json({ success: false, error: "Payment verification failed" }, { status: 200 });
        }
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
