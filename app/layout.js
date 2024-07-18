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
  metadataBase: new URL("https://codescloth.netlify.app"),
  title: {
    default: 'CodesCloth - Wearable Codes',
    template: '%s | CodesCloth',
  },
  keywords: 'CodesCloth, codescloth, CodesCloth.com, CodesCloth.netlify.app, codescloth.com, codescloth.netlify.app, Wearable Codes, Wearable Codes that motivates you, coding cloths, coding, cloths, codescloth, codes cloth, codes, codescloth netlify, codes clothing shop, coding cloth, coding tshirts, coding hoodies',
  openGraph: {
    title: {
      default: 'CodesCloth - Wearable Codes',
      template: '%s | CodesCloth',
    },
    description: 'CodesCloth - Wearable Codes that motivates you., Clothshop for coders, clothes for coders, codes cloth for coders, clothing for coders, coding clothes, coding tshirts, coding hoodies',
    images: ['https://codescloth.netlify.app/logo3.png'],
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={roboto.className}>
      <head>
        <meta name="google-site-verification" content="jEAJb--5CmKi8Vki01te7J0SAjEz6dO-trepN8mHnto" />
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1310009680056426"
          crossOrigin="anonymous"></script>
        <meta name="theme-color" content="#ffffff" />
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
