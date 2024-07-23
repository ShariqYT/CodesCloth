import { NextResponse } from "next/server";
import Product from "@/models/Product";
import connectDB from "@/db/connectDB";

export async function GET(request) {
    try {
        await connectDB();

        const { searchParams } = new URL(request.url);
        const slug = searchParams.get('slug');
        if (!slug) {
            return NextResponse.json({ error: 'Slug is required' }, { status: 400 });
        }

        const product = await Product.findOne({ slug });
        if (!product) {
            return NextResponse.json({ error: 'Product not found' }, { status: 404 });
        }

        const variants = await Product.find({ title: product.title });
        const colorSizeSlug = {};

        for (const item of variants) {
            if (!colorSizeSlug[item.color]) {
                colorSizeSlug[item.color] = {};
            }
            colorSizeSlug[item.color][item.size] = { slug: item.slug };
        }

        return NextResponse.json({ product, variants: colorSizeSlug, title: variants });
    } catch (err) {
        console.error('Error fetching product:', err);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
