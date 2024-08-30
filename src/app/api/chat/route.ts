import { streamText, generateText } from 'ai';
import { openai } from '@ai-sdk/openai';


export const runtime = 'edge';

export async function POST(req: Request) {
    const { messages } = await req.json();

    // Ask OpenAI for a streaming chat completion given the prompt
    const result = await streamText({
        model: openai('gpt-4o-mini'),
        messages,
    });

    // Respond with the stream
    return result.toAIStreamResponse();
}