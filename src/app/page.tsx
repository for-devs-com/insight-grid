'use client';
import React, { useState } from 'react';
import { useSession } from 'next-auth/react';
import { Box, Container } from '@mui/material';
import DynamicTables from '@/components/DynamicTables';
import DatabaseConnectionForm from '@/components/DatabaseConnectionForm';
import Hero from "@/components/Hero";

export default function Page() {
    const { data: session, status } = useSession();
    const [isConnected, setIsConnected] = useState(false);

    const handleConnectionSuccess = () => {
        setIsConnected(true);
    };

    if (status === 'loading') {
        return <p>Loading...</p>;
    }

    if (!session) {
        return (
            <Box
                sx={{
                    height: '100vh',
                    width: '100vw',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    overflow: 'hidden'
                }}
            >
                <Hero />
            </Box>
        );
    }

    return (
        <Container>
            <h1>Grid Page</h1>
            {!isConnected ? (
                <DatabaseConnectionForm onConnectionSuccess={handleConnectionSuccess} />
            ) : (
                <>
                    <p>Success Connection to the Intelligent data insight tool for your business</p>
                    <DynamicTables />
                </>
            )}
        </Container>
    );
}
