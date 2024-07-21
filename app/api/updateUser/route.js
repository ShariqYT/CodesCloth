import { NextResponse } from "next/server";
import connectDB from "@/db/connectDB";
import User from "@/models/User";

export async function POST(request) {
    try {
        await connectDB();
        const { name, email, phone, address, pincode } = await request.json();

        // Ensure either email or phone is provided for finding the user
        if (!email && !phone) {
            return NextResponse.json({ error: "Email or phone must be provided!" }, { status: 400 });
        }

        // Update user based on email or phone
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
                new: true, // Return the updated document
            }
        );

        // If no user is found or updated, return a 404 response
        if (!updatedUser) {
            return NextResponse.json({ error: "User not found or update failed!" }, { status: 404 });
        }

        // Return success response with updated user data
        return NextResponse.json({ success: true, message: "Updated successfully!", user: updatedUser }, { status: 200 });
    } catch (err) {
        // Handle and return error response
        return NextResponse.json({ error: "Internal server error", details: err.message }, { status: 500 });
    }
}
