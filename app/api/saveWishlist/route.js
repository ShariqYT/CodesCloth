import connectDB from "@/db/connectDB";
import Product from "@/models/Product";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        await connectDB();
        
        const { user, slug: productId } = await request.json();

        // Validate input
        if (!user || !productId) {
            return NextResponse.json({ error: "Missing user or product ID" }, { status: 400 });
        }

        // Find user
        let userFind;
        if (isNaN(user)) {
            userFind = await User.findOne({ email: user });
        } else {
            userFind = await User.findOne({ phone: user.split("+91")[1] });
        }

        if (!userFind) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        // Find product
        const product = await Product.findOne({ slug: productId });
        if (!product) {
            return NextResponse.json({ error: "Product not found" }, { status: 404 });
        }

        // Update wishlist
        const isProductInWishlist = userFind.wishlist.includes(productId);

        if (!isProductInWishlist) {
            userFind.wishlist.push(productId);
            await userFind.save();
            return NextResponse.json({ success: true, message: "Product added to wishlist" }, { status: 200 });
        } else {
            userFind.wishlist = userFind.wishlist.filter((p) => p !== productId);
            await userFind.save();
            return NextResponse.json({ success: false, message: "Product removed from wishlist" }, { status: 200 });
        }

    } catch (err) {
        console.error("Error saving wishlist:", err);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
