import connectDB from "@/db/connectDB";
import User from "@/models/User";
import Product from "@/models/Product";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        await connectDB();
        const { user, slug: productId } = await request.json();
        let userFind;
        if (isNaN(user)) {
            userFind = await User.findOne({ email: user });
        } else {
            userFind = await User.findOne({ phone: user });
        }

        const product = await Product.findOne({ slug: productId });
        if (!product) {
            return NextResponse.json({ error: "Product not found" }, { status: 404 });
        }

        userFind.wishlist = userFind.wishlist.filter((p) => p !== productId);
        await userFind.save();
        return NextResponse.json({ success: true, message: "Product removed from wishlist" }, { status: 200 });
    } catch (err) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}