import { NextResponse } from "next/server";
import Order from "@/models/Order";
import connectDB from "@/db/connectDB";

export async function GET(request) {
    try {
        await connectDB();

        const orders = await Order.find({});

        return NextResponse.json({ success: true, orders }, { status: 200 });

    } catch (err) {
        console.error('Error fetching orders:', err);
        return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
    }
}
