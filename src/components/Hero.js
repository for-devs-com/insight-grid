import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, TextField, Grid } from '@mui/material';
import { useSession, signIn } from 'next-auth/react';
import dynamic from 'next/dynamic';

// Importa ReactPlayer solo en el cliente
const ReactPlayer = dynamic(() => import('react-player/youtube'), { ssr: false });

const Hero = () => {
    const [isSectionVisible, setIsSectionVisible] = useState({ about: false });

    useEffect(() => {
        const handleScroll = () => {
            const sections = ['intro', 'benefits', 'testimonials', 'pricing', 'contact', 'about'];
            const updatedVisibility = { ...isSectionVisible };

            sections.forEach((sectionId) => {
                const sectionElement = document.getElementById(sectionId);
                if (sectionElement) {
                    const rect = sectionElement.getBoundingClientRect();
                    updatedVisibility[sectionId] = rect.top <= window.innerHeight && rect.bottom >= 0;
                }
            });

            setIsSectionVisible(updatedVisibility);
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll();

        return () => window.removeEventListener('scroll', handleScroll);
    }, [isSectionVisible]);

    const scrollToSection = (sectionId) => {
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
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
                backgroundColor: '#ffffff',
                padding: 0,
                margin: 0,
                boxSizing: 'border-box',
                overflowX: 'hidden',
                fontFamily: 'Poppins, sans-serif',
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
                <style>
                    {`
            .ytp-chrome-top-buttons, .ytp-chrome-bottom, .ytp-share-button, .ytp-gradient-bottom, .ytp-chrome-controls {
                display: none !important;
            }
        `}
                </style>
                <ReactPlayer
                    url="https://www.youtube.com/watch?v=JDzzOHCzBhE"
                    playing={true}
                    loop={true}
                    muted={true}
                    controls={false}
                    width="100%"
                    height="100%"
                    config={{
                        youtube: {
                            playerVars: {
                                autoplay: 1,
                                modestbranding: 1,
                                rel: 0,
                                showinfo: 0,
                                iv_load_policy: 3,
                                playsinline: 1
                            }
                        }
                    }}
                />
                <Box
                    sx={{
                        position: 'absolute', // Cambiar a 'absolute' para ajustar la posición
                        bottom: '20px', // Ajusta la posición vertical
                        left: '50%', // Centramos horizontalmente
                        transform: 'translateX(-50%)', // Centramos el botón
                        zIndex: 1,
                    }}
                >
                    <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        sx={{
                            backgroundColor: '#5cb660',
                            padding: '1rem 2rem',
                            '&:hover': {
                                backgroundColor: '#4ca750',
                            },
                        }}
                        onClick={() => signIn()}
                    >
                        Get Started
                    </Button>
                </Box>
            </Box>


            {/* Sección "About Us" */}
            <Box id="about" sx={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto', padding: '2rem' }}>
                <Typography
                    variant="h2"
                    sx={{
                        fontSize: '60px',
                        lineHeight: '60px',
                        color: '#282828',
                        fontFamily: 'Inter, sans-serif',
                        fontWeight: 800,
                    }}
                >
                    Bienvenido a InsightGrid
                </Typography>
                <Typography variant="body1" sx={{ fontSize: '1.25rem', color: '#282828', marginTop: '1rem' }}>
                    InsightGrid es una aplicación que utiliza el Dynamic Query Engine como su motor de backend. Su propósito principal es permitir a los usuarios conectar sus bases de datos a través de una interfaz de usuario intuitiva (UI). Una vez conectados, los usuarios pueden transferir sus datos a un sistema de inteligencia artificial (IA) para realizar exploraciones y análisis avanzados. Actualmente, InsightGrid se centra en facilitar la conexión y el procesamiento de datos, habilitando a los usuarios para que aprovechen el poder de la IA en la exploración de sus bases de datos.
                </Typography>
            </Box>

            {/* Sección "Contact Us" con disposición horizontal */}
            <Section id="contact" title="Contact Us" content={<ContactUsSection />} />
        </Box>
    );
};

const Section = ({ id, title, content }) => {
    return (
        <Box
            id={id}
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '100vh',
                width: '100vw',
                margin: 0,
                padding: 2,
                backgroundColor: '#ffffff',
                color: '#000',
                boxSizing: 'border-box',
                border: 'none',
                borderRadius: 0,
                '&:not(:first-of-type)': {
                    mt: 4,
                },
                position: 'relative',
            }}
        >
            <Typography
                variant="h4"
                gutterBottom
                sx={{
                    fontSize: '2.5rem',
                    lineHeight: '3rem',
                    color: '#282828',
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: 800,
                }}
            >
                {title}
            </Typography>
            <Box sx={{ width: '100%', maxWidth: '800px', textAlign: 'center', fontFamily: 'Poppins, sans-serif' }}>{content}</Box>
        </Box>
    );
};

const ContactUsSection = () => {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                width: '100%',
                maxWidth: '800px',
                backgroundColor: '#f9f9f9',
                padding: 4,
                borderRadius: 2,
                boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.2)',
            }}
        >
            <Box sx={{ width: { xs: '100%', md: '50%' }, paddingRight: { md: 4 } }}>
                <Typography variant="h6" gutterBottom>
                    Contact Information
                </Typography>
                <Typography variant="body1" gutterBottom>
                    <strong>Email:</strong> support@insightgrid.com
                </Typography>
                <Typography variant="body1" gutterBottom>
                    <strong>Phone:</strong> +1 (201) 839-7748
                </Typography>
            </Box>

            <Box sx={{ width: { xs: '100%', md: '50%' } }}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            label="First Name"
                            variant="outlined"
                            fullWidth
                            InputProps={{
                                sx: {
                                    borderRadius: '16px'
                                }
                            }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Last Name"
                            variant="outlined"
                            fullWidth
                            InputProps={{
                                sx: {
                                    borderRadius: '16px'
                                }
                            }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Email Address"
                            variant="outlined"
                            fullWidth
                            InputProps={{
                                sx: {
                                    borderRadius: '16px'
                                }
                            }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Phone Number"
                            variant="outlined"
                            fullWidth
                            InputProps={{
                                sx: {
                                    borderRadius: '16px'
                                }
                            }}
                        />
                    </Grid>
                </Grid>
                <Box sx={{ textAlign: 'center', marginTop: 2 }}>
                    <Button variant="contained" color="primary" sx={{ backgroundColor: '#5cb660', '&:hover': { backgroundColor: '#4ca750' } }}>
                        Enviar
                    </Button>
                </Box>
            </Box>
        </Box>
    );
};

export default Hero;
