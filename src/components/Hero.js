import React, { useEffect, useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useSession, signIn } from 'next-auth/react';
import dynamic from 'next/dynamic';

// Importa ReactPlayer solo en el cliente
const ReactPlayer = dynamic(() => import('react-player/youtube'), { ssr: false });

const Hero = () => {
    const [isSectionVisible, setIsSectionVisible] = useState({ about: false });

    useEffect(() => {
        const handleScroll = () => {
            const sections = ['intro', 'benefits', 'testimonials', 'pricing', 'contact', 'about', 'privacy'];
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
        handleScroll(); // Ejecutar la función al montar el componente

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

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
                    muted={true} // Asegura que el autoplay funcione
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
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        backgroundColor: 'transparent',
                        zIndex: 1,
                    }}
                />
            </Box>



            <Typography variant="h4" gutterBottom sx={{ fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' }, mt: 2 }}>
                Welcome to InsightGrid
            </Typography>
            <Typography variant="body1" gutterBottom sx={{ fontSize: { xs: '1rem', sm: '1.25rem', md: '1.5rem' } }}>
                Your Gateway to Seamless Data Integration and Enhanced Decision-Making

            </Typography>
            <Button variant="contained" color="primary" size="large" sx={{ padding: { xs: '0.5rem 1rem', md: '1rem 2rem' }, mt: 2 }} onClick={() => signIn()}>
                Get Started
            </Button>

            <Section id="benefits" title="Benefits" content="Esta es la sección de beneficios. Aquí puedes enumerar los beneficios y características clave que los usuarios pueden obtener de tu plataforma." />
            <Section id="testimonials" title="Testimonials" content="Esta es la sección de testimonios. Aquí puedes mostrar los comentarios y experiencias de tus usuarios o clientes satisfechos." />
            <Section id="pricing" title="Pricing" content="Esta es la sección de precios. Aquí puedes detallar los diferentes planes y opciones de precios disponibles para tus servicios." />
            <Section id="contact" title="Contact Us" content="Esta es la sección de contacto. Aquí puedes proporcionar información de contacto, como dirección de correo electrónico, número de teléfono y un formulario de contacto." />
            <Section id="about" title="About Us" content="Esta es la sección sobre nosotros. Aquí puedes agregar información sobre tu empresa, misión, visión y valores." />
            <Section id="privacy" title="Privacy Policy" content="Esta es la sección de política de privacidad. Aquí puedes detallar las políticas de privacidad y manejo de datos de tu plataforma." />
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
                backgroundColor: '#f9f9f9',
                color: '#000',
                boxSizing: 'border-box',
            }}
        >
            <Typography variant="h1" component="h1" sx={{ fontSize: { xs: '2rem', sm: '3rem', md: '4rem' }, marginBottom: 2 }}>
                {title}
            </Typography>
            <Typography variant="body1" sx={{ fontSize: { xs: '1rem', sm: '1.25rem', md: '1.5rem' } }}>
                {content}
            </Typography>
        </Box>
    );
};

export default Hero;
