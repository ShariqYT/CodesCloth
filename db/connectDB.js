import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI)
        (`MongoDB Connected: ${conn.connection.host}`)
    } catch (error) {
        (error)
    }
}

export default connectDB