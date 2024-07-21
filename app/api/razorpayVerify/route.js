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

        // Validate if all necessary fields are present
        if (!orderCreationId || !razorpayOrderId || !razorpayPaymentId || !razorpaySignature || !cart) {
            return NextResponse.json({ success: false, error: 'Missing required fields' }, { status: 400 });
        }

        // Calculate total price
        let sumTotal = 0;
        const productSlugs = Object.keys(cart);
        const products = await Product.find({ slug: { $in: productSlugs } });

        // Create a map of slugs to products for quick lookup
        const productMap = products.reduce((map, product) => {
            map[product.slug] = product;
            return map;
        }, {});

        // Verify each product in the cart
        for (let slug in cart) {
            const product = productMap[slug];
            const cartItem = cart[slug];

            if (!product) {
                return NextResponse.json({ success: false, error: 'Product not found. Please try again later' }, { status: 404 });
            }

            sumTotal += product.price * cartItem.qty;

            if (product.availableQty < cartItem.qty) {
                return NextResponse.json({ success: false, error: 'Product out of stock. Please try again later' }, { status: 500 });
            }

            if (product.price !== cartItem.price) {
                return NextResponse.json({ success: false, error: 'Price has been changed. Please try again later or Pay at your own risk' }, { status: 500 });
            }
        }

        // Verify the order
        const order = await Order.findOne({ orderId: orderCreationId });
        if (!order) {
            return NextResponse.json({ success: false, error: "Order ID not found" }, { status: 404 });
        }

        // Validate the payment verification
        const isValid = validatePaymentVerification(
            { order_id: razorpayOrderId, payment_id: razorpayPaymentId },
            razorpaySignature,
            process.env.RAZORPAY_SECRET
        );

        if (isValid) {
            // Update promo code usage
            if (promocode) {
                const promoCode = await PromoCodes.findOne({ code: promocode });
                if (promoCode) {
                    await PromoCodes.updateOne({ code: promocode }, { $inc: { used: 1 } });
                } else {
                    return NextResponse.json({ success: false, error: 'Invalid discount code' }, { status: 400 });
                }
            }

            // Update order status and payment info
            await Order.findOneAndUpdate(
                { orderId: orderCreationId },
                { status: "Paid", paymentInfo: JSON.stringify(body), transactionId: razorpayPaymentId }
            );

            // Update product quantities and sold counts
            const productsToUpdate = order.products;
            for (let slug in productsToUpdate) {
                await Product.findOneAndUpdate(
                    { slug: slug },
                    { $inc: { availableQty: -productsToUpdate[slug].qty, sold: productsToUpdate[slug].qty } }
                );
            }

            return NextResponse.json({ success: true, message: "Payment verified successfully", order }, { status: 200 });
        } else {
            // Handle payment verification failure
            await Order.findOneAndUpdate({ orderId: orderCreationId }, { status: "Failed" });
            return NextResponse.json({ success: false, error: "Payment verification failed" }, { status: 400 });
        }
    } catch (error) {
        console.error("Error verifying payment:", error); // Add logging for debugging
        return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
    }
};
