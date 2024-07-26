"use client"

import { Container, Box } from "@mui/material";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import DynamicTables from "@/components/DynamicTables";
import React from "react";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";

export default function DashboardPage() {
    return (
        <AppRouterCacheProvider>
            <Box sx={{ width: '100vw', overflowX: 'hidden' }}>
                <Hero />
                <Container>
                    <Footer />
                </Container>
            </Box>
        </AppRouterCacheProvider>
    );
}
