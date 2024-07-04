import { NextResponse } from "next/server";
import Order from "@/models/Order";
import connectDB from "@/db/connectDB";

export async function GET(req) {
    try {
        await connectDB();

        const url = new URL(req.url);
        const orderId = url.search.split('=')[1];

        if (!orderId) {
            return NextResponse.json({ error: 'Order ID is required' }, { status: 400 });
        }

        const order = await Order.findOne({ _id: orderId });
        if (!order) {
            return NextResponse.json({ error: 'Order not found' }, { status: 404 });
        }

        return NextResponse.json({ order });
    } catch (err) {
        console.error('Error fetching order:', err);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
