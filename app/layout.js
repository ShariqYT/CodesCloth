import "./globals.css";
import { CartProvider } from '@/context/CartContext';
import NextTopLoader from "nextjs-toploader";
import MobileNav from "@/components/MobileNav";
import { DarkModeProvider } from '@/context/DarkModeContext';
import ClientOnlyLayout from "@/components/ClientOnlyLayouts";
import SessionWrapper from "@/components/SessionWrapper";
import {Roboto_Flex} from 'next/font/google';
import { Toaster } from "react-hot-toast";

const roboto = Roboto_Flex({ subsets: ['latin'], weight: ['100', '300', '400', '500', '700', '900'], display: 'swap' });

export const metadata = {
  title: 'CodesCloth - Wearable Codes',
  description: 'CodesCloth - Wearable Codes that motivates you.',
  keywords: 'CodesCloth, codescloth, CodesCloth.com, CodesCloth.netlify.app, codescloth.com, codescloth.netlify.app, Wearable Codes, Wearable Codes that motivates you, coding cloths, coding, cloths',
  author: 'CodesCloth',
  creator: 'CodesCloth',
  openGraph: {
    title: 'CodesCloth - Wearable Codes',
    description: 'CodesCloth - Wearable Codes that motivates you.',
    url: 'https://codescloth.netlify.app/',
    siteName: 'CodesCloth',
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_URL}/img/logo-2.png`,
        width: 800,
        height: 600,
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={roboto.className}>
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content={metadata.description} />
        <meta name="keywords" content={metadata.keywords} />
        <meta name="author" content={metadata.author} />
        <meta property="og:title" content={metadata.openGraph.title} />
        <meta property="og:description" content={metadata.openGraph.description} />
        <meta property="og:url" content={metadata.openGraph.url} />
        <meta property="og:site_name" content={metadata.openGraph.siteName} />
        <meta property="og:image" content={metadata.openGraph.images[0].url} />
        <meta property="og:image:width" content={metadata.openGraph.images[0].width} />
        <meta property="og:image:height" content={metadata.openGraph.images[0].height} />
        <meta name="robots" content={`${metadata.robots.index ? 'index' : 'noindex'},${metadata.robots.follow ? 'follow' : 'nofollow'}`} />
        <meta name="googlebot" content={`index=${metadata.robots.googleBot.index}, follow=${metadata.robots.googleBot.follow}, max-video-preview=${metadata.robots.googleBot['max-video-preview']}, max-image-preview=${metadata.robots.googleBot['max-image-preview']}, max-snippet=${metadata.robots.googleBot['max-snippet']}`} />
        <link rel="apple-touch-icon" sizes="180x180" href="/img/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/img/favicon-16x16.png" />
      </head>
      <body>
        <NextTopLoader
          color="#41008c"
          height={3}
          showSpinner={false}
          zIndex={10000}
        />
        <Toaster position="bottom-center" reverseOrder={false} />
        <DarkModeProvider>
          <CartProvider>
            <ClientOnlyLayout>
              <SessionWrapper>
                {children}
              </SessionWrapper>
            </ClientOnlyLayout>
            <MobileNav />
          </CartProvider>
        </DarkModeProvider>
      </body>
    </html>
  );
}
