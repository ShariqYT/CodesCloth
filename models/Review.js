import mongoose from "mongoose";
const { Schema, model } = mongoose;

const ReviewSchema = new Schema({
    name: { type: String, default: '' },
    user: { type: String, required: true },
    productId: { type: String, required: true },
    rating: { type: Number, required: true },
    subject: { type: String, required: true },
    comment: { type: String, required: true },
    date: { type: Date, default: Date.now },
});

export default mongoose.models.Review || model("Review", ReviewSchema);
