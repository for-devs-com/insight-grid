import React from 'react';
import { Box, Typography } from '@mui/material';

const PrivacyPolicy = () => {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '100vh',
                padding: 4,
                backgroundColor: '#FFFFFF',
            }}
        >
            <Typography variant="h1" component="h1" gutterBottom sx={{ fontSize: { xs: '2rem', sm: '3rem', md: '4rem' } }}>
                Privacy Policy
            </Typography>
            <Typography variant="body1" gutterBottom sx={{ fontSize: { xs: '1rem', sm: '1.25rem', md: '1.5rem' } }}>
                Aquí puedes agregar el contenido de tu política de privacidad. Asegúrate de incluir toda la información relevante sobre cómo manejas los datos de los usuarios, las políticas de recolección de datos, y cualquier otra información pertinente.
            </Typography>
            {/* Agrega más contenido de la política de privacidad aquí */}
        </Box>
    );
};

export default PrivacyPolicy;
