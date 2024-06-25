"use client";

import React, {useState} from 'react';
import {useSession, signIn} from 'next-auth/react';
import {Container} from '@mui/material';
import DynamicTables from '@/components/DynamicTables';
import DatabaseConnectionForm from '@/components/DatabaseConnectionForm';
import GradientBackgroundWrapper from '@/components/gradientBackground';

export default function Page() {
    const {data: session, status} = useSession();
    const [isConnected, setIsConnected] = useState(false);

    const handleConnectionSuccess = () => {
        setIsConnected(true);
    };

    if (status === 'loading') {
        return <p>Loading...</p>;
    }

    if (!session) {
        return (
            <GradientBackgroundWrapper>
                <Container>
                    <h1>Hey! Welcome to Insight Grid</h1>
                    <h2>Login to your account</h2>
                    <button onClick={() => signIn()}>Sign in</button>
                </Container>
            </GradientBackgroundWrapper>
        );
    }

    return (
        <GradientBackgroundWrapper>
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
        </GradientBackgroundWrapper>
    );
}
