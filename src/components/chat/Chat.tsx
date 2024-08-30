'use client';

import {useChat} from 'ai/react';
import {useSession} from 'next-auth/react';
import React, {useEffect, useRef, useState} from 'react';
import DatabaseConnBtn from './DatabaseConnBtn';
import ChatList from './ChatList';
import EmptyChatList from './EmptyChatList';
import {suggestDatabaseConnection} from "@/app/actions";
import {Message, Role} from "@/components/types";
import {v4 as uuidv4} from "uuid";

export default function Chat({onNewNode}) {
    const {messages, setMessages, input, handleInputChange, handleSubmit} = useChat();
    const {data: session, status} = useSession();
    const [inputValue, setInputValue] = useState('');
    const [showExampleButtons, setShowExampleButtons] = useState(true);
    const chatFormRef = useRef<HTMLFormElement>(null);
    const chatInputRef = useRef<HTMLInputElement>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const [isMessageListEmpty, setIsMessageListEmpty] = useState(true);

    useEffect(() => {
        if (session) {
            // Sugiere crear la primera conexión a la base de datos cuando el componente se monta
            async function suggestConnection() {
                const suggestion = await suggestDatabaseConnection();
                handleNewMessageFromSuggestion(suggestion);
            }

            suggestConnection();
        }
    }, [session]);

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({behavior: 'smooth'});
        }
    }, [messages]);

    useEffect(() => {
        if (messages.length > 0) {
            setIsMessageListEmpty(false);
        }
    }, [messages]);

    const handleNewUserMessage = (event: React.FormEvent) => {
        event.preventDefault();
        handleSubmit(event as any);
        setShowExampleButtons(false);
    };

    const handleNewMessageFromSuggestion = (message: { content: string; role: string }) => {
        const customEvent = {
            preventDefault: () => {
            },
            target: {value: message.content},
        };
        handleSubmit(customEvent as any);
    };

    const handleNewMessageFromExampleButtons = (content: string) => {
        handleSubmit({
            preventDefault: () => {
            },
            target: {value: content}
        } as any);
        setShowExampleButtons(false);

    };

    const handleExampleButtonClick = (exampleMessage: { content: string, role: string }) => {
        handleNewMessageFromExampleButtons(exampleMessage.content);
    };

    const addMessage = (message: { content: string, role: Role }) => {
        const newMessage = {id: uuidv4(), role: message.role, content: message.content};
        setMessages((prevMessages: Message[]) => [
            ...prevMessages, newMessage
        ]);
        if (message.role === 'user') {
            handleSubmit({
                preventDefault: () => {
                },
                target: {value: message.content}
            } as any);
        }
        /*handleNewMessageFromExampleButtons(message.content);*/
    }

    const addNodeToCanvas = (node) => {
        onNewNode(node);
    };

    if (status === 'loading') {
        return <div className="text-center">Loading...</div>;
    }

    if (status === 'unauthenticated') {
        return (
            <div className="flex justify-center items-center h-full">
                <p className="text-lg">Please log in to use the chat.</p>
            </div>
        );
    }

    if (!session) {
        return (
            <div className="flex justify-center items-center h-full">
                <div>Please log in to use the chat.</div>
            </div>
        );
    }

    return (
        <div className="flex flex-col h-full overflow-auto p-4 border-l border-gray-300 bg-white">
            <div className="flex-grow overflow-y-auto border-b border-gray-300 p-4">
                {isMessageListEmpty ? (
                    <EmptyChatList addMessage={addMessage}/>
                ) : (
                    <>
                        <ChatList messages={messages}/>
                        <div ref={messagesEndRef}/>
                    </>
                )}
            </div>

            <form
                ref={chatFormRef}
                onSubmit={handleNewUserMessage}
                className="flex p-4 bg-gray-100 border-t border-gray-300 sticky bottom-0 w-full"
            >
                <input
                    className="flex-grow border border-gray-300 rounded px-4 py-2 mx-2"
                    placeholder="Say something..."
                    ref={chatInputRef}
                    value={input}
                    onChange={handleInputChange}
                />
                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Send
                </button>
            </form>
        </div>
    );
}
