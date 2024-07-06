import "./globals.css";
import { CartProvider } from '@/context/CartContext';
import NextTopLoader from "nextjs-toploader";
import MobileNav from "@/components/MobileNav";
import { DarkModeProvider } from '@/context/DarkModeContext';
import ClientOnlyLayout from "@/components/ClientOnlyLayouts";

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
        url: `${process.env.NEXT_PUBLIC_HOST}/img/logo-2.png`,
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
    <html lang="en">
      <head>
        <meta charSet="UTF-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
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
        <DarkModeProvider>
          <CartProvider>
            <ClientOnlyLayout>{children}</ClientOnlyLayout>
            <MobileNav />
          </CartProvider>
        </DarkModeProvider>
      </body>
    </html>
  );
}
