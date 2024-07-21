import Razorpay from 'razorpay';
import { NextResponse } from 'next/server';
import Order from '@/models/Order';
import Product from '@/models/Product';
import connectDB from '@/db/connectDB';

const razorpay = new Razorpay({
    key_id: process.env.NEXT_PUBLIC_RAZORPAY_ID,
    key_secret: process.env.RAZORPAY_SECRET,
});

export async function POST(request) {
    try {
        // Parse the request body
        const { amount, currency, name, city, state, email, address, phone, pincode, oid, cart, subTotal, user } = await request.json();
        
        // Connect to the database
        await connectDB();

        // Check if user is authenticated
        if (!user) {
            return NextResponse.json({ success: false, error: 'Sign-In Required' }, { status: 401 }); // Use 401 Unauthorized status
        }

        // Prepare Razorpay order options
        const options = {
            amount: amount * 100, // Convert to paise
            currency: currency,
            receipt: `rcp-${Date.now()}`, // Use timestamp for unique receipt
        };

        // Create an order with Razorpay
        const order = await razorpay.orders.create(options);

        let sumTotal = 0;

        // Validate cart items
        for (let itemSlug in cart) {
            const cartItem = cart[itemSlug];

            // Validate cart item structure
            if (!cartItem || typeof cartItem.price !== 'number' || typeof cartItem.qty !== 'number') {
                return NextResponse.json({ success: false, error: 'Invalid cart item structure' }, { status: 400 }); // Use 400 Bad Request status
            }

            sumTotal += cartItem.price * cartItem.qty;
            const product = await Product.findOne({ slug: itemSlug });

            // Check if the product exists
            if (!product) {
                return NextResponse.json({ success: false, error: `Product not found: ${itemSlug}` }, { status: 404 }); // Use 404 Not Found status
            }

            // Check stock and price consistency
            if (product.availableQty < cartItem.qty) {
                return NextResponse.json({ success: false, error: `Product out of stock: ${itemSlug}`, clearCart: true }, { status: 400 });
            }

            if (product.price !== cartItem.price) {
                return NextResponse.json({ success: false, error: `Price changed for product: ${itemSlug}`, clearCart: true }, { status: 400 });
            }
        }

        // Validate subtotal
        if (sumTotal !== subTotal) {
            return NextResponse.json({ success: false, error: 'Subtotal mismatch. Please try again later', clearCart: true }, { status: 400 });
        }

        // Validate pincode
        if (pincode.length !== 6) {
            return NextResponse.json({ success: false, error: 'Invalid PinCode. Please enter a valid pincode', clearCart: false }, { status: 400 });
        }

        // Create and save the new order
        const newOrder = new Order({
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
        console.error('Error creating order:', error);
        return NextResponse.json({ success: false, error: error.message || 'An unexpected error occurred' }, { status: 500 });
    }
}
