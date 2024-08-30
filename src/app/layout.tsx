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
        <head>
            <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
            <title>Data Analytics</title>
        </head>
        <body className={`${inter.className} bg-gray-50 text-gray-900 w-full`}>
        <Providers>
            {/* Main Layout */}
            <div className="flex-1 h-full " >
                {/* Navbar */}
                <Navbar/>
                <main className="flex-grow">
                    {children}
                </main>
            </div>
        </Providers>
        </body>
        </html>
    );
}
