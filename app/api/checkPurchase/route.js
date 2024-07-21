"use server"

import connectDB from "@/db/connectDB";
import { NextResponse } from "next/server";
import Order from "@/models/Order";

export async function GET(req) {
    try {
        await connectDB();
        const url = new URL(req.url);
        const productId = url.searchParams.get('productId');
        const user = url.searchParams.get('user');

        if (!productId || !user) {
            return NextResponse.json({ error: "Missing productId or user" }, { status: 400 });
        }

        const query = { [`products.${productId}`]: { $exists: true }, status: "Paid" };
        if (isNaN(user)) {
            query.email = user;
        } else {
            query.phone = user;
        }

        const purchase = await Order.findOne(query);

        return NextResponse.json({ hasPurchased: !!purchase }, { status: 200 });
    } catch (err) {
        console.error(err);  // Log the error for debugging
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
