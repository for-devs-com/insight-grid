
import { Inter } from "next/font/google";
import { Providers } from "@/components/Providers";
import Navbar from "@/components/Navbar";
import "@/app/globals.css";
import Sidebar from "@/components/Sidebar";
import {Metadata} from 'next';
import ContentArea from "@/components/ContentArera";

const inter = Inter({ subsets: ["latin"] });


export const metadata: Metadata = {
    title: 'Data Analytic',
    openGraph: {
        title: 'Data Analytic',
        description: 'Analytics and data exploration platform',
        type: 'website',
        locale: 'en_US',
        url: 'https://dataanalytic.ai',
    }
};

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
                <div className="flex flex-1 overflow-hidden relative">
                    {/* Sidebar */}
                    <Sidebar/>

                    {/* Contenido dinámico */}
                    <ContentArea>{children}</ContentArea>
                </div>
            </div>
        </Providers>
        </body>
        </html>
    );
}