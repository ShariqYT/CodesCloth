import connectDB from "@/db/connectDB";
import User from "@/models/User";
import Product from "@/models/Product";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        await connectDB();
        const { user } = await request.json();

        if (!user) {
            return NextResponse.json({ error: "User parameter is required" }, { status: 400 });
        }

        let userFind;
        if (isNaN(user)) {
            userFind = await User.findOne({ email: user }).exec();
        } else {
            const phone = user.replace("+91", ""); // Adjust this if needed
            userFind = await User.findOne({ phone }).exec();
        }

        if (!userFind) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        const products = await Product.find({ slug: { $in: userFind.wishlist } }).exec();
        
        return NextResponse.json({ products }, { status: 200 });
    } catch (err) {
        console.error("Error in getWishlist API:", err);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
