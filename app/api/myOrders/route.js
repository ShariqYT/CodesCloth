import connectDB from "@/db/connectDB";
import Order from "@/models/Order";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        await connectDB();

        const user = await User.findOne({ phone: 8545994449 });

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        const orders = await Order.find({ phone: user.phone, status: "Paid" }).sort({ createdAt: -1 });

        return NextResponse.json({ orders }, { status: 200 });
    } catch (err) {
        return NextResponse.json({ error: err }, { status: 500 });
    }
}
