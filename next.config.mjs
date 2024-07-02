/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: { // add more domains if needed
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'm.media-amazon.com',
            },
        ]
    },
};
// next.config.js or the main layout file



export default nextConfig;
