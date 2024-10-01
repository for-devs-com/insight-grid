'use client'
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#0f2b46',
        },
        secondary: {
            main: '#5cb660',
        },
        background: {
            default: '#ffffff',
            paper: '#f5f5f5',
        },
        text: {
            primary: '#333333',
            secondary: '#666666',
        },
    },
    typography: {
        fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
        h1: {
            fontFamily: "'Poppins', sans-serif",
            fontWeight: 700,
        },
        h2: {
            fontFamily: "'Poppins', sans-serif",
            fontWeight: 700,
        },
        h3: {
            fontFamily: "'Poppins', sans-serif",
            fontWeight: 600,
        },
        h4: {
            fontFamily: "'Poppins', sans-serif",
            fontWeight: 600,
        },
        h5: {
            fontFamily: "'Poppins', sans-serif",
            fontWeight: 500,
        },
        h6: {
            fontFamily: "'Poppins', sans-serif",
            fontWeight: 500,
        },
        body1: {
            fontFamily: "'Roboto', sans-serif",
        },
        body2: {
            fontFamily: "'Roboto', sans-serif",
        },
    },
});

export default theme;