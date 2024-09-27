'use client';

import React from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';
import Link from 'next/link';

const Navbar: React.FC = () => {
    const { data: session } = useSession();

    return (
        <nav className="bg-gray-800 text-white w-full top-0 left-0 h-16 right-0 z-50 flex-none relative">
            <div className="container mx-auto px-2 py-3 flex justify-between items-center">
                <div className="flex items-center">
                    <Link href="/">
                        dataanalytic.ai
                    </Link>
                </div>
                <div className="flex items-center">
                    <Link href="/dashboard">
                        Dashboard
                    </Link>
                    {session?.user ? (
                        <div className="flex items-center">
                            <img
                                className="w-8 h-8 rounded-full mr-2"
                                src={session.user.image || undefined}
                                alt={session.user.name || session.user.email || 'User'}
                            />
                            <span className="mr-4">{session.user.name || session.user.email}</span>
                            <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={() => signOut()}>
                                Logout
                            </button>
                        </div>
                    ) : (
                        <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" onClick={() => signIn()}>
                            Sign In
                        </button>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
