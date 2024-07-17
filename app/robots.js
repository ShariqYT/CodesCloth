export default function robots() {
    return {
        rules: {
            userAgent: '*',
            allow: ['/', '/tshirts', '/hoodies', '/caps', '/mugs', '/product', '/product/*',],
            disallow: '/admin',
        },
        sitemap: `${process.env.NEXT_PUBLIC_URL}/sitemap.xml`,
    }
}