import { streamText } from 'ai';
import { openai } from '@ai-sdk/openai';


// Set the runtime to edge for best performance
export const runtime = 'edge';

export async function POST(req: Request) {
    const { messages } = await req.json();

    // Ask OpenAI for a streaming chat completion given the prompt
    const result = await streamText({
        model: openai('gpt-3.5-turbo'),
        messages,
    });

    // Respond with the stream
    return result.toAIStreamResponse();
}