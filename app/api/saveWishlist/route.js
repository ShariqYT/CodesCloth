    import connectDB from "@/db/connectDB";
    import Product from "@/models/Product";
    import User from "@/models/User";
    import { NextResponse } from "next/server";

    export async function POST(request) {
        try {
            await connectDB();
            const { user, slug: productId } = await request.json();

            let userFind;
            if(isNaN(user)){
                userFind = await User.findOne({email: user}); 
            }else{
                userFind = await User.findOne({phone: user.split("+91")[1]});
            }
            
            const product = await Product.findOne({slug: productId});
            if (!product) {
                return NextResponse.json({ error: "Product not found" }, { status: 404 });
            }

            if (!userFind.wishlist.includes(productId)) {
                userFind.wishlist.push(productId);
                await userFind.save();
                return NextResponse.json({ success: true, message: "Product added to wishlist" }, { status: 200 });
            } else {
                userFind.wishlist = userFind.wishlist.filter((p) => p !== productId);
                await userFind.save();
                return NextResponse.json({ success: false }, { status: 200 });
            }
        } catch (err) {
            return NextResponse.json({ error: err }, { status: 500 });
        }
    }