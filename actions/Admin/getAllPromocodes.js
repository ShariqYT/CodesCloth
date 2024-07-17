"use server"
import { cache } from "react";
import connectDB from "@/db/connectDB";
import PromoCodes from "@/models/PromoCodes";

export const getAllPromocodes = cache(async () => {
    try {
        await connectDB();
        const promocodes = await PromoCodes.find({});
        const finalPromocodes = JSON.parse(JSON.stringify(promocodes))
        return finalPromocodes
    } catch (err) {
        console.log(err)
    }
})