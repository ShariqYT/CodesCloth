import mongoose from "mongoose";
const { Schema, model } = mongoose;

const InboxSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    message: { type: [String], required: true },
    createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Inbox || model("Inbox", InboxSchema);