import { NextResponse } from "next/server";
import Product from "@/models/Product";
import connectDB from "@/db/connectDB";
import multer from 'multer';
import { promisify } from 'util';

// Setup multer storage configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads'); // Adjust path as needed
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });
const uploadMiddleware = upload.single('image');

// Convert middleware to promise to use in async function
const runMiddleware = promisify(uploadMiddleware);

export const config = {
    api: {
        bodyParser: false, 
    },
};

export async function POST(request) {
    const req = request;
    const res = new NextResponse();

    try {
        // Connect to MongoDB
        await connectDB();

        // Run the multer middleware to handle file upload
        await runMiddleware(req, res);

        // Extract form data from request body
        const formData = await new Promise((resolve, reject) => {
            const chunks = [];
            req.on('data', chunk => chunks.push(chunk));
            req.on('end', () => resolve(Buffer.concat(chunks)));
            req.on('error', err => reject(err));
        });

        const body = JSON.parse(formData.toString());

        // Create a new product instance
        let p = new Product({
            title: body.productTitle,
            desc: body.description,
            slug: body.productSlug,
            img: req.file.path,  // Store the file path in the img field
            category: body.productType,
            size: body.size,
            color: body.color,
            price: body.price,
            availableQty: body.availableQty,
        });

        // Validate required fields
        if(p.title && p.desc && p.slug && p.img && p.category && p.size && p.color && p.price && p.availableQty) {
            await p.save();
            return NextResponse.json({ success: true }, { status: 200 });
        } else {
            return NextResponse.json({ success: false, error: "All fields are required" }, { status: 400 });
        }

    } catch (err) {
        console.error("Internal Server Error:", err);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
