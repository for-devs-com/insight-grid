'use client'

import {Container} from "@mui/material";
import {AppRouterCacheProvider} from "@mui/material-nextjs/v14-appRouter";
import DynamicTables from "@/app/dashboard/components/DynamicTables";
import DatabaseConnectionForm from "@/app/components/DatabaseConnectionForm";

export default function DashboardPage(children) {

    return <AppRouterCacheProvider>
                <Container>
                    <h1>Grid Page </h1>
                    <DatabaseConnectionForm/>
                    <p>Success Connection to the Intelligent data insight tool for your business</p>
                    <DynamicTables>

                    </DynamicTables>
                </Container>
     </AppRouterCacheProvider>


}
