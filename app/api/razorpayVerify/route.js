import { NextResponse } from "next/server";
import { validatePaymentVerification } from "razorpay/dist/utils/razorpay-utils";
import connectDB from "@/db/connectDB";
import Order from "@/models/Order";
import Product from "@/models/Product";

export const POST = async (req) => {
    try {
        await connectDB();
        const body = await req.json();
        const { orderCreationId, razorpayOrderId, razorpayPaymentId, razorpaySignature, cart } = body;

        let product, sumTotal = 0;
        for (let item in cart) {
            sumTotal += cart[item].price * cart[item].qty;
            product = await Product.findOne({ slug: item });

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
            let order = await Order.findOneAndUpdate({ orderId: orderCreationId }, { status: "Paid", paymentInfo: JSON.stringify(body), transactionId: razorpayPaymentId });
            let products = order.products;
            for(let slug in products) {
                await Product.findOneAndUpdate({ slug: slug }, {$inc:{ availableQty: - products[slug].qty }});
            }
            return NextResponse.json({ success: true, message: "Payment verified successfully", order }, { status: 200 });
        } else {
            await Order.findOneAndUpdate({ orderId: orderCreationId }, { status: "Failed" });
            return NextResponse.json({ success: false, error: "Payment verification failed" }, { status: 400 });
        }
    } catch (error) {
        console.error('Error verifying payment:', error);
        return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
    }
}
