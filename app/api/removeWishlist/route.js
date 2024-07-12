import connectDB from "@/db/connectDB";
import User from "@/models/User";
import Product from "@/models/Product";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        await connectDB();
        const { user, slug: productId } = await request.json();
        const userPhone = user.phoneNumber.split("+91")[1];
        const u = await User.findOne({ phone: userPhone });
        if (!u) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        const product = await Product.findOne({ slug: productId });
        if (!product) {
            return NextResponse.json({ error: "Product not found" }, { status: 404 });
        }

        u.wishlist = u.wishlist.filter((p) => p !== productId);
        await u.save();
        return NextResponse.json({ success: true, message: "Product removed from wishlist" }, { status: 200 });
    } catch (err) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}