'use client';

import { Roboto } from 'next/font/google';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';

const roboto = Roboto({
    weight: ['300', '400', '500', '700'],
    subsets: ['latin'],
    display: 'swap',
});

const theme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#061a23', // Color principal
        },
        background: {
            default: '#061a23', // Color de fondo predeterminado
            paper: '#061a23',   // Color de fondo del papel (componentes)
            appBar: '#061a23',  // Color de fondo del AppBar
            container: '#061a23', // Color de fondo para otros contenedores
        },
        text: {
            primary: '#ffffff', // Color de texto primario
        },
    },
    typography: {
        fontFamily: roboto.style.fontFamily,
        h5: {
            color: '#ffffff', // Color de texto para variant="h5"
        },
    },
    components: {
        MuiAppBar: {
            styleOverrides: {
                root: {
                    backgroundColor: '#ffff', // Color de fondo del AppBar
                },
            },
        },
        MuiContainer: {
            styleOverrides: {
                root: {
                    backgroundColor: '#061a23', // Color de fondo para otros contenedores
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    color: '#ffffff', // Color del texto del botón
                    backgroundColor: 'transparent', // Fondo transparente por defecto
                    '&:hover': {
                        backgroundColor: '#ffd803', // Fondo al pasar el mouse
                        '@media (hover: none)': {
                            backgroundColor: 'transparent', // Volver a transparente en dispositivos sin hover
                        },
                    },
                },
            },
        },
        MuiAlert: {
            styleOverrides: {
                root: ({ ownerState }) => ({
                    ...(ownerState.severity === 'info' && {
                        backgroundColor: '#ffd803',
                    }),
                }),
            },
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    '& .MuiInputBase-input': {
                        color: '#ffffff', // Color del texto en el campo de texto
                    },
                    '& .MuiInputLabel-root': {
                        color: '#ffffff', // Color del texto de la etiqueta
                    },
                    '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#ffffff', // Color del borde del campo de texto
                    },
                    '&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#ffffff', // Color del borde del campo de texto al pasar el mouse
                    },
                    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#ffffff', // Color del borde del campo de texto cuando está enfocado
                    },
                },
            },
        },
    },
});

export default theme;
