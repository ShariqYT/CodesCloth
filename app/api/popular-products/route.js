import connectDB from "@/db/connectDB";
import Product from "@/models/Product";
import { NextResponse } from "next/server";

export async function GET(request) {
    try {
        await connectDB();
        const products = await Product.find({}).sort({ rating: -1 }).limit(5);
        return NextResponse.json(products);
    } catch (err) {
        console.log(err);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}