import connectDB from "@/db/connectDB"
import Product from "@/models/Product"

async function searchProducts(query) {
    try {
        await connectDB()
        
        const results = await Product.aggregate([
            {
                $match: {
                    title: { $regex: query, $options: 'i' } // Case-insensitive search
                }
            },
            {
                $group: {
                    _id: "$title", // Group by product title
                    doc: { $first: "$$ROOT" } // Take the first document with that title
                }
            },
            {
                $replaceRoot: { newRoot: "$doc" } // Replace root with the original document
            }
        ])
        return results
    } catch (err) {
        console.log(err)
        return [] // Return an empty array in case of error
    }
}

export async function GET(request) {
    const url = new URL(request.url)
    const query = url.searchParams.get('query')
    if (!query) {
        return new Response(JSON.stringify([]), {
            status: 200,
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }
    const products = await searchProducts(query)
    return new Response(JSON.stringify(products), {
        status: 200,
        headers: {
            'Content-Type': 'application/json'
        }
    })
}
