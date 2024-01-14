import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/share/Header";
import Contents from "@/components/layout/Contents";
import React from "react";
import NavBar from "@/components/share/NavBar";
import Row from "@/components/layout/Row";
import QueryProvider from "@/components/provider/QueryProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
  icons: {
    icon: "./favicon.ico",
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    minimumScale: 1,
    viewportFit: "cover",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={"hide-scrollbar bg-bg font-Inter"}>
      <body className={inter.className}>
        <QueryProvider>
          <Contents className={"grid grid-rows-[auto_1fr_auto] font-maple"}>
            <Header />
            <Row>
              <NavBar />
              <main className={"hide-scrollbar flex w-full"}>{children}</main>
            </Row>
          </Contents>
        </QueryProvider>
      </body>
    </html>
  );
}
