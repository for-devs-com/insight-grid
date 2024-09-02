'use client'

import React, { useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'
import { useSession, signIn, signOut } from 'next-auth/react'
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    Avatar,
    IconButton,
    Drawer,
    List,
    ListItem,
    ListItemText,
    useMediaQuery,
    Box,
    Container,
    ThemeProvider,
    createTheme,
    CssBaseline,
} from '@mui/material'
import { Menu as MenuIcon } from '@mui/icons-material'

interface NavbarProps {
    navigateToSection: (section: string) => void
}

export default function Navbar({ navigateToSection }: NavbarProps) {
    const [drawerOpen, setDrawerOpen] = useState(false)
    const { data: session } = useSession()
    const router = useRouter()
    const pathname = usePathname()

    const theme = createTheme({
        palette: {
            mode: 'dark',
            primary: {
                main: '#0f2b46',
            },
            background: {
                default: '#0f2b46',
                paper: '#1a3a5a',
            },
            text: {
                primary: '#ffffff',
                secondary: '#b0bec5',
            },
        },
        components: {
            MuiAppBar: {
                styleOverrides: {
                    root: {
                        backgroundColor: '#0f2b46',
                        color: '#ffffff',
                    },
                },
            },
            MuiButton: {
                styleOverrides: {
                    root: {
                        color: '#ffffff',
                        '&:hover': {
                            backgroundColor: 'rgba(255, 255, 255, 0.08)',
                        },
                    },
                    outlined: {
                        borderColor: '#ffffff',
                        '&:hover': {
                            borderColor: '#b0bec5',
                            backgroundColor: 'rgba(255, 255, 255, 0.08)',
                        },
                    },
                },
            },
        },
    })

    const isMobile = useMediaQuery(theme.breakpoints.down('md'))

    const handleNavigation = (section: string) => {
        if (pathname === '/') {
            navigateToSection(section)
        } else {
            router.push(`/?section=${section}`)
        }
        if (isMobile) {
            setDrawerOpen(false)
        }
    }

    const toggleDrawer = (open: boolean) => () => {
        setDrawerOpen(open)
    }

    const menuItems = [
        { label: 'Home', section: 'home' },
        { label: 'About Us', section: 'about' },
        { label: 'Contact Us', section: 'contact' },
        { label: 'Privacy Policy', path: '/privacy-policy' },
    ]

    const NavItems = () => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {menuItems.map((item, index) => (
                <Button
                    key={index}
                    color="inherit"
                    onClick={() => item.path ? router.push(item.path) : handleNavigation(item.section)}
                    sx={{ mx: 1 }}
                >
                    {item.label}
                </Button>
            ))}
            {session?.user ? (
                <Box sx={{ display: 'flex', alignItems: 'center', ml: 2 }}>
                    <Avatar
                        alt={session.user.name || session.user.email || 'User'}
                        src={session.user.image || undefined}
                        sx={{ mr: 2 }}
                    />
                    <Typography variant="body2" sx={{ mr: 2 }}>
                        {session.user.name || session.user.email}
                    </Typography>
                    <Button color="inherit" onClick={() => signOut()} variant="outlined" size="small">
                        Logout
                    </Button>
                </Box>
            ) : (
                <Button color="inherit" onClick={() => signIn()} variant="outlined" sx={{ ml: 2 }}>
                    Sign In
                </Button>
            )}
        </Box>
    )

    const DrawerContent = () => (
        <List>
            {menuItems.map((item, index) => (
                <ListItem
                    button
                    key={index}
                    onClick={() => item.path ? router.push(item.path) : handleNavigation(item.section)}
                >
                    <ListItemText primary={item.label} />
                </ListItem>
            ))}
            {session?.user ? (
                <>
                    <ListItem>
                        <Avatar
                            alt={session.user.name || session.user.email || 'User'}
                            src={session.user.image || undefined}
                            sx={{ mr: 2 }}
                        />
                        <ListItemText primary={session.user.name || session.user.email} />
                    </ListItem>
                    <ListItem button onClick={() => signOut()}>
                        <ListItemText primary="Logout" />
                    </ListItem>
                </>
            ) : (
                <ListItem button onClick={() => signIn()}>
                    <ListItemText primary="Sign In" />
                </ListItem>
            )}
        </List>
    )

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <AppBar position="fixed" elevation={1}>
                <Container maxWidth="lg">
                    <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
                        <Typography
                            variant="h6"
                            component={Link}
                            href="/"
                            sx={{
                                color: 'text.primary',
                                textDecoration: 'none',
                                fontWeight: 700,
                                letterSpacing: 1,
                            }}
                        >
                            DataAnalytic
                        </Typography>
                        {isMobile ? (
                            <IconButton
                                edge="end"
                                color="inherit"
                                aria-label="open menu"
                                onClick={toggleDrawer(true)}
                            >
                                <MenuIcon />
                            </IconButton>
                        ) : (
                            <NavItems />
                        )}
                    </Toolbar>
                </Container>
            </AppBar>
            <Drawer
                anchor="right"
                open={drawerOpen}
                onClose={toggleDrawer(false)}
            >
                <Box
                    sx={{ width: 250 }}
                    role="presentation"
                    onClick={toggleDrawer(false)}
                    onKeyDown={toggleDrawer(false)}
                >
                    <DrawerContent />
                </Box>
            </Drawer>
        </ThemeProvider>
    )
}