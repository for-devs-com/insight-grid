import {Inter} from "next/font/google";
import {AppRouterCacheProvider} from "@mui/material-nextjs/v14-appRouter";
import {ThemeProvider} from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "@/theme";
import Chat from "@/app/chat/page";
import {Container} from "@mui/material";
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
                    <Container>
                        <div style={{display: 'flex', height: '100vh'}}>
                            <div style={{flex: 1}}>
                                <Navbar/>
                                {children}
                                <div style={{
                                    width: '300px',
                                    position: 'fixed',
                                    right: 0,
                                    top: 0,
                                    height: '100vh',
                                    overflowY: 'auto',
                                    borderLeft: '1px solid #ccc'
                                }}>
                                    <Chat/>
                                </div>
                            </div>

                        </div>
                    </Container>
                </Providers>
            </ThemeProvider>
        </AppRouterCacheProvider>
        </body>
        </html>
    );

};

