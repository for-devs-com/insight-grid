"use client";

import {useChat} from 'ai/react';
import {Box, Button, InputBase, Paper} from "@mui/material";
import React from "react";
import {useSession} from "next-auth/react";

export default function Chat() {
    const {messages, input, handleInputChange, handleSubmit} = useChat();
    const {data: session} = useSession();
    return <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        height: 'calc(100vh - 60vh)',
        overflow: 'auto',
        padding: 0,
        margin: 0
    }}>
        <Box sx={{flexGrow: 1, overflowY: 'auto', border: '2px solid', margin: 2}}>
            {messages.map((m, i) => <Paper key={i} sx={{marginBottom: 1, padding: 1}}>
                <b>{m.role === 'user' ? session.user.name + ": ": 'Gridy: '}</b>
                {m.content}
            </Paper>)}
        </Box>
        <Box component="form" onSubmit={handleSubmit} sx={{display: 'flex', padding: 2, backgroundColor: '#f4f4f4'}}>
            <InputBase
                sx={{flexGrow: 1, border: '1px solid #ccc', borderRadius: 1, padding: 1, marginRight: 1}}
                placeholder="Say something..."
                value={input}
                onChange={handleInputChange}
            />
            <Button type="submit" variant="contained" color="primary">Send</Button>
        </Box>
    </Box>;
}