import connectDB from "@/db/connectDB";
import Admin from "@/models/Admin";
import { NextResponse } from "next/server";
import bcrypt from 'bcryptjs'

export async function POST(request) {
    await connectDB()
    const passwordHash = await bcrypt.hash("AdminMahanHai@737", 10)

    await Admin.create({
        email: "codescloth.adamin@gmail.com",
        password: passwordHash
    })

    return NextResponse.json({ success: true, message: "Admin created successfully" }, { status: 200 })
}