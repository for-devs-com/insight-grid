'use server';

import {continueConversation, generateTextResponse} from '@/lib/openaiConfig';
import {useSession} from "next-auth/react";
import {getMutableAIState} from "ai/rsc";
import {useWorkspace} from "@/components/Workspace";

export async function getChat() {
    const {data: session, status} = useSession();
    if (!session) {
        return new Error('No session');
    }

    const {messages} = useWorkspace();

    if (!messages) {
        return new Error('No chat');
    }


    return messages.map((message, index) => (
        <div key={index} className="mb-2 p-2 border rounded-md bg-gray-100">
            <b>{message.role === 'user' ? (session?.user?.name || 'User') + ": " : 'Gridy: '}</b>
            {message.content}
        </div>
    ));
}

export async function saveChat(messages) {
    const chat = useWorkspace();

    if (!chat) {
        return new Error('No chat');
    }

    chat.appendMessage(messages);

    return chat.messages;
}

export async function getAnswer(question) {
    return await generateTextResponse(question);
}

export async function continueChat(messages) {
    return await continueConversation(messages);
}

