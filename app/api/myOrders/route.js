import connectDB from "@/db/connectDB";
import Order from "@/models/Order";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        await connectDB();

        const { user } = await request.json();

        if (!user) {
            return NextResponse.json({ error: "User identifier is required" }, { status: 400 });
        }

        let userFind;

        if (isNaN(user)) {
            userFind = await User.findOne({ email: user });
        } else {
            userFind = await User.findOne({ phone: user.split("+91")[1] });
        }

        if (!userFind) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        let orders;
        if (userFind.phone) {
            orders = await Order.find({ phone: userFind.phone, status: "Paid" }).sort({ createdAt: -1 });
        } else if (userFind.email) {
            orders = await Order.find({ email: userFind.email, status: "Paid" }).sort({ createdAt: -1 });
        } else {
            return NextResponse.json({ error: "No valid phone or email found for user" }, { status: 404 });
        }

        if (orders.length === 0) {
            return NextResponse.json({ error: "No orders found" }, { status: 404 });
        }

        return NextResponse.json({ orders }, { status: 200 });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: "An error occurred while processing your request" }, { status: 500 });
    }
}
