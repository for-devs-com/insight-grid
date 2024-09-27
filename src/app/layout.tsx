import { Inter } from "next/font/google";
import { Providers } from "@/components/Providers";
import Navbar from "@/components/Navbar";
import "@/app/globals.css";
import Sidebar from "@/components/Sidebar";
import {metadata}  from "@/app/metadata";

const inter = Inter({ subsets: ["latin"] });

const title = metadata.title;
const description = metadata.description;

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" className="h-full">
        <body className={`${inter.className} bg-gray-50 text-gray-900 w-full h-full`}>
        {/* Proveedores globales */}
        <Providers>
            {/* Contenedor principal que ocupa toda la pantalla */}
            <div className="flex flex-col h-full">
                {/* Navbar en la parte superior */}
                <Navbar />

                {/* Contenido principal con Sidebar y contenido dinámico */}
                <div className="flex flex-1 overflow-hidden">
                    {/* Sidebar fijo en el lado izquierdo */}
                    <Sidebar className="w-64 h-full"/>

                    {/* Contenido dinámico */}
                    <main className="flex-1 overflow-auto">
                        {children}
                    </main>
                </div>
            </div>
        </Providers>
        </body>
        </html>
    );
}