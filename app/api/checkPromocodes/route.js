import connectDB from '@/db/connectDB';
import PromoCodes from '@/models/PromoCodes';

export async function POST(request) {
  await connectDB();

  const { promoCode, subTotal } = await request.json();

  if (!promoCode) {
    return new Response(JSON.stringify({ success:false, error: 'Promo code must be provided' }), { status: 200 });
  }

  try {
    const promo = await PromoCodes.findOne({ code: promoCode, active: true });

    if (!promo) {
      return new Response(JSON.stringify({ success:false, error: 'Invalid or expired promo code' }), { status: 200 });
    }

    const currentDate = new Date();
    if (promo.expiry < currentDate) {
      return new Response(JSON.stringify({ success:false, error: 'Promo code has expired' }), { status: 200 });
    }

    const discountAmount = promo.discountType === 'percentage'
      ? (promo.discountAmount / 100) * subTotal 
      : promo.discountAmount;

    return new Response(JSON.stringify({ success: true, discountAmount, message: 'Promo code applied successfully' }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
