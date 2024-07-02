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

        let product = await Product.findOne({ slug });
        if (!product) {
            return NextResponse.json({ error: 'Product not found' }, { status: 404 });
        }

        let variants = await Product.find({ title: product.title });
        let colorSizeSlug = {};
        for (let item of variants) {
            if (Object.keys(colorSizeSlug).includes(item.color)) {
                colorSizeSlug[item.color][item.size] = { slug: item.slug };
            } else {
                colorSizeSlug[item.color] = {};
                colorSizeSlug[item.color][item.size] = { slug: item.slug };
            }
        }

        return NextResponse.json({ product, variants: colorSizeSlug });
    } catch (err) {
        ('Error fetching products:', err);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
