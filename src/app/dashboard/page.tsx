"use client"

import { Container, Box } from "@mui/material";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import React from "react";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";


export default function DashboardPage() {
    return (
        <AppRouterCacheProvider>


            <Footer />
        </AppRouterCacheProvider>
    );
}
