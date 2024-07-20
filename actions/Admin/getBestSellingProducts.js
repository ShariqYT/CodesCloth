"use server";
import connectDB from "@/db/connectDB";
import Product from "@/models/Product";
import { cache } from "react";

export const getBestSellingProducts = cache(async () => {
    try {
        await connectDB();

        // Get distinct categories
        const distinctCategories = await Product.distinct("category");

        // Array to hold the top product per category
        let topProducts = [];

        // Iterate through each category
        for (const category of distinctCategories) {
            // Fetch the top product for the current category
            const product = await Product.findOne({ category })
                .sort({ sold: -1 });

            // Push the top product to the result array
            if (product) {
                topProducts.push(product);
            }
        }

        const finalBestProdcuts = JSON.stringify(topProducts.slice(0, 5));
        // Return the top product from each category, limited to 5 products
        return finalBestProdcuts;
    } catch (err) {
        console.log(err);
        return []; // Return an empty array or handle error as per your application's needs
    }
});
