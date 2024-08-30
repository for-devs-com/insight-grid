'use client';
import {SessionProvider} from "next-auth/react";
import React from 'react';
import {ThemeProvider} from "@/store/theme-provider";
import AppProvider from "@/components/AppProvider";


export function Providers({children}: Readonly<{ children: React.ReactNode }>) {

    return <SessionProvider>
            <ThemeProvider>
                    <AppProvider>{children}</AppProvider>
            </ThemeProvider>
    </SessionProvider>;
}