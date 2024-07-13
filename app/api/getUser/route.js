import { NextResponse } from "next/server";
import connectDB from "@/db/connectDB";
import User from "@/models/User";

export async function POST(request) {
    try {
        await connectDB();
        const { user } = await request.json();
        console.log(user);

        // Determine if the user input is an email or phone number
        const query = {};
        if (isNaN(user)) {
            query.email = user;
        } else {
            query.phone = Number(user);
        }

        console.log(query);
        const userFind = await User.findOne(query);
        console.log(userFind);

        const { name, email, address, pincode, phone } = userFind;

        return NextResponse.json({ success: true, name, email, address, pincode, phone }, { status: 200 });
    } catch (err) {
        console.error("Error occurred:", err);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
