// Footer.js
import React from 'react';
import { Box, Grid, Link, Typography, Container, IconButton } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';

const socialMediaLinks = {
    facebook: '#',
    twitter: '#',
    instagram: '#',
};

const Footer = () => {
    return (
        <Box
            sx={{
                bgcolor: '#ffffff',
                color: 'text.secondary',
                py: 2, // Reduce el padding vertical
                borderTop: '1px solid',
                borderColor: 'divider',
                width: '100%', // Ocupa el ancho completo
                position: 'relative',
                left: 0,
                right: 0,
                bottom: 0,
            }}
        >
            <Container maxWidth="lg" sx={{ px: { xs: 1, sm: 2, md: 3 } }}>
                <Grid container spacing={1} justifyContent="space-between">
                    <Grid item xs={12} sm={6} md={3}>
                        <Typography variant="h6" color="text.primary" gutterBottom>
                            For-Devs
                        </Typography>

                    </Grid>
                    <Grid item xs={6} sm={3} md={2}>
                        {/*
                        <Typography variant="subtitle2" color="text.primary" gutterBottom>
                            COMPANY
                        </Typography>
                        <Link href="#" color="inherit" display="block">About Us</Link>
                        */}
                        {/* Comentado Careers, Privacy Policy, Terms of Service */}
                        {/*
                        <Link href="#" color="inherit" display="block">Careers</Link>
                        <Link href="#" color="inherit" display="block">Privacy Policy</Link>
                        <Link href="#" color="inherit" display="block">Terms of Service</Link>
                        */}
                    </Grid>
                    {/*
                    <Grid item xs={6} sm={3} md={2}>
                        <Typography variant="subtitle2" color="text.primary" gutterBottom>
                            DEVELOPERS
                        </Typography>
                        <Link href="#" color="inherit" display="block">Public API</Link>
                        <Link href="#" color="inherit" display="block">Documentation</Link>
                        <Link href="#" color="inherit" display="block">Guides</Link>
                    </Grid>
                    */}
                    <Grid item xs={6} sm={3} md={2}>
                        <Typography variant="subtitle2" color="text.primary" gutterBottom>
                            SOCIAL MEDIA
                        </Typography>
                        <IconButton aria-label="Facebook" color="inherit" component="a" href={socialMediaLinks.facebook} sx={{ p: 0.5 }}>
                            <FacebookIcon fontSize="small" />
                        </IconButton>
                        <IconButton aria-label="Twitter" color="inherit" component="a" href={socialMediaLinks.twitter} sx={{ p: 0.5 }}>
                            <TwitterIcon fontSize="small" />
                        </IconButton>
                        <IconButton aria-label="Instagram" color="inherit" component="a" href={socialMediaLinks.instagram} sx={{ p: 0.5 }}>
                            <InstagramIcon fontSize="small" />
                        </IconButton>
                    </Grid>
                </Grid>
                <Typography variant="body2" color="text.secondary" align="center" sx={{ pt: 2 }}>
                    &copy; {new Date().getFullYear()} All rights reserved. Designed by Fdev
                </Typography>
            </Container>
        </Box>
    );
};

export default Footer;
