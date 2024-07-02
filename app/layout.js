import Navbar from "@/components/Navbar";
import "./globals.css";
import Footer from '@/components/Footer';
import { CartProvider } from '@/context/CartContext';
import NextTopLoader from "nextjs-toploader";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="description" content="CodesCloth - Wearable Codes that motivates you." />
        <link rel="apple-touch-icon" sizes="180x180" href="/img/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/img/favicon-16x16.png" />
      </head>
      <body>
        <NextTopLoader
          color="#41008c"
          initialPosition={0.08}
          crawlSpeed={200}
          height={3}
          crawl={true}
          showSpinner={true}
          easing="ease"
          speed={200}
          shadow="0 0 10px #7700ff,0 0 5px #7700ff"
          template='<div class="bar" role="bar"><div class="peg"></div></div> 
  <div class="spinner" role="spinner"><div class="spinner-icon"></div></div>'
          zIndex={3000}
          showAtBottom={false}
        />
        <CartProvider>
          <Navbar />
          {children}
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
