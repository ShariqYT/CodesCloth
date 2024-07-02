import mongoose from "mongoose";
const { Schema, model } = mongoose;

const ProductSchema = new Schema({
    title: { type: String, required: true },
    desc: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    img: { type: String, required: true },
    category: { type: String, required: true },
    size: { type: String },
    color: { type: String },
    price: { type: Number, required: true },
    availableQty: { type: Number, required: true },
}, { timestamps: true });


export default mongoose.models.Product || model("Product", ProductSchema);