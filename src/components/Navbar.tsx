"use client";

import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Avatar, Link, IconButton, Drawer, List, ListItem, ListItemText, useMediaQuery, useTheme, Menu, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useSession, signIn, signOut } from 'next-auth/react';

const Navbar: React.FC = () => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const { data: session } = useSession();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const scrollToSection = (sectionId: string) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const toggleDrawer = (open: boolean) => () => {
        setDrawerOpen(open);
    };

    const drawer = (
        <div>
            <List>


                <ListItem button onClick={() => scrollToSection('contact')}>
                    <ListItemText primary="Contact Us" />
                </ListItem>
                <ListItem button onClick={() => scrollToSection('about')}>
                    <ListItemText primary="About Us" />
                </ListItem>
                <ListItem button onClick={() => scrollToSection('privacy')}>
                    <ListItemText primary="Privacy Policy" />
                </ListItem>
                {session?.user ? (
                    <>
                        <ListItem>
                            <Avatar
                                alt={session.user.name || session.user.email || 'User'}
                                src={session.user.image || undefined}
                                sx={{ marginRight: 2 }}
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
        </div>
    );

    return (
        <div>
            <AppBar position="static" sx={{ width: '100%', backgroundColor: '#061a23' }}>
                <Toolbar>
                    {isMobile && (
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            onClick={toggleDrawer(true)}
                            sx={{ mr: 2 }}
                        >
                            <MenuIcon />
                        </IconButton>
                    )}
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        <Link href="/" color="inherit" underline="none">
                            for-devs.com
                        </Link>
                    </Typography>
                    {!isMobile && (
                        <>
                            <Button
                                color="inherit"
                                onClick={handleMenuClick}
                                sx={{ marginRight: 2, backgroundColor: 'transparent', color: 'inherit' }}
                            >
                                Menu
                            </Button>
                            <Menu
                                anchorEl={anchorEl}
                                open={Boolean(anchorEl)}
                                onClose={handleMenuClose}
                            >
                                
                                <MenuItem onClick={() => scrollToSection('contact')}>Contact Us</MenuItem>
                                <MenuItem onClick={() => scrollToSection('about')}>About Us</MenuItem>
                                <MenuItem onClick={() => scrollToSection('privacy')}>Privacy Policy</MenuItem>
                            </Menu>
                            {session?.user ? (
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <Avatar
                                        alt={session.user.name || session.user.email || 'User'}
                                        src={session.user.image || undefined}
                                        sx={{ marginRight: 2 }}
                                    />
                                    <Typography variant="body1" sx={{ marginRight: 2 }}>
                                        {session.user.name || session.user.email}
                                    </Typography>
                                    <Button color="inherit" onClick={() => signOut()}>
                                        Logout
                                    </Button>
                                </div>
                            ) : (
                                <Button
                                    color="inherit"
                                    onClick={() => signIn()}
                                    sx={{ backgroundColor: 'transparent', color: 'inherit' }}
                                >
                                    Sign In
                                </Button>
                            )}
                        </>
                    )}
                </Toolbar>
            </AppBar>
            <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
                {drawer}
            </Drawer>
        </div>
    );
};

export default Navbar;
