"use server"

import connectDB from "@/db/connectDB";
import Product from "@/models/Product";

export const getAllProducts = async () => {
    try {
        await connectDB();
        const products = await Product.find({});
        return products
    } catch (err) {
        console.log(err)
    }
}