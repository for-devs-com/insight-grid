import React from 'react';
import { useSession } from "next-auth/react";

export function ChatList({ messages }: { messages: any[] }) {
    const { data: session } = useSession();

    if (!messages || messages.length === 0) {
        return null;
    }

    return (
        <>
            {messages.map((message, index) => (
                <div key={index} className="mb-2 p-2 border rounded-md bg-gray-100">
                    <b>{message.role === 'user' ? (session?.user?.name || 'User') + ": " : 'Gridy: '}</b>
                    {message.content}
                </div>
            ))}
        </>
    );
}

export default ChatList;
