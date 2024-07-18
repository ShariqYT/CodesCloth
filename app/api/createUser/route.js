import connectDB from "@/db/connectDB";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        await connectDB();

        const { phoneNumber, userEmail } = await request.json();

        if (!phoneNumber && !userEmail) {
            return NextResponse.json({ error: "Phone number or email is required" }, { status: 200 });
        }

        let userExist;
        if (phoneNumber) {
            userExist = await User.findOne({ phone: phoneNumber });
        } else {
            userExist = await User.findOne({ email: userEmail });
        }

        if (!userExist) {
            const user = new User(phoneNumber ? { phone: phoneNumber } : { email: userEmail });
            await user.save();
            return NextResponse.json({ message: "User created", user }, { status: 201 });
        }

        return NextResponse.json({ message: "Welcome back" }, { status: 200 });
    } catch (err) {
        console.error("Error occurred:", err);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
