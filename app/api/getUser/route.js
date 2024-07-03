import { NextResponse } from "next/server";
import connectDB from "@/db/connectDB";
import User from "@/models/User";

export async function POST(request) {
    try {
        await connectDB();
        const { userPhone } = await request.json();
        const user = await User.findOne({ phone: userPhone });
        const { name, email, address, pincode } = user;

        return NextResponse.json({ success: true, name, email, address, pincode} , { status: 200 });
    } catch (err) {
        console.error("Error updating user:", err);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
