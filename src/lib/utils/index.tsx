import {
    TAnyToolDefinitionArray,
    TToolDefinitionMap,
} from '@/lib/utils/tool-definition';
import { OpenAIStream } from 'ai';
import type OpenAI from 'openai';
import zodToJsonSchema from 'zod-to-json-schema';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { z } from 'zod';

const consumeStream = async (stream: ReadableStream) => {
    const reader = stream.getReader();
    while (true) {
        const { done } = await reader.read();
        if (done) break;
    }
};

export function runOpenAICompletion<
    T extends Omit<
        Parameters<typeof OpenAI.prototype.chat.completions.create>[0],
        'functions'
    >,
    const TFunctions extends TAnyToolDefinitionArray,
>(
    openai: OpenAI,
    params: {
        functions: readonly [{
            readonly name: "get_db_conn";
            readonly description: "Inicia el proceso para conectar a una base de datos.";
            readonly action: "add_db_connection"
        }, {
            readonly name: "update_data";
            readonly description: "Actualiza los datos de la base de datos.";
            readonly action: "update_data"
        }, {
            readonly name: "run_query";
            readonly description: "Ejecuta una consulta SQL en la base de datos.";
            readonly action: "run_query"
        }, {
            readonly name: "show_insights";
            readonly description: "Muestra los insights generados a partir de los datos.";
            readonly action: "show_insights"
        }, {
            readonly name: "manage_connections";
            readonly description: "Gestiona múltiples conexiones de bases de datos.";
            readonly action: "manage_connections"
        }];
        temperature: number;
        messages: ({ role: string; content: string } | { role: any; name: any; content: any })[];
        model: string
    },
) {
    let text = '';
    let hasFunction = false;

    type TToolMap = TToolDefinitionMap<TFunctions>;
    let onTextContent: (text: string, isFinal: boolean) => void = () => {};

    const functionsMap: Record<string, TFunctions[number]> = {};
    for (const fn of params.functions) {
        functionsMap[fn.name] = fn;
    }

    let onFunctionCall = {} as any;

    const { functions, ...rest } = params;

    (async () => {
        consumeStream(
            OpenAIStream(
                (await openai.chat.completions.create({
                    ...rest,
                    stream: true,
                    functions: functions.map(fn => ({
                        name: fn.name,
                        description: fn.description,
                        parameters: zodToJsonSchema(fn.parameters) as Record<
                            string,
                            unknown
                        >,
                    })),
                })) as any,
                {
                    async experimental_onFunctionCall(functionCallPayload) {
                        hasFunction = true;

                        if (!onFunctionCall[functionCallPayload.name]) {
                            return;
                        }

                        // we need to convert arguments from z.input to z.output
                        // this is necessary if someone uses a .default in their schema
                        const zodSchema = functionsMap[functionCallPayload.name].parameters;
                        const parsedArgs = zodSchema.safeParse(
                            functionCallPayload.arguments,
                        );

                        if (!parsedArgs.success) {
                            throw new Error(
                                `Invalid function call in message. Expected a function call object`,
                            );
                        }

                        onFunctionCall[functionCallPayload.name]?.(parsedArgs.data);
                    },
                    onToken(token) {
                        text += token;
                        if (text.startsWith('{')) return;
                        onTextContent(text, false);
                    },
                    onFinal() {
                        if (hasFunction) return;
                        onTextContent(text, true);
                    },
                },
            ),
        );
    })();

    return {
        onTextContent: (
            callback: (text: string, isFinal: boolean) => void | Promise<void>,
        ) => {
            onTextContent = callback;
        },
        onFunctionCall: <TName extends TFunctions[number]['name']>(
            name: TName,
            callback: (
                args: z.output<
                    TName extends keyof TToolMap
                        ? TToolMap[TName] extends infer TToolDef
                            ? TToolDef extends TAnyToolDefinitionArray[number]
                                ? TToolDef['parameters']
                                : never
                            : never
                        : never
                >,
            ) => void | Promise<void>,
        ) => {
            onFunctionCall[name] = callback;
        },
    };
}

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const formatNumber = (value: number) =>
    new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    }).format(value);

export const runAsyncFnWithoutBlocking = (
    fn: (...args: any) => Promise<any>,
) => {
    fn();
};

export const sleep = (ms: number) =>
    new Promise(resolve => setTimeout(resolve, ms));

// Fake data
export function getStockPrice(name: string) {
    let total = 0;
    for (let i = 0; i < name.length; i++) {
        total = (total + name.charCodeAt(i) * 9999121) % 9999;
    }
    return total / 100;
}