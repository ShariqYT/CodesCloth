import { NextResponse } from "next/server";
import Product from "@/models/Product";
import connectDB from "@/db/connectDB";

export async function GET(request) {
    try {
        await connectDB();

        const url = new URL(request.url);
        const category = url.searchParams.get('category');

        let products = await Product.find({ category });
        let tshirts = {}
        for (let item of products) {
            if (item.availableQty > 0) {
                if (item.title in tshirts) {
                    if (!tshirts[item.title].color.includes(item.color) && item.availableQty > 0) {
                        tshirts[item.title].color.push(item.color)
                    }
                    if (!tshirts[item.title].size.includes(item.size) && item.availableQty > 0) {
                        tshirts[item.title].size.push(item.size)
                    }
                } else {
                    tshirts[item.title] = JSON.parse(JSON.stringify(item))
                    if (item.availableQty > 0) {
                        tshirts[item.title].color = [item.color]
                        tshirts[item.title].size = [item.size]
                    } else {
                        tshirts[item.title].color = []
                        tshirts[item.title].size = []
                    }
                }
            }
        }

        return NextResponse.json(tshirts);
    } catch (err) {
        ('Error fetching products:', err);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}