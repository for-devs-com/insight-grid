'use client';
import {SessionProvider} from "next-auth/react";
import {ThemeProvider} from "@/store/theme-provider";
import AppProvider from "@/components/AppProvider";
import {SidebarProvider} from "@/store/SidebarContext";


export function Providers({children}: Readonly<{ children: React.ReactNode }>) {

    return <SessionProvider>
        <ThemeProvider>
            <AppProvider>
                <SidebarProvider>
                    {children}
                </SidebarProvider>
            </AppProvider>
        </ThemeProvider>
    </SessionProvider>;
}