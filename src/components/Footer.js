// components/Footer.js
import { Container, Typography, Box, Grid, Link } from '@mui/material';

const Footer = () => {
    return (
        <Box component="footer" sx={{ bgcolor: '#061a23', color: 'white', py: 8 }}>
            <Container maxWidth="lg">
                <Grid container spacing={4}>
                    <Grid item xs={12} md={4}>
                        <Typography variant="h6" component="div" gutterBottom>
                            Insight Grids
                        </Typography>
                        <Typography variant="body2">Your Gateway to Seamless Data Integration and Enhanced Decision-Making</Typography>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Typography variant="h6" component="div" gutterBottom>
                            Contact
                        </Typography>
                        <Typography variant="body2">Email: support@InsightGrid.com</Typography>
                        <Typography variant="body2">Phone: +12345678</Typography>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Typography variant="h6" component="div" gutterBottom>
                            Follow Us
                        </Typography>
                        <Box display="flex" justifyContent="space-between" maxWidth={200}>
                            <Link href="#" color="inherit" underline="hover">
                                Facebook
                            </Link>
                            <Link href="#" color="inherit" underline="hover">
                                Twitter
                            </Link>
                            <Link href="#" color="inherit" underline="hover">
                                Instagram
                            </Link>
                        </Box>
                    </Grid>
                </Grid>
                <Box textAlign="center" mt={6}>
                    <Typography variant="body2">&copy; 2024 Insight <Grid></Grid>. All rights reserved.</Typography>
                </Box>
            </Container>
        </Box>
    );
};

export default Footer;
