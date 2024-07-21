import connectDB from "@/db/connectDB";
import Product from "@/models/Product";
import { NextResponse } from "next/server";

export async function GET(request) {
    try {
        await connectDB();
        // Fetch the top 5 products sorted by rating in descending order
        const products = await Product.find({})
            .sort({ rating: -1 })
            .limit(5)
            .exec(); // Explicitly execute the query to ensure correct behavior

        // Respond with the products in JSON format
        return NextResponse.json(products);
    } catch (err) {
        console.error("Error fetching popular products:", err); // More descriptive logging
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
