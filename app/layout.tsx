"use client"
import { Roboto } from 'next/font/google';
import GlobalStyle from "./globalStyles";
import Navbar from "./components/navbar";
import { AuthProvider } from './contexts/authContext';
import { ProductProvider } from './contexts/productContext';
import Footer from './components/footer';
import { CartProvider } from './contexts/cartContext';
import { Toaster } from "react-hot-toast";
import { FavoriteProvider } from './contexts/favoriteContext';

const roboto = Roboto({
  weight: '400',
  subsets: ['latin'],
})


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  return (
    <html lang="en">
      <GlobalStyle />
      <head>
        <title>E-Commerce App</title>
        <link rel="icon" href="/favicon.ico" sizes='any'/>
      </head>
      <body className={roboto.className}>
        <AuthProvider>
          <CartProvider>
            <FavoriteProvider>
              <ProductProvider>
                <Toaster position="top-center" />
                <Navbar />
                <main>
                  {children}
                </main>
                <Footer />
              </ProductProvider>
            </FavoriteProvider>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
