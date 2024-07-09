import { NextResponse } from "next/server";
import Product from "@/models/Product";
import connectDB from "@/db/connectDB";

export async function POST(request) {
    try {
        await connectDB();

        const body = await request.json();
        const { variants } = body;

        // Check for existing product for each variant's slug
        for (let variant of variants) {
            const existingProduct = await Product.findOne({ slug: variant.slug });
            if (existingProduct) {
                return NextResponse.json({ success: false, error: `Product already exists` }, { status: 200 });
            }
        }

        if (!variants || variants.length === 0) {
            return NextResponse.json({ success: false, error: "At least one variant is required" }, { status: 200 });
        }

        // Save all variants
        for (let variant of variants) {
            if (!variant.size || !variant.color || !variant.price || !variant.availableQty) {
                return NextResponse.json({ success: false, error: "All fields in each variant are required" }, { status: 200 });
            }

            let p = new Product({
                title: body.productTitle,
                desc: body.description,
                slug: variant.slug,
                img: body.image,
                category: body.productType,
                size: variant.size,
                color: variant.color,
                price: variant.price,
                availableQty: variant.availableQty
            });

            await p.save();
        }

        return NextResponse.json({ success: true }, { status: 200 });

    } catch (err) {
        console.error("Internal Server Error:", err);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
