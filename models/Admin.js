import mongoose from "mongoose";
const { Schema, model } = mongoose;

const AdminSchema = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

export default mongoose.models.Admin || model("Admin", AdminSchema);