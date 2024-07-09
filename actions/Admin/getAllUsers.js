"use server"

import connectDB from "@/db/connectDB";
import User from "@/models/User";

export const getAllUsers = async () => {
    try {
        await connectDB();
        const users = await User.find({});
        return users
    } catch (err) {
        console.log(err)
    }
}