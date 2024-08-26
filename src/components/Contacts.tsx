'use client'

import React, { useState, useRef } from 'react'
import { useSession, signIn } from 'next-auth/react'
import {
    Box,
    Container,
    Typography,
    TextField,
    Grid,
    Button,
    AppBar,
    Toolbar,
    Card,
    CardContent,
    useTheme,
    useMediaQuery,
} from '@mui/material'
import dynamic from 'next/dynamic'

const ReactPlayer = dynamic(() => import('react-player/youtube'), { ssr: false })

export default function Page() {
    const { data: session, status } = useSession()
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down('md'))
    const aboutRef = useRef<HTMLDivElement>(null)
    const contactsRef = useRef<HTMLDivElement>(null)

    const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
        ref.current?.scrollIntoView({ behavior: 'smooth' })
    }

    if (status === 'loading') {
        return (
            <Box sx={{ height: '100vh', width: '100vw', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Typography>Loading...</Typography>
            </Box>
        )
    }

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <AppBar position="fixed" sx={{ backgroundColor: '#0f2b46' }}>
                <Container maxWidth="lg">
                    <Toolbar disableGutters>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            InsightGrid
                        </Typography>
                        <Box sx={{ display: 'flex' }}>
                            <Button color="inherit" onClick={() => scrollToSection(aboutRef)}>HOME</Button>
                            <Button color="inherit">ABOUT US</Button>
                            <Button color="inherit" onClick={() => scrollToSection(contactsRef)}>CONTACT US</Button>
                            <Button color="inherit">PRIVACY POLICY</Button>
                            <Button color="inherit" variant="outlined" onClick={() => signIn()}>
                                SIGN IN
                            </Button>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>

            <Box component="main" sx={{ flexGrow: 1, mt: 8 }}>
                <Box sx={{ height: '100vh', position: 'relative', overflow: 'hidden' }}>
                    <ReactPlayer
                        url="https://www.youtube.com/watch?v=JDzzOHCzBhE"
                        playing={true}
                        loop={true}
                        muted={true}
                        width="100%"
                        height="100%"
                        style={{ position: 'absolute', top: 0, left: 0 }}
                        config={{
                            youtube: {
                                playerVars: {
                                    autoplay: 1,
                                    controls: 0,
                                    modestbranding: 1,
                                    showinfo: 0,
                                    rel: 0,
                                    iv_load_policy: 3,
                                    playsinline: 1,
                                },
                            },
                        }}
                    />
                    <Box sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                        <Container maxWidth="md">
                            <Typography variant="h2" component="h1" align="center" gutterBottom sx={{ color: 'white' }}>
                                Welcome to InsightGrid
                            </Typography>
                            <Typography variant="h5" align="center" paragraph sx={{ color: 'white' }}>
                                Unlock the Power of Your Data
                            </Typography>
                            <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
                                <Button variant="contained" color="primary" size="large" onClick={() => session ? null : signIn()}>
                                    {session ? 'Go to Dashboard' : 'Get Started'}
                                </Button>
                            </Box>
                        </Container>
                    </Box>
                </Box>

                <Box ref={aboutRef} sx={{ py: 8, bgcolor: 'background.paper' }}>
                    <Container maxWidth="lg">
                        <Grid container spacing={4}>
                            <Grid item xs={12} md={3}>
                                <Card>
                                    <CardContent>
                                        <Typography variant="h5" component="div" gutterBottom>
                                            Intuitive UI
                                        </Typography>
                                        <Typography variant="body2">
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                            <Grid item xs={12} md={3}>
                                <Card>
                                    <CardContent>
                                        <Typography variant="h5" component="div" gutterBottom>
                                            AI-Powered Analysis
                                        </Typography>
                                        <Typography variant="body2">
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                            <Grid item xs={12} md={3}>
                                <Card>
                                    <CardContent>
                                        <Typography variant="h5" component="div" gutterBottom>
                                            Secure Data Transfer
                                        </Typography>
                                        <Typography variant="body2">
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                            <Grid item xs={12} md={3}>
                                <Card>
                                    <CardContent>
                                        <Typography variant="h5" component="div" gutterBottom>
                                            Real-time Insights
                                        </Typography>
                                        <Typography variant="body2">
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        </Grid>
                    </Container>
                </Box>

                <Box ref={contactsRef} sx={{ py: 8, bgcolor: 'background.default' }}>
                    <Container maxWidth="md">
                        <Typography variant="h4" component="h2" align="center" gutterBottom>
                            Contact Us
                        </Typography>
                        <form>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Full Name"
                                        variant="outlined"
                                        required
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Email"
                                        variant="outlined"
                                        required
                                        type="email"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Message"
                                        variant="outlined"
                                        required
                                        multiline
                                        rows={4}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        color="primary"
                                        fullWidth
                                    >
                                        Send Message
                                    </Button>
                                </Grid>
                            </Grid>
                        </form>
                    </Container>
                </Box>
            </Box>

            <Box component="footer" sx={{ bgcolor: '#0f2b46', color: 'white', py: 3 }}>
                <Container maxWidth="lg">
                    <Typography variant="body2" align="center">
                        © {new Date().getFullYear()} InsightGrid. All rights reserved.
                    </Typography>
                </Container>
            </Box>
        </Box>
    )
}