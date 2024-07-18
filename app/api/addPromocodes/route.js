import connectDB from '@/db/connectDB';
import PromoCodes from '@/models/PromoCodes';

export async function POST(request) {
  await connectDB();

  const {
    code,
    discountAmount,
    discountType,
    active = true,
    allProducts = false,
    limit = 0,
    expiry,
  } = await request.json();

  if (!code || !discountAmount || !expiry || !discountType) {
    return new Response(JSON.stringify({ error: 'All required fields (code, discountAmount, discountType, expiry) must be provided' }), { status: 200 });
  }

  if (!['fixed', 'percentage'].includes(discountType)) {
    return new Response(JSON.stringify({ error: 'Invalid discount type. Must be either "fixed" or "percentage".' }), { status: 200 });
  }

  if (limit < 0) {
    return new Response(JSON.stringify({ error: 'Limit must be a non-negative number.' }), { status: 200 });
  }

  try {
    const existingPromoCode = await PromoCodes.findOne({ code });
    if (existingPromoCode) {
      return new Response(JSON.stringify({ error: 'Promo code already exists' }), { status: 200 });
    }

    const newPromoCode = new PromoCodes({
      code,
      discountAmount,
      discountType,
      active,
      allProducts,
      limit,
      expiry,
    });

    await newPromoCode.save();
    return new Response(JSON.stringify(newPromoCode), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
