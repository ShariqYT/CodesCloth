"use server"

import connectDB from "@/db/connectDB";
import Inbox from "@/models/Inbox";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        await connectDB();

        const { name, email, message } = await request.json();
        
        if (!name || !email || !message) {
            return NextResponse.json({ success: false, error: "All fields are required" }, { status: 400 });
        }

        const updateData = { $push: { message: message } };
        let responseMessage;

        let inbox = await Inbox.findOneAndUpdate({ email: email }, updateData, { new: true });
        if (!inbox) {
            inbox = new Inbox({ name, email, message: [message] });
            await inbox.save();
            responseMessage = "Thank you for contacting us!";
        } else {
            responseMessage = "Message added successfully!";
        }

        return NextResponse.json({ inbox, success: true, message: responseMessage }, { status: 200 });
    } catch (err) {
        console.error(err);  // Log the error for server-side debugging
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
