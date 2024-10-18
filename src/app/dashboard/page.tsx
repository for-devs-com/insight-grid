"use client"

import DynamicTables from "@/components/DynamicTables";
import React from "react";
import {useSession} from "next-auth/react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ActiveConnections } from "@/components/dashboard/ActiveConnections"
import { RecentGrids } from "@/components/dashboard/RecentGrids"
import { RecentActivities } from "@/components/dashboard/RecentActivities"
import { DataProcessedChart } from "@/components/dashboard/DataProcessedChart"
import { PlatformUsageChart } from "@/components/dashboard/PlatformUsageChart"
import { DatabaseUsageChart } from "@/components/dashboard/DatabaseUsageChart"

export default function DashboardPage() {
    const {data: session, status}  = useSession();
    if (status === 'loading') {
        return <div>Loading...</div>
    }
    if (status === 'unauthenticated') {
        return <div>Access Denied</div>
    }
    if (!session || !session.accessToken) {
        return <div>Por favor, inicia sesión para acceder.</div>;
    }

    return (
        <div className="grid p-4 space-y-4 h-screen">
            <h1 className="text-2xl font-bold">Data Analytics Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:h-screen gap-4 ">
                <Card className="col-span-1">
                    <CardHeader>
                        <CardTitle>Conexiones Activas</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ActiveConnections/>
                    </CardContent>
                </Card>
                <Card className="col-span-1 md:col-span-2">
                    <CardHeader>
                        <CardTitle>Últimos Grids Creados</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <RecentGrids/>
                    </CardContent>
                </Card>
                <Card className="col-span-1">
                    <CardHeader>
                        <CardTitle>Actividades Recientes</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <RecentActivities/>
                    </CardContent>
                </Card>
                <Card className="col-span-1">
                    <CardHeader>
                        <CardTitle>Datos Procesados</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <DataProcessedChart/>
                    </CardContent>
                </Card>
                <Card className="col-span-1">
                    <CardHeader>
                        <CardTitle>Uso de la Plataforma</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <PlatformUsageChart/>
                    </CardContent>
                </Card>
                <Card className="col-span-1">
                    <CardHeader>
                        <CardTitle>Uso de Bases de Datos</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <DatabaseUsageChart/>
                    </CardContent>
                </Card>
            </div>
        </div>
    );


}