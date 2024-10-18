'use client';

import React, { createContext, useState, useContext } from 'react';

interface SidebarContextProps {
    isSidebarOpen: boolean;
    isSidebarCollapsed: boolean;
    toggleSidebar: () => void;
    toggleSidebarCollapse: () => void;
}

const SidebarContext = createContext<SidebarContextProps | undefined>(undefined);

export const SidebarProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Sidebar abierto por defecto en escritorio
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
    const toggleSidebarCollapse = () => setIsSidebarCollapsed(!isSidebarCollapsed);

    return (
        <SidebarContext.Provider value={{ isSidebarOpen, isSidebarCollapsed, toggleSidebar, toggleSidebarCollapse }}>
            {children}
        </SidebarContext.Provider>
    );
};

export const useSidebar = () => {
    const context = useContext(SidebarContext);
    if (!context) {
        throw new Error('useSidebar must be used within a SidebarProvider');
    }
    return context;
};