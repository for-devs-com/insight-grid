'use client';

import { useChat } from 'ai/react';
import {Box, Button, InputBase, Paper} from "@mui/material";

export default function Chat() {
    const { messages, input, handleInputChange, handleSubmit } = useChat();
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 12px)', overflow: 'auto', padding: 2 }}>
            <Box sx={{ flexGrow: 1, overflowY: 'auto', border: '1px solid'}}>
                {messages.map((m, i) => (
                    <Paper key={i} sx={{ marginBottom: 1, padding: 1 }}>
                        <b>{m.role === 'user' ? 'User: ' : 'Gridy: '}</b>
                        {m.content}
                    </Paper>
                ))}
            </Box>
            <form onSubmit={handleSubmit} style={{ display: 'flex', marginTop: 'auto' }}>
                <InputBase
                    sx={{ flexGrow: 1, border: '1px solid #ccc', borderRadius: 1, padding: 1, marginRight: 1 }}
                    placeholder="Say something..."
                    value={input}
                    onChange={handleInputChange}
                />
                <Button type="submit" variant="contained" color="primary">Send</Button>
            </form>
        </Box>
);
}