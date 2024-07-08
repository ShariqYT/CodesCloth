/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    images: { // add more domains if needed
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'm.media-amazon.com',
            },
            {
                protocol: 'https',
                hostname: 'via.placeholder.com',
            },
            {
                protocol: 'https',
                hostname: 'utfs.io',
            },
        ]
    },
};
// next.config.js or the main layout file



export default nextConfig;
