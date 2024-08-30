"use client"
import React from "react";

export default function DashboardLayout({
                                            children,
                                        }: {
    children: React.ReactNode;
}) {
    return (<section>
        <h1>Database Connection</h1>
        {children}
    </section>)
}