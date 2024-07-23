import { NextResponse } from "next/server";
import Product from "@/models/Product";
import connectDB from "@/db/connectDB";

export async function GET(request) {
    try {
        await connectDB();

        const url = new URL(request.url);
        const category = url.searchParams.get('category');
        const colors = url.searchParams.get('colors')?.split(',').map(color => color.charAt(0).toUpperCase() + color.slice(1).toLowerCase());
        const sizes = url.searchParams.get('sizes')?.split(',').map(size => size.toUpperCase());
        const sort = url.searchParams.get('sort');
        const page = parseInt(url.searchParams.get('page')) || 1;  // Default to page 1
        const limit = parseInt(url.searchParams.get('limit')) || 20;  // Default to 20 products per page

        // Build query object
        let query = {};
        if (category) query.category = category;
        if (colors && colors.length > 0) query.color = { $in: colors };
        if (sizes && sizes.length > 0) query.size = { $in: sizes };

        // Fetch products from DB
        let products = await Product.find(query);

        // Filter products based on availability and construct final products list
        let filteredProducts = products.filter(item => item.availableQty > 0)
            .reduce((acc, item) => {
                if (!acc[item.title]) {
                    acc[item.title] = { ...item._doc, color: [], size: [] }; // Avoid mutating original data
                }
                if (!acc[item.title].color.includes(item.color)) {
                    acc[item.title].color.push(item.color);
                }
                if (!acc[item.title].size.includes(item.size)) {
                    acc[item.title].size.push(item.size);
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

        // Get total count of products for pagination
        const totalProducts = filteredProductsArray.length;

        // Apply pagination
        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + limit;
        const paginatedProducts = filteredProductsArray.slice(startIndex, endIndex);

        // Return paginated products and total count
        return NextResponse.json({ totalProducts, products: paginatedProducts });
    } catch (err) {
        console.error('Error fetching products:', err);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
