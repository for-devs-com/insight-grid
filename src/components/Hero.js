'use client'

import React from 'react'
import { Box, Typography, Button, Container, Grid } from '@mui/material'
import { useSession, signIn } from 'next-auth/react'
import dynamic from 'next/dynamic'

const ReactPlayer = dynamic(() => import('react-player/youtube'), { ssr: false })

const Hero = () => {
    const { data: session } = useSession()

    return (
        <Box sx={{ position: 'relative', width: '100%', height: '100vh', overflow: 'hidden' }}>
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
            <Box
                sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(15, 43, 70, 0.7)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Container maxWidth="lg">
                    <Grid container spacing={4} alignItems="center">
                        <Grid item xs={12} md={8}>
                            <Typography
                                variant="h1"
                                sx={{
                                    fontSize: { xs: '2.5rem', md: '3.5rem' },
                                    fontWeight: 700,
                                    mb: 2,
                                    color: 'white',
                                }}
                            >
                                Welcome to InsightGrid
                            </Typography>
                            <Typography variant="h2" sx={{ fontSize: { xs: '1.5rem', md: '2rem' }, mb: 4, color: 'white' }}>
                                Unlock the Power of Your Data
                            </Typography>
                            <Button
                                variant="contained"
                                size="large"
                                onClick={() => (session ? null : signIn())}
                                sx={{
                                    backgroundColor: '#5cb660',
                                    '&:hover': {
                                        backgroundColor: '#4ca750',
                                    },
                                    px: 4,
                                    py: 1.5,
                                    fontSize: '1.1rem',
                                }}
                            >
                                {session ? 'Go to Dashboard' : 'Get Started'}
                            </Button>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </Box>
    )
}

export default Hero