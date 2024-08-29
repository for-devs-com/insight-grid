'use client'

import React, { useState, useRef, useEffect } from 'react'
import { useSession, signIn } from 'next-auth/react'
import {
    Box,
    Container,
    Typography,
    TextField,
    Grid,
    Button,
    Card,
    CardContent,
    useMediaQuery,
    Paper,
    InputAdornment,
    CssBaseline,
    IconButton,
    Link,
} from '@mui/material'
import { ThemeProvider, createTheme, styled } from '@mui/material/styles'
import dynamic from 'next/dynamic'
import { ArrowForward, Security, Psychology, Group, SettingsApplications, Email, Phone, LocationOn, Person, Message } from '@mui/icons-material'
import DynamicTables from '@/components/DynamicTables'
import DatabaseConnectionForm from '@/components/DatabaseConnectionForm'
import Navbar from '@/components/Navbar'
import { useSearchParams } from 'next/navigation'

const ReactPlayer = dynamic(() => import('react-player/youtube'), { ssr: false })

export default function Component() {
    const { data: session, status } = useSession()
    const [isConnected, setIsConnected] = useState(false)
    const homeRef = useRef<HTMLDivElement>(null)
    const aboutRef = useRef<HTMLDivElement>(null)
    const contactsRef = useRef<HTMLDivElement>(null)
    const searchParams = useSearchParams()

    useEffect(() => {
        const section = searchParams.get('section')
        if (section) {
            scrollToSection(section)
        }
    }, [searchParams])

    const theme = createTheme({
        palette: {
            mode: 'light',
            primary: {
                main: '#0f2b46',
            },
            secondary: {
                main: '#f50057',
            },
        },
        typography: {
            fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
            h1: {
                fontWeight: 700,
            },
            h2: {
                fontWeight: 600,
            },
        },
    })

    const isMobile = useMediaQuery(theme.breakpoints.down('md'))

    const Title = styled(Typography)(({ theme }) => ({
        fontFamily: "'Poppins', sans-serif",
        fontWeight: 700,
        color: theme.palette.primary.main,
        marginBottom: theme.spacing(2),
    }))

    const Subtitle = styled(Typography)(({ theme }) => ({
        fontFamily: "'Roboto', sans-serif",
        fontWeight: 400,
        color: theme.palette.text.secondary,
        marginBottom: theme.spacing(3),
    }))

    const StyledCard = styled(Card)(({ theme }) => ({
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
        '&:hover': {
            transform: 'translateY(-5px)',
            boxShadow: theme.shadows[4],
        },
    }))

    const CardIconWrapper = styled(Box)(({ theme }) => ({
        display: 'flex',
        justifyContent: 'center',
        marginBottom: theme.spacing(2),
    }))

    const ContactCard = styled(Card)(({ theme }) => ({
        borderRadius: theme.spacing(2),
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
        overflow: 'hidden',
    }))

    const ContactInfo = styled(Paper)(({ theme }) => ({
        padding: theme.spacing(4),
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
    }))

    const ContactForm = styled(Paper)(({ theme }) => ({
        padding: theme.spacing(4),
        backgroundColor: theme.palette.background.paper,
    }))

    const IconWrapper = styled(Box)(({ theme }) => ({
        display: 'flex',
        alignItems: 'center',
        marginBottom: theme.spacing(2),
    }))

    const StyledTextField = styled(TextField)(({ theme }) => ({
        marginBottom: theme.spacing(3),
    }))

    const scrollToSection = (section: string) => {
        let ref
        switch (section) {
            case 'home':
                ref = homeRef
                break
            case 'about':
                ref = aboutRef
                break
            case 'contact':
                ref = contactsRef
                break
            default:
                return
        }
        ref.current?.scrollIntoView({ behavior: 'smooth' })
    }

    const handleConnectionSuccess = () => {
        setIsConnected(true)
    }

    if (status === 'loading') {
        return (
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Box sx={{ height: '100vh', width: '100vw', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Typography>Loading...</Typography>
                </Box>
            </ThemeProvider>
        )
    }

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
                <Navbar homeRef={homeRef} aboutRef={aboutRef} contactRef={contactsRef} />
                <Box component="main" sx={{ flexGrow: 1 }}>
                    {!session ? (
                        <>
                            <Box ref={homeRef} sx={{ height: '100vh', position: 'relative', overflow: 'hidden' }}>
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
                                    backgroundColor: 'rgba(0, 0, 0, 0.6)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}>
                                    <Container maxWidth="md">
                                        <Typography variant="h1" align="center" gutterBottom sx={{ color: 'white', fontWeight: 700, fontSize: { xs: '2.5rem', md: '4rem' } }}>
                                            Welcome to DataAnalytic
                                        </Typography>
                                        <Typography variant="h4" align="center" paragraph sx={{ color: 'white', mb: 4, fontSize: { xs: '1.5rem', md: '2rem' } }}>
                                            Transforming Data into Knowledge
                                        </Typography>
                                        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                            <Button
                                                variant="contained"
                                                color="secondary"
                                                size="large"
                                                onClick={() => signIn()}
                                                endIcon={<ArrowForward />}
                                                sx={{
                                                    py: 2,
                                                    px: 4,
                                                    fontSize: '1.2rem',
                                                    fontWeight: 600,
                                                    textTransform: 'none',
                                                }}
                                            >
                                                Get Started
                                            </Button>
                                        </Box>
                                    </Container>
                                </Box>
                            </Box>

                            <Box ref={aboutRef} sx={{ py: 12, bgcolor: 'background.paper' }}>
                                <Container maxWidth="lg">
                                    <Title variant="h2" align="center" gutterBottom>
                                        What is DataAnalytic?
                                    </Title>
                                    <Subtitle variant="h5" align="center" paragraph sx={{ maxWidth: '800px', mx: 'auto', mb: 8 }}>
                                        DataAnalytic is an innovative platform that uses the Dynamic Query Engine as its backend, allowing you to connect your databases intuitively and efficiently. With just a few clicks, you can transfer your information to our AI system for advanced exploration and analysis.
                                    </Subtitle>
                                    <Grid container spacing={4}>
                                        {[
                                            { title: 'Secure Database Connection', icon: <Security fontSize="large" />, description: 'Connect your databases with optimized security for technical professionals.' },
                                            { title: 'AI-Powered Exploration', icon: <Psychology fontSize="large" />, description: 'Transform your data into practical knowledge with predictive analysis.' },
                                            { title: 'Universal Access', icon: <Group fontSize="large" />, description: 'Access advanced analysis tools previously available only to large enterprises.' },
                                            { title: 'Flexibility and Control', icon: <SettingsApplications fontSize="large" />, description: 'Explore your data at your own pace with complete security and control.' },
                                        ].map((feature, index) => (
                                            <Grid item xs={12} md={3} key={index}>
                                                <StyledCard>
                                                    <CardContent>
                                                        <CardIconWrapper>
                                                            <IconButton color="primary" aria-label={feature.title}>
                                                                {feature.icon}
                                                            </IconButton>
                                                        </CardIconWrapper>
                                                        <Typography variant="h6" component="h3" align="center" gutterBottom>
                                                            {feature.title}
                                                        </Typography>
                                                        <Typography variant="body2" align="center">
                                                            {feature.description}
                                                        </Typography>
                                                    </CardContent>
                                                </StyledCard>
                                            </Grid>
                                        ))}
                                    </Grid>
                                </Container>
                            </Box>

                            <Box ref={contactsRef} sx={{ py: 12, bgcolor: 'background.default' }}>
                                <Container maxWidth="lg">
                                    <Typography variant="h2" align="center" gutterBottom sx={{ fontWeight: 700, mb: 6 }}>
                                        Contact Us
                                    </Typography>
                                    <ContactCard>
                                        <Grid container>
                                            <Grid item xs={12} md={5}>
                                                <ContactInfo elevation={0}>
                                                    <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mb: 4 }}>
                                                        Get in Touch
                                                    </Typography>
                                                    <IconWrapper>
                                                        <Email sx={{ mr: 2 }} />
                                                        <Typography variant="body1">support@dataanalytic.ai</Typography>
                                                    </IconWrapper>
                                                    <IconWrapper>
                                                        <Phone sx={{ mr: 2 }} />
                                                        <Typography variant="body1">+1 (800) 123-4567</Typography>
                                                    </IconWrapper>
                                                    <IconWrapper>
                                                        <LocationOn sx={{ mr: 2 }} />
                                                        <Typography variant="body1">1234 Innovation Way, Tech City, CA 94043, USA</Typography>
                                                    </IconWrapper>
                                                </ContactInfo>
                                            </Grid>
                                            <Grid item xs={12} md={7}>
                                                <ContactForm elevation={0}>
                                                    <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mb: 4 }}>
                                                        Send us a Message
                                                    </Typography>
                                                    <form>
                                                        <StyledTextField
                                                            fullWidth
                                                            label="Full Name"
                                                            variant="outlined"
                                                            required
                                                            InputProps={{
                                                                startAdornment: (
                                                                    <InputAdornment position="start">
                                                                        <Person />
                                                                    </InputAdornment>
                                                                ),
                                                            }}
                                                        />
                                                        <StyledTextField
                                                            fullWidth
                                                            label="Email"
                                                            variant="outlined"
                                                            required
                                                            type="email"
                                                            InputProps={{
                                                                startAdornment: (
                                                                    <InputAdornment position="start">
                                                                        <Email />
                                                                    </InputAdornment>
                                                                ),
                                                            }}
                                                        />
                                                        <StyledTextField
                                                            fullWidth
                                                            label="Message"
                                                            variant="outlined"
                                                            required
                                                            multiline
                                                            rows={4}
                                                            InputProps={{
                                                                startAdornment: (
                                                                    <InputAdornment position="start">
                                                                        <Message />
                                                                    </InputAdornment>
                                                                ),
                                                            }}
                                                        />
                                                        <Button
                                                            type="submit"
                                                            variant="contained"
                                                            color="primary"
                                                            fullWidth
                                                            size="large"
                                                            sx={{ py: 1.5, mt: 2 }}
                                                        >
                                                            Send Message
                                                        </Button>
                                                    </form>
                                                </ContactForm>
                                            </Grid>
                                        </Grid>
                                    </ContactCard>
                                </Container>
                            </Box>
                        </>
                    ) : (
                        <Container sx={{ mt: 10 }}>
                            <Typography variant="h4" component="h1" gutterBottom>
                                Grid Page
                            </Typography>
                            {!isConnected ? (
                                <DatabaseConnectionForm onConnectionSuccess={handleConnectionSuccess} />
                            ) : (
                                <>
                                    <Typography variant="h6" gutterBottom sx={{ color: 'success.main' }}>
                                        Successfully connected to the Intelligent data insight tool for your business
                                    </Typography>
                                    <DynamicTables />
                                </>
                            )}
                        </Container>
                    )}
                </Box>

                <Box component="footer" sx={{ bgcolor: theme.palette.primary.main, color: 'white', py: 6 }}>
                    <Container maxWidth="lg">
                        <Grid container spacing={4}>
                            <Grid item xs={12} md={4}>
                                <Typography variant="h6" gutterBottom sx={{ fontWeight: 700 }}>
                                    DataAnalytic
                                </Typography>
                                <Typography variant="body2">
                                    Transforming Data into Knowledge
                                </Typography>
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                                    Quick Links
                                </Typography>
                                <Link component="button" onClick={() => scrollToSection('home')} color="inherit" sx={{ display: 'block', mb: 1 }}>Home</Link>
                                <Link component="button" onClick={() => scrollToSection('about')} color="inherit" sx={{ display: 'block', mb: 1 }}>About Us</Link>
                                <Link component="button" onClick={() => scrollToSection('contact')} color="inherit" sx={{ display: 'block', mb: 1 }}>Contact Us</Link>
                                <Link href="/privacy" color="inherit" sx={{ display: 'block' }}>Privacy Policy</Link>
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                                    Connect With Us
                                </Typography>
                                <Typography variant="body2">
                                    Email: info@dataanalytic.ai<br />
                                    Phone: +1 (800) 123-4567<br />
                                    Address: 1234 Innovation Way, Tech City, CA 94043, USA
                                </Typography>
                            </Grid>
                        </Grid>
                        <Typography variant="body2" align="center" sx={{ mt: 4 }}>
                            © {new Date().getFullYear()} DataAnalytic. All rights reserved.
                        </Typography>
                    </Container>
                </Box>
            </Box>
        </ThemeProvider>
    )
}