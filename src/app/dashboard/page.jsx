'use client'

import {Container} from "@mui/material";
import SelectInput from "@mui/material/Select/SelectInput";
import {AppRouterCacheProvider} from "@mui/material-nextjs/v14-appRouter";
import Dashboard from "@/app/dashboard/components/Dashboard";

export default function DashboardPage(children) {

    return <AppRouterCacheProvider>
                <Container>
                    <h1>Grid Page </h1>
                    <p>Success Connection to the Intelligent data insight tool for your business</p>
                    <Dashboard>HI</Dashboard>
                </Container>
     </AppRouterCacheProvider>


}
