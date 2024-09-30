'use client';

import { cn } from '@/lib/utils/tailwind-utils';
import React from 'react';

// Different types of message bubbles.

export const UserMessage = ({ children }: { children: React.ReactNode }) => (
    <div className="flex justify-start">
        <div className="bg-blue-500 text-white p-2 rounded-lg">
            {children}
        </div>
    </div>
);

export const BotMessage = ({ children }: { children: React.ReactNode }) => (
    <div className="flex justify-end">
        <div className="bg-gray-300 p-2 rounded-lg">
            {children}
        </div>
    </div>
);

export function BotCard({
                            children,
                            showAvatar = true,
                        }: {
    children: React.ReactNode;
    showAvatar?: boolean;
}) {
    return (
        <div className="group relative flex items-start md:-ml-12">
            <div
                className={cn(
                    'flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-md border shadow-sm bg-primary text-primary-foreground',
                    !showAvatar && 'invisible',
                )}
            >
                <h2>AI icon</h2>
            </div>
            <div className="ml-4 flex-1 px-1">{children}</div>
        </div>
    );
}

export function SystemMessage({ children }: { children: React.ReactNode }) {
    return (
        <div
            className={
                'mt-2 flex items-center justify-center gap-2 text-xs text-gray-500'
            }
        >
            <div className={'max-w-[600px] flex-initial px-2 py-2'}>{children}</div>
        </div>
    );
}