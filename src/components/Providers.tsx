'use client';
import {SessionProvider} from "next-auth/react";
import {ThemeProvider} from "@/store/theme-provider";
import AppProvider from "@/components/AppProvider";
import {SidebarProvider} from "@/store/SidebarContext";
import {FormStateProvider} from "@/store/form-state-provider";


export function Providers({children}: Readonly<{ children: React.ReactNode }>) {

    return <SessionProvider>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            <AppProvider>
                <SidebarProvider>
                    <FormStateProvider>
                        {children}
                    </FormStateProvider>
                </SidebarProvider>
            </AppProvider>
        </ThemeProvider>
    </SessionProvider>;
}