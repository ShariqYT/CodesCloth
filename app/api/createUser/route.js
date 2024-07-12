import connectDB from "@/db/connectDB";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        await connectDB();

        const { phoneNumber } = await request.json();
        const userExist = await User.findOne({ phone: phoneNumber });
        if (!userExist) {
            const user = new User({
                phone: phoneNumber
            });
            await user.save();
            return NextResponse.json({ user }, { status: 200 });
        }

        return NextResponse.json({ message: "Welcome Back" }, { status: 200 });
    } catch (err) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}