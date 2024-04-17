'use client'
import DatabaseConnectionForm from "@/app/components/DatabaseConnectionForm";
import {Container} from "@mui/material";
import  dynamic from "next/dynamic";
import {useEffect} from "react";
import {useRouter} from "next/router";
//import handleSubmit from "db-conn/page"
const DatabaseConnectionFormWhitNoSSR = dynamic(
    () => import('@/app/components/DatabaseConnectionForm'), {
    ssr: false
});
export default function Home() {

    /*async function createConnection() {
        try {
            const res = await fetch('http://localhost:8080/api/connect-database');
        } catch (error) {
            console.error('Error al conectar con la base de datos', error);
        }
    }*/


    return (
        <Container>
            <h1>Welcome to Insight Grid</h1>
            <DatabaseConnectionFormWhitNoSSR />
        </Container>
    );


}