import QueryProvider from "@/components/provider/QueryProvider";
import Header from "@/components/share/Header";
import ToastProvider from "@/components/provider/ToastProvider";
import React from "react";
import { Inter } from "next/font/google";
import { Metadata, Viewport } from "next";
import "./globals.css";
import Footer from "@/components/share/Footer";

const inter = Inter({ subsets: ["latin"] });
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  minimumScale: 1,
  viewportFit: "cover",
};
export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
  icons: {
    icon: "./favicon.ico",
  },
};

export default function Root({
  children,
  params: { locale },
}: {
  children: any;
  params: { locale: string };
}) {
  return (
    <html className={"hide-scrollbar bg-bg"}>
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
        />
        <title>The Mind</title>
      </head>
      <body className={inter.className}>
        <QueryProvider>
          <Header locale={locale} />
          <main className={"hide-scrollbar flex w-full"}>{children}</main>
          <Footer locale={locale} />
          <ToastProvider />
        </QueryProvider>
      </body>
    </html>
  );
}
