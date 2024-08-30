"use client"

import DynamicTables from "@/components/DynamicTables";
import React from "react";
import {useSession} from "next-auth/react";

export default function DashboardPage() {
    const {data: session, status}  = useSession();
    if (status === 'loading') {
        return <div>Loading...</div>
    }
    if (status === 'unauthenticated') {
        return <div>Access Denied</div>
    }
    return (
        <div>
            <h1>Grid Page </h1>
            <p>Success Connection to the Intelligent data insight tool for your business</p>
            <DynamicTables/>
        </div>
    );


}
