import {Inter} from "next/font/google";
import {AppRouterCacheProvider} from "@mui/material-nextjs/v14-appRouter";
import {ThemeProvider} from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "@/theme";


const inter = Inter({subsets: ["latin"]});

export const metadata = {
    title: "Insight Grid", description: "Intelligent data insights for your business",
};

export default function RootLayout({children}) {
    return <html lang="en">
    <body className={inter.className}>
    <AppRouterCacheProvider options={{ enableCssLayer: true }}>
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <main>
                {children}
            </main>
        </ThemeProvider>
    </AppRouterCacheProvider>
    </body>
    </html>;
};

