import connectDB from "@/db/connectDB";
import User from "@/models/User";
import Product from "@/models/Product";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        await connectDB();
        const user = await request.json();
        const userPhone = user.phoneNumber.split("+91")[1];
        const u = await User.findOne({ phone: userPhone });
        if (!u) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }
        const products = await Product.find({ slug: { $in: u.wishlist } });
        return NextResponse.json({ products }, { status: 200 });
    } catch (err) {
        return NextResponse.json({ error: err }, { status: 500 });
    }
}