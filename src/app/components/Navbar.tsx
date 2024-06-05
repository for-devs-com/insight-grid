"use client";

import React from 'react';
import {AppBar, Toolbar, Typography, Button, Avatar, Link} from '@mui/material';
import {useSession, signIn, signOut} from 'next-auth/react';

const Navbar: React.FC = () => {
    const {data: session} = useSession();

    return (
        <div>
            <AppBar position="static" sx={{width: '100%'}}>
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        <Link href="/" color="inherit" underline="none">
                            for-devs.com
                        </Link>
                    </Typography>
                    <Link href="/app/dashboard" color="inherit" underline="none" sx={{marginRight: 2}}>
                        Dashboard
                    </Link>
                    {session?.user ? (
                        <div style={{display: 'flex', alignItems: 'center'}}>
                            <Avatar alt={session.user.name || session.user.email || 'User'}
                                    src={session.user.image || undefined} sx={{marginRight: 2}}/>
                            <Typography variant="body1" sx={{marginRight: 2}}>
                                {session.user.name || session.user.email}
                            </Typography>
                            <Button color="inherit" onClick={() => signOut()}>
                                Logout
                            </Button>
                        </div>
                    ) : (
                        <Button color="inherit" onClick={() => signIn()}>
                            Sign In
                        </Button>
                    )}
                </Toolbar>
            </AppBar>
        </div>
    );
};

export default Navbar;
