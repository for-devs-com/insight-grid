'use client';

import {useSidebar} from "@/store/SidebarContext";

interface SidebarProps {
    className?: string;
}

export default function Sidebar({ className }: SidebarProps) {
    const { isSidebarOpen, toggleSidebar } = useSidebar();

    return (
        <>
            {/* Overlay para cerrar el Sidebar al hacer clic fuera */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black opacity-50 z-30"
                    onClick={toggleSidebar}
                ></div>
            )}
            <div
                className={`fixed top-0 left-0 h-full bg-gray-800 z-40 transform ${
                    isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
                } transition-transform duration-300 ease-in-out ${className}`}
            >
                <div className="flex items-center justify-between h-16 border-b border-gray-900 px-4">
                    <h1 className="text-white text-2xl">Data Analytic</h1>
                    {/* Botón para cerrar el Sidebar */}
                    <button className="text-white" onClick={toggleSidebar}>
                        ✕
                    </button>
                </div>
                <div className="p-4">
                    <ul className="space-y-2">
                        <li>
                            <a href="/dashboard" className="block text-white">
                                Dashboard
                            </a>
                        </li>
                        <li>
                            <a href="/data_explorer" className="block text-white">
                                Data Explorer
                            </a>
                        </li>
                        <li>
                            <a href="/data_transfer" className="block text-white">
                                Easy Data Transfer
                            </a>
                        </li>
                        <li>
                            <a href="/reports" className="block text-white">
                                Reports
                            </a>
                        </li>
                        <li>
                            <a href="#" className="block text-white">
                                Settings
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    );
}