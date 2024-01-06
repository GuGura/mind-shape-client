import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/share/Header";
import Contents from "@/components/layout/Contents";
import React from "react";
import NavBar from "@/components/share/NavBar";
import MainPage from "@/components/layout/MainPage";
import Row from "@/components/layout/Row";
import Footer from "@/components/share/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/*<html lang="en" className={"hide-scrollbar"}>*/}
      <body className={inter.className}>
        <Contents className={"grid grid-rows-[auto_1fr_auto] font-maple"}>
          <Header />
          <Row>
            <NavBar />
            <main className={"flex w-full bg-black"}>{children}</main>
          </Row>
          <Footer />
        </Contents>
      </body>
    </html>
  );
}
