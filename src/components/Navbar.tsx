'use client';

import React from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';
import Link from 'next/link';
import { useSidebar } from '@/store/SidebarContext';

const Navbar: React.FC = () => {
    const { data: session } = useSession();
    const { isSidebarCollapsed, toggleSidebar, isSidebarOpen } = useSidebar();

    return (
        <nav className="bg-background text-foreground w-full h-16 z-50 flex-none relative overflow-hidden">
            <div className="container mx-auto py-3 flex justify-between items-center sm:ml-8">
                <div className="flex items-center">
                    <Link href="/" className="text-muted-foreground text-xl font-bold">
                        dataanalytic.ai
                    </Link>
                </div>
                <div className="flex items-center">
                    <Link
                        href="/dashboard"
                        className="hidden mr-4 md:block text-muted-foreground hover:text-primary transition-colors duration-200"
                    >
                        Dashboard
                    </Link>
                    {session?.user ? (
                        <div className="flex items-center">
                            <img
                                className="w-8 h-8 rounded-full mr-4"
                                src={session.user.image || '/default-avatar.png'}
                                alt={session.user.name || session.user.email || 'User'}
                            />
                            <span className="mr-4 text-muted-foreground">
                                {session.user.name || session.user.email}
                            </span>
                            <button
                                className="bg-destructive text-destructive-foreground hover:bg-destructive-foreground hover:text-destructive font-bold py-2 px-4 rounded transition-colors duration-200"
                                onClick={() => signOut()}
                            >
                                Logout
                            </button>
                        </div>
                    ) : (
                        <button
                            className="bg-primary text-primary-foreground hover:bg-primary-foreground hover:text-primary font-bold py-2 px-4 rounded transition-colors duration-200"
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
