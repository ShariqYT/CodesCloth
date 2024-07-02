import { NextResponse } from "next/server";
import Product from "@/models/Product";
import connectDB from "@/db/connectDB";

export async function POST(request) {
    try {
        const body = await request.json();
        await connectDB();
        for (let i = 0; i < body.length; i++) {
            let p = await Product.findByIdAndUpdate(body[i]._id, body[i]);
        }
        return NextResponse.json({success: "Success"});
    } catch (err) {
        (err)
    }
}