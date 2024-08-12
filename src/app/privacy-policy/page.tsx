'use client';

import React from 'react';
import { Container, Typography, Box } from '@mui/material';

const PrivacyPolicy = () => {
    return (
        <Container maxWidth="md" sx={{ marginTop: 4 }}>
            <Box sx={{ padding: 2, backgroundColor: '#f5f5f5', borderRadius: 1 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Privacy Policy
                </Typography>
                <Typography variant="body1" paragraph>
                    This is the privacy policy for our website. We are committed to protecting your privacy and
                    ensuring that your personal information is handled in a safe and responsible manner.
                </Typography>
                <Typography variant="body1" paragraph>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ut mauris sit amet libero
                    pretium feugiat. Sed ultricies, libero a pharetra ultricies, enim felis mollis sapien, a
                    tincidunt lectus felis sit amet ex. Vivamus egestas velit eget magna suscipit, et aliquam
                    lectus accumsan. Duis sit amet nunc nec massa ornare vehicula.
                </Typography>
                <Typography variant="body1" paragraph>
                    For more information, please feel free to contact us.
                </Typography>
            </Box>
        </Container>
    );
};

export default PrivacyPolicy;
