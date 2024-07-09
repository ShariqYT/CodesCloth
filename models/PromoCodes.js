import mongoose from "mongoose";
const { Schema, model } = mongoose;

const PromoCodesSchema = new Schema({
    code: { type: String, required: true, unique: true },
    discountAmount: { type: Number, required: true },
    discountType: { type: String, required: true, enum: ['fixed', 'percentage'] },
    used: { type: Number, default: 0 },
    active: { type: Boolean, default: true },
    allProducts: { type: Boolean, default: false },
    limit: { type: Number, default: 0 },
    expiry: { type: Date, required: true },
    createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.PromoCodes || model("PromoCodes", PromoCodesSchema);
