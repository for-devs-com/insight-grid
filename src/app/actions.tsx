"use server";
import 'server-only'

import {createAI, getMutableAIState, createStreamableUI} from 'ai/rsc';
import React, {ReactNode} from "react";
import {ToolInvocation} from "ai";
import {BotCard, BotMessage} from "@/components/chat/message";
import DatabaseConnectionNode from "@/components/nodes/DatabaseConnectionNode";
import {
    runOpenAICompletion,
} from '@/lib/utils';
import {OpenAI} from "openai";
import {sleep} from "@/lib/utils";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY || '',
});

async function submitUserMessage(content: string) {
    'use server';
    const aiState = getMutableAIState<typeof AI>();
    aiState.update([
        ...aiState.get(),
        {
            role: 'user',
            content,
        }
    ])

    const reply = createStreamableUI();

    const completion = runOpenAICompletion(openai, {
        model: 'gpt-3.5-turbo',
        messages: [
            {
                role: 'system',
                content: `\
                    Tú eres un asistente de IA que ayuda a los usuarios a conectar con sus bases de datos.
                    Puedes realizar operaciones CRUD y analizar datos para generar insights.

                    Si el usuario desea conectar a una nueva base de datos, llama a 'get_db_conn' para iniciar el proceso.
                    Si el usuario necesita actualizar datos, usa 'update_data' para modificar la información.
                    Para consultas específicas, llama a 'run_query' para ejecutar consultas SQL directamente.
                    Si el usuario quiere ver los insights generados, dirige a 'show_insights' para desplegar análisis y visualizaciones.
                    Si hay necesidad de gestionar múltiples conexiones de bases de datos, utiliza 'manage_connections' para manejarlas eficientemente.

                    Además de eso, puedes chatear con los usuarios y realizar algunos cálculos si es necesario.
            `,
            },
            ...aiState.get().map((info: any) => ({
                role: info.role,
                content: info.content,
                name: info.name,
            })),
        ],
        functions:
            [
                {
                    name: 'get_db_conn',
                    description: 'Inicia el proceso para conectar a una base de datos.',
                    action: 'add_db_connection',
                },
                {
                    name: 'update_data',
                    description: 'Actualiza los datos de la base de datos.',
                    action: 'update_data',
                },
                {
                    name: 'run_query',
                    description: 'Ejecuta una consulta SQL en la base de datos.',
                    action: 'run_query',
                },
                {
                    name: 'show_insights',
                    description: 'Muestra los insights generados a partir de los datos.',
                    action: 'show_insights',
                },
                {
                    name: 'manage_connections',
                    description: 'Gestiona múltiples conexiones de bases de datos.',
                    action: 'manage_connections',
                },
            ],
        temperature: 0,
    });

    completion.onTextContent((content: string, isFinal: boolean) => {
        reply.update(<BotMessage>{content}</BotMessage>);
        if (isFinal) {
            reply.done();
            aiState.done([...aiState.get(), { role: 'assistant', content }]);
        }
    });

    completion.onFunctionCall('get_db_conn', async () => {
        const newNode = {
            id: `${Math.random()}`,
            type: 'databaseConnection',
            data: { label: 'Database Connection' },
            position: { x: Math.random() * 250, y: Math.random() * 100 },
        };
        reply.update(

                <DatabaseConnectionNode{...newNode} />

        );

        await sleep(1000);

        reply.done();
        aiState.done([
            ...aiState.get(),
            {
                role: 'function',
                name: 'get_db_conn',
                content: 'Iniciando proceso para conectar a una base de datos...',
            },
        ]);
    });


}


export async function suggestDatabaseConnection() {
    return {
        id: new Date().getTime(),
        role: 'assistant',
        content: 'I suggest you create your first database connection. Click on "Add Database Connection" to get started.',
    };
}

const content = '\
  You are an AI assistant that help users to connect to their databases, execute CRUD operations and analyze data to generate insights.\
'

export type initialAIState = Array<{
    id?: number;
    name?: 'get_db_conn' | 'get_db_latest_conn';
    role: 'user' | 'assistant' | 'system' | 'function';
    content: string;
}>;

export type initialUIState = Array<{
    id: number;
    role: 'user' | 'assistant';
    display: ReactNode;
    toolInvocations?: ToolInvocation[];
}>;

export const AI = createAI({
    initialAIState: [],
    initialUIState: [],
    actions: {
        sendMessage: submitUserMessage,
        suggestDatabaseConnection,
    },

});

