import connectDB from "@/db/connectDB";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        await connectDB();

        const { phoneNumber, userEmail } = await request.json();

        // Validate input
        if (!phoneNumber && !userEmail) {
            return NextResponse.json({ success: false, error: "Phone number or email is required" }, { status: 400 });
        }

        if (phoneNumber && userEmail) {
            return NextResponse.json({ success: false, error: "Only one of phone number or email should be provided" }, { status: 400 });
        }

        // Check if user exists
        let userExist;
        if (phoneNumber) {
            userExist = await User.findOne({ phone: phoneNumber });
        } else {
            userExist = await User.findOne({ email: userEmail });
        }

        if (!userExist) {
            // Create a new user
            const newUser = new User(phoneNumber ? { phone: phoneNumber } : { email: userEmail });
            await newUser.save();
            return NextResponse.json({ success: true, message: "User created successfully", user: newUser }, { status: 201 });
        }

        return NextResponse.json({ success: true, message: "Welcome back" }, { status: 200 });
    } catch (err) {
        console.error("Error occurred:", err);
        return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
    }
}
