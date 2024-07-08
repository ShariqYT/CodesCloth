import { NextResponse } from "next/server";
import Product from "@/models/Product";
import connectDB from "@/db/connectDB";

export async function POST(request) {
    try {
        // Connect to MongoDB
        await connectDB();

        const body = await request.json();
        console.log(body);

        const product = await Product.findOne({ slug: body.productSlug });
        if (product) {
            return NextResponse.json({ success: false, error: "Product already exists" }, { status: 200 });
        }
        // Create a new product instance
        let p = new Product({
            title: body.productTitle,
            desc: body.description,
            slug: body.productSlug,
            img: body.image,  // Store the file path in the img field
            category: body.productType,
            size: body.size,
            color: body.color,
            price: body.price,
            availableQty: body.availableQty,
        });

        // Validate required fields
        if (p.title && p.desc && p.slug && p.img && p.category && p.size && p.color && p.price && p.availableQty) {
            await p.save();
            return NextResponse.json({ success: true }, { status: 200 });
        } else {
            return NextResponse.json({ success: false, error: "All fields are required" }, { status: 400 });
        }

    } catch (err) {
        console.error("Internal Server Error:", err);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
