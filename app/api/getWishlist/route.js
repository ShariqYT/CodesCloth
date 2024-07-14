import connectDB from "@/db/connectDB";
import User from "@/models/User";
import Product from "@/models/Product";
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

        const products = await Product.find({ slug: { $in: userFind.wishlist } });
        return NextResponse.json({ products }, { status: 200 });
    } catch (err) {
        return NextResponse.json({ error: err }, { status: 500 });
    }
}