'use server';
import {openai} from '@ai-sdk/openai';
import {createAI, createStreamableValue, getAIState, getMutableAIState, streamUI} from 'ai/rsc';
import {convertToCoreMessages, CoreMessage, generateId, generateText, Message, streamText} from 'ai';
import {z} from "zod";
import InputNode from "@/components/nodes/InputNode";
import {ReactNode} from "react";
import {BotMessage} from "@/components/chat/Message";

export interface BotMessageInterface {
    role: 'user' | 'assistant' | 'function';
    content: string;
}

export interface ClientMessageInterface {
    id: string;
    role: 'user' | 'assistant' | 'function';
    display: ReactNode;
}



// Función para generar texto usando `generateText`
export async function generateTextResponse(input: string) {
    const stream = createStreamableValue(input);

    await (async () => {
        const {textStream} = await streamText({
            model: openai("gpt-4o-mini"),
            prompt: input,
        });
        for await (const delta of textStream) {
            console.log(delta);
            stream.update(delta);
        }
        stream.done()

    })();
    return {output: stream.value};
}

// Función para manejar una conversación completa usando `streamUI`
export async function continueConversation(
    input: string,
): Promise<ClientMessageInterface> {

    const history = getMutableAIState();

    const result = await streamUI({
        model: openai("gpt-4o-mini"),
        messages: [...history.get(),
            {role: 'user', content: input}],
        text: ({content, done}) => {
            if (done) {
                history.done([
                    ...history.get(),
                    { role: 'user', content: input },
                    { role: 'assistant', content },
                ]);
            }

            return <BotMessage content={content}/>;
        },
        tools: {
            createNodeOnCanvas: {
                description:
                    'Create an input node on the canvas with the given DataBaseConnection',
                parameters: z.object({
                    symbol: z.string(),
                }),
                generate: async ({symbol}) => {
                    history.done([
                        ...history.get(),
                        {
                            role: 'function',
                            name: 'createNodeOnCanvas',
                            content: `Showing input on canvas ${symbol}`,
                        },
                    ]);

                    return <InputNode/>;
                },
            },
        },
    });

    return {
        id: generateId(),
        role: 'assistant',
        display: result.value,
    };
}


