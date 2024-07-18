import connectDB from "@/db/connectDB";
import { NextResponse } from "next/server";
import Order from "@/models/Order";

export async function GET(req) {
    await connectDB();
    const url = new URL(req.url);
    const productId = url.searchParams.get('productId');
    const user = url.searchParams.get('user');

    if (!productId || !user) {
        return new NextResponse(JSON.stringify({ error: "Missing productId or user" }), { status: 200 });
    }

    let purchase;
    if (isNaN(user)) {
        purchase = await Order.findOne({ [`products.${productId}`]: { $exists: true }, email: user, status: "Paid" });
    } else {
        purchase = await Order.findOne({ [`products.${productId}`]: { $exists: true }, phone: user, status: "Paid" });
    }


    if (purchase) {
        return new NextResponse(JSON.stringify({ hasPurchased: true }), { status: 200 });
    } else {
        return new NextResponse(JSON.stringify({ hasPurchased: false }), { status: 200 });
    }
}
