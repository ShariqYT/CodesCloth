import { getAllProducts } from "@/actions/Admin/getAllProducts";

export default async function sitemap() {

    const response = await getAllProducts();

    const productsSlug = response.map((product) => ({
        url: `${process.env.NEXT_PUBLIC_URL}/product/${product.slug}`,
        lastModified: product?.createdAt,
    }));

    const uniqueCategories = [...new Set(response.map((product) => product.category))];

    const productsCategory = uniqueCategories.map((category) => ({
        url: `${process.env.NEXT_PUBLIC_URL}/${category}`,
    }));


    return [
        {
            url: process.env.NEXT_PUBLIC_URL,
            lastModified: new Date(),
        },
        ...productsSlug,
        ...productsCategory,
    ]
}