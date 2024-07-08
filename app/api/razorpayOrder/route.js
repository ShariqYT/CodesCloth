import Razorpay from 'razorpay';
import { NextResponse } from 'next/server';
import Order from '@/models/Order';
import Product from '@/models/Product';
import connectDB from '@/db/connectDB';
import pincodes from '../../../pincodes.json'

const razorpay = new Razorpay({
    key_id: process.env.NEXT_PUBLIC_RAZORPAY_ID,
    key_secret: process.env.RAZORPAY_SECRET,
});

export async function POST(request) {
    try {
        const { amount, currency, name, city, state, email, address, phone, pincode, oid, cart, subTotal } = await request.json();
        await connectDB();

        var options = {
            amount: amount * 100,
            currency: currency,
            receipt: 'rcp1',
        };
        const order = await razorpay.orders.create(options);

        if(!Object.keys(pincodes).includes(pincode)){
            return NextResponse.json({ success: false, error: 'This pincode is not serviceable', clearCart: false }, { status: 200 });
        }

        let product, sumTotal = 0;
        for (let item in cart) {
            sumTotal += cart[item].price * cart[item].qty;
            product = await Product.findOne({ slug: item });

            if (!product) {
                return NextResponse.json({ success: false, error: 'Product not found. Please try again later' }, { status: 200 });
            }

            if (product.availableQty < cart[item].qty) {
                return NextResponse.json({ success: false, error: 'Product out of stock. Please try again later', clearCart: true }, { status: 200 });
            }

            if (product.price !== cart[item].price) {
                return NextResponse.json({ success: false, error: 'Price has been changed. Please try again later', clearCart: true }, { status: 200 });
            }
        }
        if (sumTotal !== subTotal) {
            return NextResponse.json({ success: false, error: 'Price has been changed. Please try again later', clearCart: true }, { status: 200 });
        }
        if (pincode.length !== 6) {
            return NextResponse.json({ success: false, error: 'Invalid PinCode. Please enter valid pincode', clearCart: false }, { status: 200 });
        }

        let newOrder = new Order({
            orderId: order.id,
            oid: oid,
            amount: amount,
            address: address,
            city: city,
            state: state,
            pincode: pincode,
            phone: phone,
            currency: currency,
            products: cart,
            name: name,
            email: email,
        });

        await newOrder.save();

        return NextResponse.json({ success: true, orderId: order.id }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ success: false, error: 'Price has been changed. Please try again later' }, { status: 500 });
    }
}
