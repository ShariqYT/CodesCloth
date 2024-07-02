import { NextResponse } from "next/server";
import Order from "@/models/Order";
import connectDB from "@/db/connectDB";

export async function GET(request) {
    try {
        await connectDB();

        let orders = await Order.find({});
        return NextResponse.json({ orders: orders });

    } catch (err) {
        ('Error fetching orders:', err);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
