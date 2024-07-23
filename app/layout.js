import "./globals.css";
import { CartProvider } from '@/context/CartContext';
import NextTopLoader from "nextjs-toploader";
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
  verification: {
    google: "google-site-verification=jEAJb--5CmKi8Vki01te7J0SAjEz6dO-trepN8mHnto",
  },
  keywords: 'CodesCloth, codescloth, CodesCloth.com, CodesCloth.netlify.app, codescloth.com, codescloth.netlify.app, Wearable Codes, Wearable Codes that motivates you, coding cloths, coding, cloths, codescloth, codes cloth, codes, codescloth netlify, codes clothing shop, coding cloth, coding tshirts, coding hoodies',
  description: 'CodesCloth - Wearable Codes that motivates you. Clothshop for coders, clothes for coders, codes cloth for coders, clothing for coders, coding clothes, coding tshirts, coding hoodies',
  openGraph: {
    title: {
      default: 'CodesCloth - Wearable Codes',
      template: '%s | CodesCloth',
    },
    description: 'CodesCloth - Wearable Codes that motivates you. Clothshop for coders, clothes for coders, codes cloth for coders, clothing for coders, coding clothes, coding tshirts, coding hoodies',
    images: ['https://codescloth.netlify.app/logo3.png'],
    url: 'https://codescloth.netlify.app',
    site_name: 'CodesCloth',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CodesCloth - Wearable Codes',
    description: 'CodesCloth - Wearable Codes that motivates you. Clothshop for coders, clothes for coders, codes cloth for coders, clothing for coders, coding clothes, coding tshirts, coding hoodies',
    images: ['https://codescloth.netlify.app/logo3.png'],
  },
  additionalMetaTags: [
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1',
    },
    {
      name: 'author',
      content: 'CodesCloth',
    },
    {
      name: 'robots',
      content: 'index, follow',
    },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={roboto.className}>
      <head>
        <meta name="google-site-verification" content="jEAJb--5CmKi8Vki01te7J0SAjEz6dO-trepN8mHnto" />
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1310009680056426"
          crossOrigin="anonymous"></script>
        <meta name="theme-color" content="#ffffff" />
        <meta name="description" content={metadata.description} />
        <meta name="keywords" content={metadata.keywords} />
        <meta property="og:title" content={metadata.openGraph.title.default} />
        <meta property="og:description" content={metadata.openGraph.description} />
        <meta property="og:image" content={metadata.openGraph.images[0]} />
        <meta property="og:url" content={metadata.openGraph.url} />
        <meta property="og:site_name" content={metadata.openGraph.site_name} />
        <meta name="twitter:card" content={metadata.twitter.card} />
        <meta name="twitter:title" content={metadata.twitter.title} />
        <meta name="twitter:description" content={metadata.twitter.description} />
        <meta name="twitter:image" content={metadata.twitter.images[0]} />
        {metadata.additionalMetaTags.map((tag, index) => (
          <meta key={index} name={tag.name} content={tag.content} />
        ))}
      </head>
      <body className="overflow-x-hidden">
        <NextTopLoader
          color="#41008c"
          height={3}
          showSpinner={false}
          zIndex={1000000}
        />
        <Toaster position="bottom-center" reverseOrder={false} />
        <DarkModeProvider>
          <CartProvider>
            <ClientOnlyLayout>
              <SessionWrapper>
                {children}
              </SessionWrapper>
            </ClientOnlyLayout>
          </CartProvider>
        </DarkModeProvider>
      </body>
    </html>
  );
}
