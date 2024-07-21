"use server"

import connectDB from '@/db/connectDB';
import PromoCodes from '@/models/PromoCodes';
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
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

    // Validate required fields
    if (!code || !discountAmount || !expiry || !discountType) {
      return NextResponse.json(
        { error: 'All required fields (code, discountAmount, discountType, expiry) must be provided' },
        { status: 400 }
      );
    }

    // Validate discount type
    if (!['fixed', 'percentage'].includes(discountType)) {
      return NextResponse.json(
        { error: 'Invalid discount type. Must be either "fixed" or "percentage".' },
        { status: 400 }
      );
    }

    // Validate limit
    if (limit < 0) {
      return NextResponse.json(
        { error: 'Limit must be a non-negative number.' },
        { status: 400 }
      );
    }

    // Check if promo code already exists
    const existingPromoCode = await PromoCodes.findOne({ code });
    if (existingPromoCode) {
      return NextResponse.json(
        { error: 'Promo code already exists' },
        { status: 400 }
      );
    }

    // Create and save the new promo code
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

    return NextResponse.json(newPromoCode, { status: 201 });
  } catch (error) {
    console.error('Error creating promo code:', error.message);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
