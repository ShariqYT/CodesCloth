"use server"

import connectDB from '@/db/connectDB';
import PromoCodes from '@/models/PromoCodes';

export async function POST(request) {
    await connectDB();

    const { promoCode, subTotal } = await request.json();

    if (!promoCode) {
        return new Response(
            JSON.stringify({ success: false, error: 'Promo code must be provided' }),
            { status: 400 }
        );
    }

    try {
        const promo = await PromoCodes.findOne({ code: promoCode, active: true });

        if (!promo) {
            return new Response(
                JSON.stringify({ success: false, error: 'Invalid or expired promo code' }),
                { status: 400 }
            );
        }

        const currentDate = new Date();
        if (promo.expiry < currentDate) {
            await PromoCodes.updateOne({ code: promoCode }, { active: false });
            return new Response(
                JSON.stringify({ success: false, error: 'Promo code has expired' }),
                { status: 400 }
            );
        }

        const discountAmount = promo.discountType === 'percentage'
            ? (promo.discountAmount / 100) * subTotal
            : promo.discountAmount;

        if (promo.limit > 0 && promo.used >= promo.limit) {
            await PromoCodes.updateOne({ code: promoCode }, { active: false });
            return new Response(
                JSON.stringify({ success: false, error: 'Promo code limit reached' }),
                { status: 400 }
            );
        }

        // Optionally increment the used count here
        await PromoCodes.updateOne({ code: promoCode }, { $inc: { used: 1 } });

        return new Response(
            JSON.stringify({ success: true, discountAmount, message: 'Promo code applied successfully' }),
            { status: 200 }
        );
    } catch (error) {
        console.error(error);  // Log error for debugging
        return new Response(
            JSON.stringify({ error: 'Internal Server Error' }),
            { status: 500 }
        );
    }
}
