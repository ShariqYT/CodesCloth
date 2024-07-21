import mongoose from "mongoose";

let isConnected = false; // Track the connection status

const connectDB = async () => {
    if (isConnected) {
        console.log("MongoDB is already connected.");
        return;
    }

    try {
        if (!process.env.MONGO_URI) {
            throw new Error("MONGO_URI is not defined in environment variables");
        }

        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        isConnected = conn.connections[0].readyState;
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error("Error connecting to MongoDB:", error.message);
        process.exit(1);
    }
};

export default connectDB;
