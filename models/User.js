import mongoose from "mongoose";
const { Schema, model } = mongoose;

const UserSchema = new Schema({
    name: { type: String, default: '' },
    email: { type: String, unique: true, default: '' },
    address: { type: String, default: '' },
    pincode: { type: Number, default: 0 },
    phone: { type: Number, required: true, unique: true, default: 0 },
    password: { type: String },
    wishlist: { type: Array, default: [] },
}, { timestamps: true });

export default mongoose.models.User || model("User", UserSchema);