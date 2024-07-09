"use server"

import connectDB from "@/db/connectDB";
import PromoCodes from "@/models/PromoCodes";

export const getAllPomocodes = async () => {
    try {
        await connectDB();
        const promocodes = await PromoCodes.find({});
        return promocodes
    } catch (err) {
        console.log(err)
    }
}