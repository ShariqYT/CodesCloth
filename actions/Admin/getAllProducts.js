"use server"

import connectDB from "@/db/connectDB";
import Product from "@/models/Product";

export const getAllProducts = async () => {
    try {
        await connectDB();
        const productsRaw = await Product.find({});
        const products = JSON.parse(JSON.stringify(productsRaw))
        return products
    } catch (err) {
        console.log(err)
    }
}