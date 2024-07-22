import { NextResponse } from "next/server";
import crypto from "crypto";
import connectDB from "@/db/connectDB";
import Order from "@/models/Order";

export async function POST(req) {
    try {
        await connectDB();

        const razorpaySignature = req.headers['x-razorpay-signature'];
        const body = await req.text();
        const secret = process.env.RAZORPAY_WEBHOOK_SECRET;

        const expectedSignature = crypto
            .createHmac('sha256', secret)
            .update(body)
            .digest('hex');

        if (razorpaySignature !== expectedSignature) {
            return NextResponse.json({ success: false, error: "Invalid signature" }, { status: 400 });
        }

        const event = JSON.parse(body);
        
        if (event.event === 'payment.failed') {
            const orderId = event.payload.payment.entity.order_id;

            await Order.findOneAndUpdate({ orderId }, { status: 'Failed' });
        }

        return NextResponse.json({ success: true, message: "Webhook handled successfully" }, { status: 200 });
    } catch (error) {
        console.error('Error handling webhook:', error);
        return NextResponse.json({ success: false, error: error.message || 'An unexpected error occurred' }, { status: 500 });
    }
}
