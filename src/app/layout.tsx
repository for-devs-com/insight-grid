import {Inter} from "next/font/google";
import {AppRouterCacheProvider} from "@mui/material-nextjs/v14-appRouter";
import {ThemeProvider} from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "@/theme";
import Chat from "@/app/chat/page";
import {Box, Container} from "@mui/material";
import {Providers} from "@/app/Providers";
import Navbar from "@/app/components/Navbar";

const inter = Inter({subsets: ["latin"]});

export const metadata = {
    title: "Insight Grid", description: "Intelligent data insights for your business",
};

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (<html lang="en">
        <body className={inter.className}>
        <AppRouterCacheProvider options={{enableCssLayer: true}}>
            <ThemeProvider theme={theme}>
                <CssBaseline/>
                <Providers>
                    <Box sx={{display: 'flex', flexDirection: 'column', width: '100vw', height: '100vh',}}>
                        <Navbar/>
                        <Box sx={{flexGrow: 1, overflow: 'auto', padding: 0, margin: 0}}>
                            {children}
                        </Box>
                        <Chat/>
                    </Box>
                </Providers>
            </ThemeProvider>
        </AppRouterCacheProvider>
        </body>
        </html>
    );

};

