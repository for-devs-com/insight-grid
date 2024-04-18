'use client'

import {Container} from "@mui/material";
import SelectInput from "@mui/material/Select/SelectInput";
import {AppRouterCacheProvider} from "@mui/material-nextjs/v14-appRouter";

export default function DbConnPage(children) {

    return <AppRouterCacheProvider>
                <Container>
                    <h1>Grid Page </h1>
                    <p>Success Connection to the Intelligent data insight tool for your business</p>
                </Container>
     </AppRouterCacheProvider>


}
