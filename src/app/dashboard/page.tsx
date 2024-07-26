"use client";

import React, { useState } from 'react';
import { useSession } from 'next-auth/react';
import { Container, Box } from '@mui/material';
import DynamicTables from '@/components/DynamicTables';
import DatabaseConnectionForm from '@/components/DatabaseConnectionForm';
import GradientBackgroundWrapper from '@/components/gradientBackground';
import Hero from '@/components/Hero';
import Footer from "@/components/Footer";

export default function Page() {
    const { data: session, status } = useSession();
    const [isConnected, setIsConnected] = useState(false);

    const handleConnectionSuccess = () => {
        setIsConnected(true);
    };

    if (status === 'loading') {
        return <p>Loading...</p>;
    }

    return (
        <GradientBackgroundWrapper>
            {!session ? (
                <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
                    <Box sx={{ flex: '1' }}>
                        <Hero />
                    </Box>
                    <Footer />
                </Box>
            ) : (
                <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
                    <Container sx={{ flex: '1' }}>
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
                    <Footer />
                </Box>
            )}
        </GradientBackgroundWrapper>
    );
}
