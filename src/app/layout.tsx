import { Inter } from "next/font/google";
import { Providers } from "@/components/Providers";
import Navbar from "@/components/Navbar";
import "@/app/globals.css";
import Sidebar from "@/components/Sidebar";
import ContentArea from "@/components/ContentArea";
import { Metadata } from 'next';
import {getServerSession} from "next-auth";
import {options} from "@/app/auth";

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

export default async function RootLayout({ children }: { children: React.ReactNode }) {
    const session = await getServerSession(options);

    return (
        <html lang="en" className="h-full">
        <body className={`${inter.className} w-full h-full`}>
        {/* Proveedores globales */}
        <Providers>
            {/* Contenedor principal que ocupa toda la pantalla */}
            <div className="flex flex-col h-full w-full">
                {/* Navbar en la parte superior */}
                <Navbar />

                {/* Contenido principal con Sidebar y contenido dinámico */}
                <div className="flex flex-1 overflow-hidden">
                    {/* Sidebar */}
                    <Sidebar className="h-full" />

                    {/* Contenido dinámico */}
                    <ContentArea>{children}</ContentArea>
                </div>
            </div>
        </Providers>
        </body>
        </html>
    );
}
