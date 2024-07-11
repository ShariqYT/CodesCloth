import connectDB from "@/db/connectDB";
import Inbox from "@/models/Inbox";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        await connectDB();

        const { name, email, message } = await request.json();
        if (!name || !email || !message) {
            return NextResponse.json({ success: false, error: "All fields are required" }, { status: 200 });
        }
        
        const alreadyExists = await Inbox.findOne({ email: email });
        if (alreadyExists) {
            const updateMessage = await Inbox.findOneAndUpdate(
                { email: email },
                { $push: { message: message } },
                { new: true }
            );
            return NextResponse.json({ inbox: updateMessage, success: "Success", message: "Thank you for contacting us!" }, { status: 200 });
        }
        
        const inbox = new Inbox({ name: name, email: email, message: [message] });
        await inbox.save();
        return NextResponse.json({ inbox: inbox, success: "Success", message: "Thank you for contacting us!" }, { status: 200 });
    } catch (err) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
