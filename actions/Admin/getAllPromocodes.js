"use server"

import connectDB from "@/db/connectDB";
import PromoCodes from "@/models/PromoCodes";

export const getAllPromocodes = async () => {
    try {
        await connectDB();
        const promocodes = await PromoCodes.find({});
        const finalPromocodes = JSON.parse(JSON.stringify(promocodes))
        return finalPromocodes
    } catch (err) {
        console.log(err)
    }
}