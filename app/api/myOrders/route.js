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
            orders = await Order.find({ phone: userFind.phone });
        } else {
            orders = await Order.find({ email: userFind.email });
        }

        return NextResponse.json({ orders }, { status: 200 });
    } catch (err) {
        return NextResponse.json({ error: err }, { status: 500 });
    }
}
