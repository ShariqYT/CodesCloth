import mongoose from "mongoose";
const { Schema, model } = mongoose;

const OrderSchema = new Schema({
    orderId: { type: String, required: true },
    oid: { type: String, required: true },
    transactionId: { type: String, default: '' },
    name: { type: String, default: '' },
    email: { type: String, default: '' },
    phone: { type: Number, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    pincode: { type: Number, required: true },
    paymentInfo: { type: String, default: '' },
    products: { type: Object, required: true },
    amount: { type: Number, required: true },
    status: { type: String, default: "Pending" },
    deliveryStatus: { type: String, default: "unshipped" },
}, { timestamps: true });

export default mongoose.models.Order || model("Order", OrderSchema);