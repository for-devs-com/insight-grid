"use client";
import React, { useEffect, useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useSession, signIn } from 'next-auth/react';

const Hero = () => {
    const [isAboutVisible, setIsAboutVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const aboutElement = document.getElementById('about');
            if (aboutElement) {
                const rect = aboutElement.getBoundingClientRect();
                setIsAboutVisible(rect.top <= window.innerHeight && rect.bottom >= 0);
            }
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Ejecutar la función al montar el componente

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToAbout = () => {
        const aboutSection = document.getElementById('about');
        if (aboutSection) {
            aboutSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '100vh',
                width: '100vw',
                textAlign: 'center',
                backgroundColor: '#FFFFFF',
                padding: 0,
                margin: 0,
                boxSizing: 'border-box',
                overflowX: 'hidden',
            }}
        >
            <Box
                sx={{
                    position: 'relative',
                    width: '100%',
                    height: '100vh',
                    maxWidth: '100vw',
                    margin: 0,
                    padding: 0,
                    borderRadius: 0,
                    overflow: 'hidden',
                    boxShadow: 'none',
                }}
            >
                <iframe
                    src="https://www.youtube.com/embed/JDzzOHCzBhE?autoplay=1&controls=0&modestbranding=1&rel=0&showinfo=0&iv_load_policy=3"
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        border: 'none',
                        borderRadius: 0,
                        margin: 0,
                        padding: 0,
                    }}
                    title="Video"
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                />
            </Box>
            <Typography variant="h4" gutterBottom sx={{ fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' }, mt: 2 }}>
                Bienvenido a InsightGrid
            </Typography>
            <Typography variant="body1" gutterBottom sx={{ fontSize: { xs: '1rem', sm: '1.25rem', md: '1.5rem' } }}>
                Tu puerta de entrada a una gestión de datos más eficiente.
            </Typography>
            <Button variant="contained" color="primary" size="large" sx={{ padding: { xs: '0.5rem 1rem', md: '1rem 2rem' }, mt: 2 }} onClick={() => signIn()}>
                Get Started
            </Button>
            <Box
                id="about"
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: '100vh',
                    width: '100vw',
                    margin: 0,
                    padding: 2,
                    backgroundColor: '#f9f9f9',
                    color: '#000',
                    boxSizing: 'border-box',
                }}
            >
                <Typography variant="h1" component="h1" sx={{ fontSize: { xs: '2rem', sm: '3rem', md: '4rem' }, marginBottom: 2 }}>
                    Sobre InsightGrid
                </Typography>
                <Typography variant="body1" sx={{ fontSize: { xs: '1rem', sm: '1.25rem', md: '1.5rem' } }}>
                    Bienvenido a InsightGrid, tu puerta de entrada a una integración de datos fluida y una toma de decisiones mejorada.
                    Empoderando a las empresas con soluciones de datos inteligentes y escalables, InsightGrid se conecta sin esfuerzo a cualquier base de datos y muestra los datos a través de una interfaz de cuadrícula fácil de usar, impulsada por modelos de IA.
                </Typography>
                <Typography variant="h3" component="h2" sx={{ fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' }, marginBottom: 2 }}>
                    Nuestro Valor
                </Typography>
                <ul className="list-disc list-inside mb-4">
                    <li>Eliminar la codificación redundante</li>
                    <li>Simplificar integraciones complejas</li>
                    <li>Reducir la manipulación manual de datos</li>
                </ul>
                <Typography variant="h3" component="h2" sx={{ fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' }, marginBottom: 2 }}>
                    Características Actuales
                </Typography>
                <ul className="list-disc list-inside mb-4">
                    <li>Tablas de Datos Sin Costuras</li>
                    <li>Selección de Tablas Personalizable</li>
                    <li>Consulta en Lenguaje Natural (NLQ)</li>
                </ul>
                <Typography variant="h3" component="h2" sx={{ fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' }, marginBottom: 2 }}>
                    ¿Por Qué Elegirnos?
                </Typography>
                <Typography variant="body1" sx={{ fontSize: { xs: '1rem', sm: '1.25rem', md: '1.5rem' } }}>
                    Eficiencia y Colaboración, IA de Vanguardia y una Interfaz Amigable.
                </Typography>
            </Box>
        </Box>
    );
};

export default Hero;
