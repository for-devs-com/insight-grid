'use client'

import React from 'react'
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

const theme = createTheme({
    palette: {
        mode: 'dark',
        primary: { main: '#0f2b46' },
        background: { default: '#0f2b46', paper: '#1a3a5a' },
        text: { primary: '#ffffff', secondary: '#b0bec5' },
    },
    components: {
        MuiAppBar: {
            styleOverrides: {
                root: { backgroundColor: '#0f2b46', color: '#ffffff' },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    color: '#ffffff',
                    '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.08)' },
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

const menuItems = [
    { label: 'Home', section: 'home' },
    { label: 'About Us', section: 'about' },
    { label: 'Contact Us', section: 'contact' },
    { label: 'Privacy Policy', path: '/privacy-policy' },
]

const NavItem = ({ item, onClick }) => (
    <Button color="inherit" onClick={() => onClick(item.section, item.path)} sx={{ mx: 1 }}>
        {item.label}
    </Button>
)

const AuthButton = ({ session, onSignIn, onSignOut }) => (
    session?.user ? (
        <Box sx={{ display: 'flex', alignItems: 'center', ml: 2 }}>
            <Avatar alt={session.user.name || 'User'} src={session.user.image} sx={{ mr: 2 }} />
            <Typography variant="body2" sx={{ mr: 2 }}>{session.user.name || session.user.email}</Typography>
            <Button color="inherit" onClick={onSignOut} variant="outlined" size="small">Logout</Button>
        </Box>
    ) : (
        <Button color="inherit" onClick={onSignIn} variant="outlined" sx={{ ml: 2 }}>Sign In</Button>
    )
)

const DrawerContent = ({ items, session, onItemClick, onSignIn, onSignOut }) => (
    <List>
        {items.map((item, index) => (
            <ListItem button key={index} onClick={() => onItemClick(item.section, item.path)}>
                <ListItemText primary={item.label} />
            </ListItem>
        ))}
        {session?.user ? (
            <>
                <ListItem>
                    <Avatar alt={session.user.name || 'User'} src={session.user.image} sx={{ mr: 2 }} />
                    <ListItemText primary={session.user.name || session.user.email} />
                </ListItem>
                <ListItem button onClick={onSignOut}>
                    <ListItemText primary="Logout" />
                </ListItem>
            </>
        ) : (
            <ListItem button onClick={onSignIn}>
                <ListItemText primary="Sign In" />
            </ListItem>
        )}
    </List>
)

export default function Navbar({ navigateToSection }) {
    const [drawerOpen, setDrawerOpen] = React.useState(false)
    const { data: session } = useSession()
    const router = useRouter()
    const pathname = usePathname()
    const isMobile = useMediaQuery(theme.breakpoints.down('md'))

    const handleNavigation = (section, path) => {
        path ? router.push(path) : pathname === '/' ? navigateToSection(section) : router.push(`/?section=${section}`)
        setDrawerOpen(false)
    }

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <AppBar position="fixed" elevation={1}>
                <Container maxWidth="lg">
                    <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
                        <Typography variant="h6" component={Link} href="/" sx={{ color: 'text.primary', textDecoration: 'none', fontWeight: 700, letterSpacing: 1 }}>
                            DataAnalytic
                        </Typography>
                        {isMobile ? (
                            <IconButton edge="end" color="inherit" aria-label="open menu" onClick={() => setDrawerOpen(true)}>
                                <MenuIcon />
                            </IconButton>
                        ) : (
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                {menuItems.map((item, index) => (
                                    <NavItem key={index} item={item} onClick={handleNavigation} />
                                ))}
                                <AuthButton session={session} onSignIn={signIn} onSignOut={signOut} />
                            </Box>
                        )}
                    </Toolbar>
                </Container>
            </AppBar>
            <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
                <Box sx={{ width: 250 }} role="presentation" onClick={() => setDrawerOpen(false)} onKeyDown={() => setDrawerOpen(false)}>
                    <DrawerContent items={menuItems} session={session} onItemClick={handleNavigation} onSignIn={signIn} onSignOut={signOut} />
                </Box>
            </Drawer>
        </ThemeProvider>
    )
}