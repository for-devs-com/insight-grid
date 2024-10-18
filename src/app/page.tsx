'use client';
import React from 'react';
import {useSession, signIn} from 'next-auth/react';

export default function Page() {
    const {data: session, status} = useSession();

    if (status === 'loading') {
        return <p>Loading...</p>;
    }

    if (!session) {
        return (
            <div className="container mx-auto p-4">
                <h1 className="text-2xl font-bold mb-2">Hey! Welcome to Insight Grid</h1>
                <h2 className="text-xl mb-4">Login to your account</h2>
                <button className="bg-primary hover:bg-secondary text-white font-bold py-2 px-4 rounded"
                        onClick={() => signIn()}>Sign in
                </button>
            </div>
        );
    }

    return (
        <div className="flex flex-1 container">
            Here the LaunchPage
        </div>
    );
}
