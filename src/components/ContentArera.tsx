'use client';

import React from 'react';
import { useSidebar } from '@/store/SidebarContext';

interface ContentAreaProps {
    children: React.ReactNode;
}

const ContentArea: React.FC<ContentAreaProps> = ({ children }) => {
    const { isSidebarOpen } = useSidebar();

    return (
        <main
            className={`flex-1 overflow-auto transition-all duration-300 ease-in-out ${
                isSidebarOpen ? 'ml-64' : 'ml-0'
            }`}
        >
            {children}
        </main>
    );
};

export default ContentArea;
