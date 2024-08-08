import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, IconButton } from '@mui/material';
import { useSession, signIn } from 'next-auth/react';
import dynamic from 'next/dynamic';
import PushPinIcon from '@mui/icons-material/PushPin';

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
                backgroundColor: '#ffffff', // Fondo principal
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
                                autoplay: 0,
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
            <Button variant="contained" color="primary" size="large" sx={{ backgroundColor: '#5cb660', padding: { xs: '0.5rem 1rem', md: '1rem 2rem' }, mt: 2, '&:hover': { backgroundColor: '#4ca750' } }} onClick={() => signIn()}>
                Get Started
            </Button>

            <Section id="about" title="About Us" content="Esta es la sección sobre nosotros. Aquí puedes agregar información sobre tu empresa, misión, visión y valores." />
            <Section id="contact" title="Contact Us" content={<ContactUsContent />} />
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
                backgroundColor: '#ffffff', // Fondo principal de la sección
                color: '#000',
                boxSizing: 'border-box',
                border: 'none',
                borderRadius: 0,
                '&:not(:first-of-type)': {
                    mt: 4, // Margen superior para separar las secciones
                },
                position: 'relative', // Necesario para posicionar el ícono
            }}
        >
            {/* Ícono de chinche en la parte superior central */}
            {(id === 'contact' || id === 'about') && (
                <IconButton
                    sx={{
                        position: 'absolute',
                        top: 0,
                        left: '50%',
                        transform: 'translateX(-50%)',
                        zIndex: 10,
                        color: '#ff5722', // Color del ícono
                        mt: 2,
                        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.3)', // Sombra del ícono
                        borderRadius: '50%', // Redondear el fondo
                        backgroundColor: '#fff', // Fondo blanco detrás del ícono
                        '&:hover': {
                            color: '#e64a19',
                            boxShadow: '0px 6px 12px rgba(0, 0, 0, 0.4)',
                        },
                    }}
                >
                    <PushPinIcon />
                </IconButton>
            )}

            {id === 'contact' || id === 'about' ? (
                <Box
                    sx={{
                        backgroundColor: '#f9f9f9', // Fondo de la caja de contacto y about
                        padding: 4,
                        borderRadius: 2,
                        boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.2)', // Más sombra
                        width: '100%',
                        maxWidth: '800px', // Tamaño máximo de la caja
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
            ) : (
                <Box
                    sx={{
                        width: '100%',
                        maxWidth: '800px', // Tamaño máximo de la sección
                        padding: 2,
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
            )}
        </Box>
    );
};

const ContactUsContent = () => {
    return (
        <Box textAlign="left">
            <Typography variant="h6" gutterBottom>
                We’re Here to Help!
            </Typography>
            <Typography variant="body1" gutterBottom>
                Whether you have a question about features, pricing, need a demo, or anything else, our team is ready to answer all your questions.
            </Typography>

            <Typography variant="h6" gutterBottom>
                Customer Support
            </Typography>
            <Typography variant="body1" gutterBottom>
                For technical support or product inquiries, please contact our support team.
            </Typography>
            <Typography variant="body1" gutterBottom>
                <strong>Email:</strong> support@insightgrid.com
            </Typography>
            <Typography variant="body1" gutterBottom>
                <strong>Phone:</strong> +1 (800) 123-4567
            </Typography>

            <Typography variant="h6" gutterBottom>
                Sales Inquiries
            </Typography>
            <Typography variant="body1" gutterBottom>
                Want to learn more about our enterprise solutions? Contact our sales team.
            </Typography>
            <Typography variant="body1" gutterBottom>
                <strong>Email:</strong> sales@insightgrid.com
            </Typography>
            <Typography variant="body1" gutterBottom>
                <strong>Phone:</strong> +1 (800) 765-4321
            </Typography>
            <Typography variant="body1" gutterBottom>
                <strong>Request a Demo:</strong> Schedule a Demo
            </Typography>

            <Typography variant="h6" gutterBottom>
                Partnership Opportunities
            </Typography>
            <Typography variant="body1" gutterBottom>
                We’re always looking to collaborate with like-minded businesses. If you’re interested in partnership opportunities, we’d love to hear from you.
            </Typography>
            <Typography variant="body1" gutterBottom>
                <strong>Email:</strong> partnerships@insightgrid.com
            </Typography>

            <Typography variant="h6" gutterBottom>
                Media Inquiries
            </Typography>
            <Typography variant="body1" gutterBottom>
                For press releases, interviews, or media-related questions, please contact our media relations team.
            </Typography>
            <Typography variant="body1" gutterBottom>
                <strong>Email:</strong> media@insightgrid.com
            </Typography>

            <Typography variant="h6" gutterBottom>
                General Inquiries
            </Typography>
            <Typography variant="body1" gutterBottom>
                For any other questions or comments, feel free to get in touch with us.
            </Typography>
            <Typography variant="body1" gutterBottom>
                <strong>Email:</strong> info@insightgrid.com
            </Typography>
            <Typography variant="body1" gutterBottom>
                <strong>Office Address:</strong> InsightGrid Inc., 1234 Innovation Way, Tech City, CA 94043, USA
            </Typography>

            <Typography variant="h6" gutterBottom>
                Social Media
            </Typography>
            <Typography variant="body1" gutterBottom>
                Stay connected with us on social media for the latest updates, news, and insights.
            </Typography>
            <Typography variant="body1" gutterBottom>
                <strong>Twitter:</strong> @InsightGrid
            </Typography>
        </Box>
    );
};


export default Hero;
