import { getAllProducts } from "@/actions/Admin/getAllProducts";

export default async function sitemap() {
    const baseUrl = 'https://codescloth.netlify.app'

    const response = await getAllProducts();

    const productsSlug = response.map((product) => ({
        url: `${baseUrl}/product/${product.slug}`,
        lastModified: product?.createdAt,
    }));

    const uniqueCategories = [...new Set(response.map((product) => product.category))];

    const productsCategory = uniqueCategories.map((category) => ({
        url: `${baseUrl}/${category}`,
        lastModified: new Date(),
    }));


    return [
        {
            url: baseUrl,
            lastModified: new Date(),
        },
        {
            url: `${baseUrl}/tshirts`,
            lastModified: new Date(),
        },
        {
            url: `${baseUrl}/hoodies`,
            lastModified: new Date(),
        },
        {
            url: `${baseUrl}/caps`,
            lastModified: new Date(),
        },
        {
            url: `${baseUrl}/mugs`,
            lastModified: new Date(),
        },
        {
            url: `${baseUrl}/contact`,
            lastModified: new Date(),
        },
        {
            url: `${baseUrl}/contact`,
            lastModified: new Date(),
        },
        {
            url: `${baseUrl}/return-policy`,
            lastModified: new Date(),
        },
        {
            url: `${baseUrl}/shipping-policy`,
            lastModified: new Date(),
        },
        {
            url: `${baseUrl}/privacy-policy`,
            lastModified: new Date(),
        },
        {
            url: `${baseUrl}/terms-and-conditions`,
            lastModified: new Date(),
        },
        {
            url: `${baseUrl}/sign-in`,
            lastModified: new Date(),
        },
        ...productsSlug,
        ...productsCategory,
    ]
}