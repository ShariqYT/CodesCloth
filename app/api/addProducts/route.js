"use server"

import { NextResponse } from "next/server";
import Product from "@/models/Product";
import connectDB from "@/db/connectDB";

export async function POST(request) {
    try {
        await connectDB();

        const body = await request.json();
        const { productTitle, description, image, productType, variants } = body;

        if (!variants || variants.length === 0) {
            return NextResponse.json({ success: false, error: "At least one variant is required" }, { status: 400 });
        }

        // Validate variants
        for (let variant of variants) {
            if (!variant.size || !variant.color || !variant.price || !variant.availableQty || !variant.slug) {
                return NextResponse.json({ success: false, error: "All fields in each variant are required" }, { status: 400 });
            }
        }

        // Check for existing products in bulk
        const slugs = variants.map(variant => variant.slug);
        const existingProducts = await Product.find({ slug: { $in: slugs } });

        if (existingProducts.length > 0) {
            return NextResponse.json({ success: false, error: "Some products already exist" }, { status: 400 });
        }

        // Save all variants
        const productPromises = variants.map(variant => {
            const product = new Product({
                title: productTitle,
                desc: description,
                slug: variant.slug,
                img: image,
                category: productType,
                size: variant.size,
                color: variant.color,
                price: variant.price,
                availableQty: variant.availableQty
            });
            return product.save();
        });

        await Promise.all(productPromises);

        return NextResponse.json({ success: true }, { status: 201 });

    } catch (err) {
        console.error(err);  // Log error for server-side debugging
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
