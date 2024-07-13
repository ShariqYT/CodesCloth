import { NextResponse } from "next/server";
import connectDB from "@/db/connectDB";
import User from "@/models/User";

export async function POST(request) {
    try {
        await connectDB();
        const { name, email, phone, address, pincode } = await request.json();

        const updatedUser = await User.findOneAndUpdate(
            {
                $or: [{ phone: phone }, { email: email }],
            },
            {
                name: name,
                email: email,
                address: address,
                pincode: pincode,
                phone: phone
            },
            {
                new: true,
            }
        );
        if (!updatedUser) {
            return NextResponse.json({ error: "Update failed!" }, { status: 404 });
        }
        return NextResponse.json({ success: true, message: "Updated successfully!" }, { user: updatedUser }, { status: 200 });
    } catch (err) {
        return NextResponse.json({ error: err }, { status: 500 });
    }
}