import { NextResponse } from "next/server";
import Product from "@/models/Product";
import connectDB from "@/db/connectDB";

export async function GET(request) {
    try {
        await connectDB();

        const url = new URL(request.url);
        const category = url.searchParams.get('category');
        const colors = url.searchParams.get('colors')?.split(',').map(color => {
            return color.charAt(0).toUpperCase() + color.slice(1).toLowerCase();
        });
        const sizes = url.searchParams.get('sizes')?.split(',').map(size => {
            return size.toUpperCase();
        });;
        const sort = url.searchParams.get('sort');

        let query = { category };
        if (colors && colors.length > 0) {
            query.color = { $in: colors };
        }
        if (sizes && sizes.length > 0) {
            query.size = { $in: sizes };
        }

        let products = await Product.find(query);
        let filteredProducts = products.reduce((acc, item) => {
            if (item.availableQty > 0) {
                if (acc[item.title]) {
                    if (!acc[item.title].color.includes(item.color)) {
                        acc[item.title].color.push(item.color);
                    }
                    if (!acc[item.title].size.includes(item.size)) {
                        acc[item.title].size.push(item.size);
                    }
                } else {
                    acc[item.title] = JSON.parse(JSON.stringify(item));
                    acc[item.title].color = [item.color];
                    acc[item.title].size = [item.size];
                }
            }
            return acc;
        }, {});

        // Convert object to array for sorting
        let filteredProductsArray = Object.values(filteredProducts);

        // Apply sorting
        if (sort === 'price: low to high') {
            filteredProductsArray.sort((a, b) => a.price - b.price);
        } else if (sort === 'price: high to low') {
            filteredProductsArray.sort((a, b) => b.price - a.price);
        }

        return NextResponse.json(filteredProductsArray);
    } catch (err) {
        console.error('Error fetching products:', err);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
