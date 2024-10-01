'use client';

import React from 'react';
import {useSession, signIn, signOut} from 'next-auth/react';
import Link from 'next/link';
import {useSidebar} from '@/store/SidebarContext';

const Navbar: React.FC = () => {
    const {data: session} = useSession();
    const {isSidebarCollapsed, toggleSidebar, isSidebarOpen} = useSidebar();

    return (
        <nav className="bg-gray-800 text-white w-full h-16 z-50 flex-none relative overflow-hidden">
            <div className="container mx-auto py-3 flex justify-between items-center sm:ml-8">
                <div className="flex items-center ">
                    <Link href="/">dataanalytic.ai</Link>
                </div>
                <div className="flex items-center ">
                    <Link href="/dashboard" className="hidden mr-4 md:block">
                        Dashboard
                    </Link>
                    {session?.user ? (
                        <div className="flex items-center">
                            <img
                                className="w-8 h-8 rounded-full mr-4"
                                src={session.user.image || undefined}
                                alt={session.user.name || session.user.email || 'User'}
                            />
                            <span className="mr-4">{session.user.name || session.user.email}</span>
                            <button
                                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                                onClick={() => signOut()}
                            >
                                Logout
                            </button>
                        </div>
                    ) : (
                        <button
                            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                            onClick={() => signIn()}
                        >
                            Sign In
                        </button>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;