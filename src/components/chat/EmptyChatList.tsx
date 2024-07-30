import React from 'react';

const exampleMessages = [
    {
        heading: 'Create a new database connection',
        message: 'Click on "Add Database Connection" to get started.'
    },
    {
        heading: 'Show me the latest data insights',
        message: 'Show me the latest data insights.'
    },
    {
        heading: 'What are CRUD operations?',
        message: 'What are CRUD operations?'
    }
];

export default function EmptyChatList({ submitMessage }: { submitMessage: (message: string) => void }) {
    const handleExampleButtonClick = (message: string) => {
        console.log('handleExampleButtonClick', message);
        submitMessage(message);
    }

    return (
        <div className="text-center max-w-lg mx-auto p-4">
            <div className="rounded-lg border border-gray-300 bg-gray-50 p-6 mb-6">
                <h2 className="text-xl font-semibold mb-4">Welcome to Insight Grid</h2>
                <p className="text-gray-600 mb-4">
                    This is a demo of an interactive assistant for database management. It can help you connect to databases, run queries, and show insights.
                </p>
                <p className="text-gray-600 mb-4">
                    Try an example:
                </p>
                <div className="mt-6 flex flex-col items-start gap-2 mb-6">
                    {exampleMessages.map((example, index) => (
                        <button
                            key={index}
                            className="w-full text-left bg-white border border-gray-300 rounded px-4 py-2 hover:bg-gray-100"
                            onClick={() => handleExampleButtonClick(example.message)}
                        >
                            {example.heading}
                        </button>
                    ))}
                </div>
            </div>
            <p className="text-gray-600 text-center max-w-md mx-auto">
                Note: This is a demo, and the data and latency are simulated for illustrative purposes.
            </p>
        </div>
    );
}
