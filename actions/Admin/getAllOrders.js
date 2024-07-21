"use server";

import connectDB from "@/db/connectDB";
import Order from "@/models/Order";

export const getAllOrders = async () => {
    try {
        await connectDB();
        const orders = await Order.find({ status: "Paid" }).exec();
        return orders;
    } catch (err) {
        console.error("Error fetching orders:", err);
        throw new Error("Failed to fetch orders");
    }
}
