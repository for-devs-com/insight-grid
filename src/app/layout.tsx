import { Inter } from "next/font/google";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "@/theme";
import { Box } from "@mui/material";
import { Providers } from "@/app/Providers";
import Navbar from "@/components/Navbar";
import React from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
    title: "Insight Grid",
    description: "Intelligent data insights for your business",
};

export default function RootLayout({ children }: { children: React.ReactNode; }) {
    return (
        <html lang="en">
        <body className={inter.className}>
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Providers>
                    <Layout>{children}</Layout>
                </Providers>
            </ThemeProvider>
        </AppRouterCacheProvider>
        </body>
        </html>
    );
}

function Layout({ children }: { children: React.ReactNode }) {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100vh', overflowX: 'hidden' }}>
            <Navbar />
            <Box sx={{ flexGrow: 1, overflowY: 'auto', padding: 0, margin: 0 }}>
                {children}
            </Box>
        </Box>
    );
}
