'use client';

import React from 'react';
import { useSidebar } from '@/store/SidebarContext';

interface ContentAreaProps {
    children: React.ReactNode;
}

const ContentArea: React.FC<ContentAreaProps> = ({ children }) => {
    const { isSidebarCollapsed } = useSidebar();

    return (
        <main
            className={`w-full overflow-auto transition-all duration-300 ease-in-out ${
                isSidebarCollapsed ? 'ml-0' : 'ml-0'
            } p-0`}
        >
            {children}
        </main>
    );
};

export default ContentArea;
