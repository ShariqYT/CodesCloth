"use server"

import connectDB from "@/db/connectDB";
import Order from "@/models/Order";

export const getAllOrders = async () => {
    try {
        await connectDB();
        const orders = await Order.find({});
        return orders
    } catch (err) {
        console.log(err)
    }
}