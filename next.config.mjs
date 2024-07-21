/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false, // Set to true for strict mode if needed
    images: { 
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'm.media-amazon.com', // Domain for Amazon images
            },
            {
                protocol: 'https',
                hostname: 'via.placeholder.com', // Domain for placeholder images
            },
            {
                protocol: 'https',
                hostname: 'utfs.io', // Domain for UTFS images
            },
        ]
    },
};

export default nextConfig;
