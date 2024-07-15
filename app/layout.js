import "./globals.css";
import { CartProvider } from '@/context/CartContext';
import NextTopLoader from "nextjs-toploader";
import MobileNav from "@/components/MobileNav";
import { DarkModeProvider } from '@/context/DarkModeContext';
import ClientOnlyLayout from "@/components/ClientOnlyLayouts";
import SessionWrapper from "@/components/SessionWrapper";
import { Roboto_Flex } from 'next/font/google';
import { Toaster } from "react-hot-toast";

const roboto = Roboto_Flex({ subsets: ['latin'], weight: ['100', '300', '400', '500', '700', '900'], display: 'swap' });

export const metadata = {
  title: 'CodesCloth - Wearable Codes',
  description: 'CodesCloth - Wearable Codes that motivates you.',
  keywords: 'CodesCloth, codescloth, CodesCloth.com, CodesCloth.netlify.app, codescloth.com, codescloth.netlify.app, Wearable Codes, Wearable Codes that motivates you, coding cloths, coding, cloths',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={roboto.className}>
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content={metadata.description} />
        <meta name="keywords" content={metadata.keywords} />
        <meta name="google-site-verification" content="jEAJb--5CmKi8Vki01te7J0SAjEz6dO-trepN8mHnto" />
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1310009680056426"
          crossOrigin="anonymous"></script>
        <link rel="icon" type="image/png" sizes="32x32" href="images/favicon-32x32.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="images/apple-touch-icon.png" />
        <link rel="android-chrome-512x512" sizes="512x512" href="images/android-chrome-512x512.png" />
        <link rel="shortcut icon" href="images/favicon.png" type="image/png" />
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
