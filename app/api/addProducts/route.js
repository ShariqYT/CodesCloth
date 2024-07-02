import { NextResponse } from "next/server";
import Product from "@/models/Product";
import connectDB from "@/db/connectDB";

export async function POST(request) {
    try {
        const body = await request.json();
        await connectDB();
        for (let i = 0; i < body.length; i++) {
            let p = new Product({
                title: body[i].title,
                desc: body[i].desc,
                slug: body[i].slug,
                img: body[i].img,
                category: body[i].category,
                size: body[i].size,
                color: body[i].color,
                price: body[i].price,
                availableQty: body[i].availableQty,
            });
            await p.save();
        }
        return NextResponse.json("Success");
    } catch (err) {
        (err)
    }
}