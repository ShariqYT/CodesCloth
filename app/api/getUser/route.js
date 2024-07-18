import { NextResponse } from "next/server";
import connectDB from "@/db/connectDB";
import User from "@/models/User";

export async function POST(request) {
    try {
        await connectDB();
        const { user } = await request.json();

        
        const query = isNaN(user) ? { email: user } : { phone: Number(user) };
        const userFind = await User.findOne(query);

        const { name, email, address, pincode, phone } = userFind;

        return NextResponse.json({ success: true, name, email, address, pincode, phone }, { status: 200 });
    } catch (err) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 200 });
    }
}
