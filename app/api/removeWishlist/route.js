import connectDB from "@/db/connectDB";
import User from "@/models/User";
import Product from "@/models/Product";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        await connectDB();

        // Extract data from request
        const { user, slug: productId } = await request.json();

        // Validate input
        if (!user || !productId) {
            return NextResponse.json({ error: "User and productId are required" }, { status: 400 });
        }

        // Find user
        let userFind;
        if (isNaN(user)) {
            userFind = await User.findOne({ email: user });
        } else {
            userFind = await User.findOne({ phone: user });
        }

        if (!userFind) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        // Find product
        const product = await Product.findOne({ slug: productId });
        if (!product) {
            return NextResponse.json({ error: "Product not found" }, { status: 404 });
        }

        // Remove product from wishlist
        userFind.wishlist = userFind.wishlist.filter((p) => p !== productId);
        await userFind.save();

        return NextResponse.json({ success: true, message: "Product removed from wishlist" }, { status: 200 });

    } catch (err) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
