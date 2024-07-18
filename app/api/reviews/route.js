import connectDB from "@/db/connectDB";
import { NextResponse } from "next/server";
import { onAuthStateChanged, getAuth, } from "firebase/auth";
import { app } from '@/app/config';
import Product from "@/models/Product";
import User from "@/models/User";
import Review from "@/models/Review";


export async function POST(request) {
    try {
        const result = onAuthStateChanged(getAuth(app), async (user) => {
            if (!user) {
                return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
            }
        });
        await connectDB();
        const { productId, rating, comment, subject, user } = await request.json();
        if (!productId || !rating || !comment || !subject) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 200 });
        }

        const product = await Product.findOne({ slug: productId });
        if (!product) {
            return NextResponse.json({ error: "You have to purchase this product to leave a review" }, { status: 404 });
        }

        const existingReview = await Review.findOne({ user: user, productId });
        if (existingReview) {
            return NextResponse.json({ error: "You have already left a review for this product" }, { status: 200 });
        }

        let userFind;
        if (isNaN(user)) {
            userFind = await User.findOne({ email: user });
        } else {
            userFind = await User.findOne({ phone: user });
        }
        const newReview = new Review({
            name: userFind.name,
            user: user,
            productId,
            rating,
            subject,
            comment,
            date: new Date()
        });

        await newReview.save();
        return NextResponse.json({ success: true, message: "Thanks for reviewing our product" }, { status: 200 });

    } catch (err) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}

export async function GET(req) {
    const productId = req.nextUrl.searchParams.get('productId');
    try {
        await connectDB();
        const reviews = await Review.find({ productId }).sort({ date: -1 });
        return NextResponse.json(reviews, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
    }
}