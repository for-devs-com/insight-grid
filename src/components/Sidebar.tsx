'use client';

import React from 'react';
import {useSidebar} from '@/store/SidebarContext';
import Link from 'next/link';
import {FolderSync, LayoutDashboard, Database, FileText, Settings, ChevronLeft, ChevronRight} from 'lucide-react';
import {ModeToggle} from '@/components/ui/ThemeModeToggle';
import {usePathname} from 'next/navigation';

interface SidebarProps {
    className?: string;
}

export default function Sidebar({className}: SidebarProps) {
    const {isSidebarCollapsed, toggleSidebarCollapse} = useSidebar();
    const pathname = usePathname(); // Obtener la ruta actual para el estado activo

    // Función para determinar si el ítem está activo
    const isActive = (path: string) => pathname === path;

    return (
        <div
            className={`bg-background flex h-full flex-col justify-between ${
                isSidebarCollapsed ? 'w-16' : 'w-64'
            } transition-all duration-300 ease-in-out ${className}`}
        >
            {/* Header del Sidebar */}
            <div className="flex items-center justify-between py-3 h-16 border-b border-border px-4">
                <h1 className={`text-muted-foreground text-2xl  ${isSidebarCollapsed ? 'hidden' : 'block'}`}>
                    Data Analytic
                </h1>
                <button className="hover:ring focus:outline-none" onClick={toggleSidebarCollapse}>
                    {isSidebarCollapsed ? (
                        <ChevronRight className="w-6 h-6"/>
                    ) : (
                        <ChevronLeft className="w-6 h-6"/>
                    )}
                </button>
            </div>

            {/* Menú de navegación */}
            <div className="flex-1 p-2">
                <ul className="space-y-2">
                    <li>
                        <Link href="/dashboard"
                              className={`flex items-center p-2 rounded-md hover:bg-primary transition-colors duration-200 ${isActive('/dashboard') ? 'bg-muted' : ''}`}>
                            <LayoutDashboard
                                className="w-6 h-6 text-muted-foreground hover:text-primary-foreground transition-colors duration-200"/>
                            <span className={`ml-2 text-muted-foreground ${isSidebarCollapsed ? 'hidden' : 'block'}`}>
                                Dashboard
                            </span>
                        </Link>
                    </li>
                    <li>
                        <Link href="/data_explorer"
                              className={`flex items-center p-2 rounded-md hover:bg-primary transition-colors duration-200 ${isActive('/data_explorer') ? 'bg-muted' : ''}`}>
                            <Database
                                className="w-6 h-6 text-muted-foreground hover:text-primary-foreground transition-colors duration-200"/>
                            <span className={`ml-2 text-muted-foreground ${isSidebarCollapsed ? 'hidden' : 'block'}`}>
                                Data Explorer
                            </span>
                        </Link>
                    </li>
                    <li>
                        <Link href="/data_transfer"
                              className={`flex items-center p-2 rounded-md hover:bg-primary transition-colors duration-200 ${isActive('/data_transfer') ? 'bg-muted' : ''}`}>
                            <FolderSync
                                className="w-6 h-6 text-muted-foreground hover:text-primary-foreground transition-colors duration-200"/>
                            <span className={`ml-2 text-muted-foreground ${isSidebarCollapsed ? 'hidden' : 'block'}`}>
                                Data Transfer
                            </span>
                        </Link>
                    </li>
                    <li>
                        <Link href="/reports"
                              className={`flex items-center p-2 rounded-md hover:bg-primary transition-colors duration-200 ${isActive('/reports') ? 'bg-muted' : ''}`}>
                            <FileText
                                className="w-6 h-6 text-muted-foreground hover:text-primary-foreground transition-colors duration-200"/>
                            <span className={`ml-2 text-muted-foreground ${isSidebarCollapsed ? 'hidden' : 'block'}`}>
                                Reports
                            </span>
                        </Link>
                    </li>
                    <li>
                        <Link href="/settings"
                              className={`flex items-center p-2 rounded-md hover:bg-primary transition-colors duration-200 ${isActive('/settings') ? 'bg-muted' : ''}`}>
                            <Settings
                                className="w-6 h-6 text-muted-foreground hover:text-primary-foreground transition-colors duration-200"/>
                            <span className={`ml-2 text-muted-foreground ${isSidebarCollapsed ? 'hidden' : 'block'}`}>
                                Settings
                            </span>
                        </Link>
                    </li>
                </ul>
            </div>

            {/* Mode Toggle en la parte inferior */}
            <div className="p-4">
                <div className="absolute bottom-4 left-4">
                    <ModeToggle/>
                </div>
            </div>
        </div>
    );
}