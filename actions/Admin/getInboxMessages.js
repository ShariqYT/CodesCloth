"use server"
import connectDB from "@/db/connectDB";
import Inbox from "@/models/Inbox";

export default async function getInboxMessages() {
    await connectDB();
    const inboxMessages = await Inbox.find({}).sort({ createdAt: -1 });
    const mssg = JSON.parse(JSON.stringify(inboxMessages));
    return mssg;
}