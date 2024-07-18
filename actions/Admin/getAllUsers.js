"use server"

import connectDB from "@/db/connectDB";
import User from "@/models/User";

export const getAllUsers = async () => {
    try {
        await connectDB();
        const users = await User.find({});
        const finalUsers = JSON.parse(JSON.stringify(users))
        return finalUsers
    } catch (err) {
        console.log(err)
    }
}