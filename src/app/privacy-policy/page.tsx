'use client'

import React from 'react'
import {
    Container,
    Typography,
    Box,
    Paper,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Divider,
    Button,
    ThemeProvider,
    createTheme,
    CssBaseline,
} from '@mui/material'
import {
    Security,
    Info,
    Cookie,
    Link as LinkIcon,
    VerifiedUser,
    ArrowBack,
} from '@mui/icons-material'
import Navbar from '@/components/Navbar'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const PrivacyPolicy = () => {
    const router = useRouter()

    const theme = createTheme({
        palette: {
            mode: 'light',
            primary: {
                main: '#0f2b46',
            },
            secondary: {
                main: '#f50057',
            },
            background: {
                default: '#ffffff',
                paper: '#ffffff',
            },
            text: {
                primary: '#0f2b46',
                secondary: '#0f2b46',
            },
        },
        typography: {
            fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
            h1: {
                fontWeight: 700,
                color: '#0f2b46',
            },
            h2: {
                fontWeight: 600,
                color: '#0f2b46',
            },
            body1: {
                color: '#0f2b46',
            },
            body2: {
                color: '#0f2b46',
            },
        },
    })

    const sections = [
        {
            title: 'Information Collected',
            icon: <Info />,
            content: 'Our website may collect personal information such as your name, contact information, email address, and demographic information. Additional information may be required for order processing, delivery, or billing.',
        },
        {
            title: 'Use of Information',
            icon: <VerifiedUser />,
            content: 'We use the collected information to provide and improve our services, maintain user records, process orders, and send relevant promotional emails. You can opt out of promotional communications at any time.',
        },
        {
            title: 'Cookies',
            icon: <Cookie />,
            content: 'We use cookies to enhance your browsing experience, analyze site traffic, and personalize content. You can control cookie settings through your browser preferences.',
        },
        {
            title: 'Third-Party Links',
            icon: <LinkIcon />,
            content: 'Our website may contain links to third-party sites. We are not responsible for the privacy practices of these external sites and encourage you to review their policies.',
        },
        {
            title: 'Data Security',
            icon: <Security />,
            content: 'We implement robust security measures to protect your personal information. However, no method of internet transmission is 100% secure, and we cannot guarantee absolute security.',
        },
    ]

    const handleNavigation = (section: string) => {
        router.push(`/?section=${section}`)
    }

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: 'background.default' }}>
                <Navbar />
                <Container component="main" maxWidth="md" sx={{ mt: 12, mb: 8 }}>
                    <Button
                        startIcon={<ArrowBack />}
                        onClick={() => handleNavigation('home')}
                        sx={{ mb: 2, color: 'primary.main' }}
                    >
                        Back to Home
                    </Button>
                    <Paper elevation={3} sx={{ p: 4, borderRadius: 2, bgcolor: 'background.paper' }}>
                        <Typography variant="h3" component="h1" gutterBottom sx={{ color: 'primary.main', fontWeight: 700 }}>
                            Privacy Policy
                        </Typography>
                        <Typography variant="body1" paragraph>
                            DataAnalytic is committed to protecting your privacy and ensuring the security of your personal information. This policy outlines how we collect, use, and safeguard your data when you use our website and services.
                        </Typography>
                        <List>
                            {sections.map((section, index) => (
                                <React.Fragment key={index}>
                                    <ListItem alignItems="flex-start" sx={{ py: 3 }}>
                                        <ListItemIcon sx={{ mt: 1, color: 'primary.main' }}>{section.icon}</ListItemIcon>
                                        <ListItemText
                                            primary={
                                                <Typography variant="h6" component="h2" sx={{ color: 'primary.main', mb: 1 }}>
                                                    {section.title}
                                                </Typography>
                                            }
                                            secondary={
                                                <Typography variant="body2" color="text.secondary">
                                                    {section.content}
                                                </Typography>
                                            }
                                        />
                                    </ListItem>
                                    {index < sections.length - 1 && <Divider variant="inset" component="li" />}
                                </React.Fragment>
                            ))}
                        </List>
                        <Typography variant="body2" sx={{ mt: 4, fontStyle: 'italic' }}>
                            DataAnalytic reserves the right to update this Privacy Policy. We encourage you to review this page periodically for any changes.
                        </Typography>
                        <Box sx={{ mt: 4 }}>
                            <Typography variant="body1">
                                If you have any questions about this Privacy Policy, please{' '}
                                <Link href="#" onClick={() => handleNavigation('contact')} style={{ color: theme.palette.primary.main }}>
                                    contact us
                                </Link>
                                .
                            </Typography>
                        </Box>
                    </Paper>
                </Container>
                <Box component="footer" sx={{ py: 3, px: 2, mt: 'auto', bgcolor: 'primary.main' }}>
                    <Container maxWidth="sm">
                        <Typography variant="body2" align="center" color="white">
                            © {new Date().getFullYear()} DataAnalytic. All rights reserved.
                        </Typography>
                    </Container>
                </Box>
            </Box>
        </ThemeProvider>
    )
}

export default PrivacyPolicy