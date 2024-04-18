'use client'
import {Container} from "@mui/material";
import  dynamic from "next/dynamic";
const DatabaseConnectionFormWhitNoSSR = dynamic(
    () => import('@/app/components/DatabaseConnectionForm'), {
    ssr: false
});
export default function Home() {
    return (
        <Container>
            <h1>Welcome to Insight Grid</h1>
            <DatabaseConnectionFormWhitNoSSR />
        </Container>
    );


}