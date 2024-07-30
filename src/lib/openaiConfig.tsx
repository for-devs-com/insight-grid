import {OpenAI} from 'openai'
import {openai} from '@ai-sdk/openai';

export const openaiClient = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
    }
);

export async function runOpenAICompletion(openaiClient, {model, messages, functions, temperature}) {
    const completion = await openaiClient.createChatCompletion(
        {
            model,
            messages,
            functions,
            temperature,
            stream: true,
        }
    );
    return completion;
}
