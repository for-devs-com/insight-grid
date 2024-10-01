'use client';

import React from 'react';
import { useSidebar } from '@/store/SidebarContext';
import Link from 'next/link';

interface SidebarProps {
    className?: string;
}

export default function Sidebar({ className }: SidebarProps) {
    const { isSidebarOpen, isSidebarCollapsed, toggleSidebarCollapse } = useSidebar();

    return (
        <div
            className={`bg-gray-800 h-full flex flex-col ${
                isSidebarCollapsed ? 'w-16' : 'w-64'
            } transition-all duration-300 ease-in-out ${className}`}
        >
            <div className="flex items-center justify-between h-16 border-b border-gray-900 px-4">
                <h1 className={`text-white text-2xl ${isSidebarCollapsed ? 'hidden' : 'block'}`}>Data Analytic</h1>
                <button className="text-white" onClick={toggleSidebarCollapse}>
                    {isSidebarCollapsed ? '➡️' : '⬅️'}
                </button>
            </div>
            <div className="flex-1 p-4">
                <ul className="space-y-2">
                    <li>
                        <Link href="/dashboard" className="flex items-center text-white">
                            <span className={`ml-2 ${isSidebarCollapsed ? 'hidden' : 'block'}`}>Dashboard</span>
                        </Link>
                    </li>
                    <li>
                        <Link href="/data_explorer" className="flex items-center text-white">
                            <span className={`ml-2 ${isSidebarCollapsed ? 'hidden' : 'block'}`}>Data Explorer</span>
                        </Link>
                    </li>
                    <li>
                        <Link href="/data_transfer" className="flex items-center text-white">
                            <span className={`ml-2 ${isSidebarCollapsed ? 'hidden' : 'block'}`}>Easy Data Transfer</span>
                        </Link>
                    </li>
                    <li>
                        <Link href="/reports" className="flex items-center text-white">
                            <span className={`ml-2 ${isSidebarCollapsed ? 'hidden' : 'block'}`}>Reports</span>
                        </Link>
                    </li>
                    <li>
                        <Link href="#" className="flex items-center text-white">
                            <span className={`ml-2 ${isSidebarCollapsed ? 'hidden' : 'block'}`}>Settings</span>
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    );
}
