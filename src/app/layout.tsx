'use client';

import {Inter} from "next/font/google";
import {Providers} from "@/components/Providers";
import Navbar from "@/components/Navbar";
import React from "react";
import "@/app/globals.css";

const inter = Inter({subsets: ["latin"]});

export default function RootLayout({children}) {
    return (
        <html lang="en">
        <body className={`${inter.className} bg-gray-50 text-gray-900`}>
        <Providers>
            {/* Main Layout */}
            <div className="flex flex-col ">
                <main className="flex-grow mt-0">
                    {/* Navbar */}
                    <Navbar/>
                    {children}
                </main>
            </div>
        </Providers>
        </body>
        </html>
    );
}
