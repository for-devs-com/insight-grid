"use client"

import {Container} from "@mui/material";
import {AppRouterCacheProvider} from "@mui/material-nextjs/v14-appRouter";
import DynamicTables from "@/components/DynamicTables";
import React from "react";

export default function DashboardPage() {

    return (
        <AppRouterCacheProvider>
            <Container>
                <h1>Grid Page </h1>
                <p>Success Connection to the Intelligent data insight tool for your business</p>
                <DynamicTables/>
            </Container>
        </AppRouterCacheProvider>);


}
