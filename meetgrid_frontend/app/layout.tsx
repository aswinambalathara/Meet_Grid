import type { Metadata } from "next";
import "@/styles/globals.css";
import Navbar from "@/components/pagecomponents/user/Layout/Navbar";
import Footer from "@/components/pagecomponents/user/Layout/Footer";
import {Poppins,Poltawski_Nowy,Alegreya_SC} from 'next/font/google';
import { AuthProvider } from "@/lib/context/AuthProvider";

export const metadata: Metadata = {
  title: "Meet Grid | Home",
  description: "Connecting You to Events, and Events to Connections",
};

const poppins = Poppins({
  subsets:['latin'],
  weight:['400','700'],
  variable:'--font-poppins'
});

export const poltawski = Poltawski_Nowy({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-poltawski',
});

export const alegreya = Alegreya_SC({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-alegreya',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${poppins.variable} ${alegreya.variable} ${poltawski.variable}`}>
      <head>
      <link rel="icon" href="/icons/favicon.ico" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css"
          integrity="sha512-Kc323vGBEqzTmouAECnVceyQqyqdsSiqLQISBL29aUW4U/M7pSPA/gEUZQqv1cwx4OnYxTxve5UMg5GT6L4JJg=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
      </head>
      <body className={poppins.className}>
        <AuthProvider>
        <Navbar />
        {children}
        <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
