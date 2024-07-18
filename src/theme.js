'use client'
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
            default: '#fff', // Color de fondo predeterminado
            paper: '#fff',   // Color de fondo del papel (componentes)
            appBar: '#fff',  // Color de fondo del AppBar
            container: '#fff', // Color de fondo para otros contenedores
        },
        text: {
            primary: '#061a23', // Color de texto primario
        },
    },
    typography: {
        fontFamily: roboto.style.fontFamily,
        h5: {
            color: '#061a23', // Color de texto para variant="h5"
        },
    },
    components: {
        MuiAppBar: {
            styleOverrides: {
                root: {
                    backgroundColor: '#fff', // Color de fondo del AppBar
                },
            },
        },
        MuiContainer: {
            styleOverrides: {
                root: {
                    backgroundColor: '#fff', // Color de fondo para otros contenedores
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    color: '#ffffff', // Color del texto del botón
                    backgroundColor: '#03A63C', // Fondo del botón por defecto
                    '&:hover': {
                        backgroundColor: '#3B8C6E', // Fondo al pasar el mouse
                        '@media (hover: none)': {
                            backgroundColor: '#03A63C', // Volver al color de fondo original en dispositivos sin hover
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
                        color: '#061a23', // Color del texto en el campo de texto
                    },
                    '& .MuiInputLabel-root': {
                        color: '#061a23', // Color del texto de la etiqueta
                    },
                    '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#061a23', // Color del borde del campo de texto
                    },
                    '&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#061a23', // Color del borde del campo de texto al pasar el mouse
                    },
                    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#061a23', // Color del borde del campo de texto cuando está enfocado
                    },
                },
            },
        },
    },
});

export default theme;
