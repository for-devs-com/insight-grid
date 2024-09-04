'use client';


import {CreateMessage, Message, useChat, UseChatHelpers} from 'ai/react';
import React, {createContext, useCallback, useContext, useEffect} from "react";
import {ensureMessageId, ensureToolResult} from "@/lib/utils/util";
import Ide from "@/components/ide";
import InteractiveCanvas from "@/components/InteractiveCanvas";
import useCanvasStore from "@/store/useCanvasStore";
import {useSession} from "next-auth/react";
import Sidebar from "@/components/Sidebar";

// TODO: support public/private DBs that live in the cloud
export type Visibility = 'local' | 'public' | 'private'

export type WorkspaceProps = {
    /**
     * The unique ID for a conversation.
     * A conversation is a collection of messages, the workspace and app state.
     * This ID is used to identify the conversation in the database.
     */
    conversationId: string

    /**
     * The visibility of this conversation.
     * - `local` means the database is stored locally in the client side or theirs own db config.
     */
    visibility: Visibility

    /**
     * Callback called after the user sends a message.
     */
    onMessage?: (
        message: Message | CreateMessage,
        append: UseChatHelpers['append']
    ) => void | Promise<void>

    /**
     * Callback called when the user is replying to a message.
     */
    onReply?: (message: Message, append: UseChatHelpers['append']) => void | Promise<void>;

    /**
     * Callback called when the user cancels a reply.
     */
    onCancelReply?: (append: UseChatHelpers['append']) => void | Promise<void>;

    /**
     * New elements to be added to the workspace.
     */
    newElements: any[];

    /**
     * nodes from The chat component to be added to the workspace.
     */
    onNewNode: (node: any) => void;
}

export default function Workspace({
                                      conversationId,
                                      visibility,
                                      onMessage,
                                      onReply,
                                      onCancelReply,
                                      newElements,
                                      onNewNode
                                  }: WorkspaceProps) {

    /*const {data: existingMessages, isLoading: isLoadingMessages} = useMessagesQuery(conversationId)
    const {data: tables, isLoading: isLoadingSchema} = useTablesQuery({conversationId: conversationId});*/
    /*const {mutateAsync: saveMessage} = useMessageCreateMutation(conversationId)*/
    const {setNodes, setEdges, setIsConnected, nodes, edges, isConnected } = useCanvasStore();
    const {data: session} = useSession();
    const userId = session?.user?.id as string;

    const fetchAppState = async (userId: string) => {
        try {
            const response = await fetch(`/api/state/${userId}`);
            if (response.ok) {
                return await response.json();
            } else {
                console.error('Failed to fetch app state:', await response.json());
            }
        } catch (error) {
            console.error('Error fetching app state:', error);
        }
    };

    const saveAppState = async (userId: string, canvasState: any) => {
        try {
            const response = await fetch('/api/state', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userId, canvasState }),
            });

            if (!response.ok) {
                console.error('Failed to save app state:', await response.json());
            }

            return await response.json();
        } catch (error) {
            console.error('Error saving app state:', error);
        }
    };

    useEffect(() => {
        const loadCanvasState = async () => {
            if (userId) {
                const appState = await fetchAppState(userId);
                if (appState) {
                    setNodes(appState.nodes);
                    setEdges(appState.edges);
                    setIsConnected(appState.isConnected);
                }
            }
        };

        loadCanvasState();
    }, [userId, setNodes, setEdges, setIsConnected]);

    // Guardar el estado automáticamente en cada cambio de nodos o aristas
    useEffect(() => {
        if (userId) {
            const currentState = { nodes, edges, isConnected };
            saveAppState(userId, currentState);
        }
    }, [userId, nodes, edges, isConnected]);




    const {messages, setMessages, append, stop} = useChat({
        id: conversationId,
        api: '/api/chat',
        maxToolRoundtrips: 10,
        keepLastMessageOnError: true,
        initialMessages: [],
        async onFinish(message) {
            await onReply?.(message, append);
        },
    });

    const initialMessages = messages; // TODO:  research about useMemo() and useCallback() to optimize this

    const appendMessage = useCallback(
        async (message: Message | CreateMessage) => {
            setMessages((messages) => {
                const isModified = ensureToolResult(messages)
                return isModified ? [...messages] : messages
            })
            ensureMessageId(message)
            // Intentionally don't await so that framer animations aren't affected
            append(message)
            onMessage?.(message, append)
        },
        [onMessage, setMessages, append]
    );

    const stopReply = useCallback(async () => {
        stop()
        onCancelReply?.(append);
    }, [stop, onCancelReply, append]);


    return (
        <WorkspaceContext.Provider value={{
            conversationId: conversationId,
            messages,
            appendMessage,
            stopReply,
            newElements,
            onNewNode
        }}>
            <div className="flex flex-grow">
                <Sidebar/>
                <Ide className={"flex-1"}>

                    <InteractiveCanvas newElements={newElements}/>
                </Ide>
            </div>
        </WorkspaceContext.Provider>
    )
}

export type WorkspaceContextValues = {
    conversationId: string
    messages: Message[]
    appendMessage: (message: Message | CreateMessage) => void
    stopReply()
        :
        Promise<void>
    newElements: any[],
    onNewNode: (node: any) => void
}

export const WorkspaceContext = createContext
    < WorkspaceContextValues | undefined > (undefined)

export function useWorkspace() {
    const context = useContext(WorkspaceContext)
    if (!context) {
        throw new Error('WorkspaceContext missing. Are you accessing useWorkspace() outside of a Workspace?')
    }
    return context
}