import connectDB from "@/db/connectDB";
import Order from "@/models/Order";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        await connectDB();

        const { user } = await request.json();
        let userFind;

        if (isNaN(user)) {
            userFind = await User.findOne({ email: user });
        } else {
            userFind = await User.findOne({ phone: user.split("+91")[1] });
        }
    

        let orders;
        if(userFind.phone) {
            orders = await Order.find({ phone: userFind.phone, status: "Paid" }).sort({ createdAt: -1 });
        } else {
            orders = await Order.find({ email: userFind.email, status: "Paid" }).sort({ createdAt: -1 });
        }
        if(!orders) {
            return NextResponse.json({ error: "No orders found" }, { status: 404 });
        }


        return NextResponse.json({ orders }, { status: 200 });
    } catch (err) {
        return NextResponse.json({ error: err }, { status: 500 });
    }
}
