import React from 'react'
import {
    Button,
    Typography,
    Box,
    Paper,
    Grid,
    Chip,
    styled,
    useTheme,
    useMediaQuery,
} from '@mui/material'
import StorageIcon from '@mui/icons-material/Storage'
import LanguageIcon from '@mui/icons-material/Language'
import NumbersIcon from '@mui/icons-material/Numbers'
import DatabaseIcon from '@mui/icons-material/Storage'
import PersonIcon from '@mui/icons-material/Person'
import { motion } from 'framer-motion'

const StyledPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(3),
    marginBottom: theme.spacing(3),
    borderRadius: theme.shape.borderRadius * 2,
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
}))

const InfoItem = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing(2),
}))

const InfoLabel = styled(Typography)(({ theme }) => ({
    fontWeight: 'bold',
    marginRight: theme.spacing(1),
    minWidth: '80px',
}))

const InfoValue = styled(Typography)({
    flex: 1,
})

const IconWrapper = styled(Box)(({ theme }) => ({
    marginRight: theme.spacing(1),
    color: theme.palette.primary.main,
}))

const LoaderContainer = styled(Box)({
    display: 'flex',
    justifyContent: 'center',
    marginTop: '16px',
})

const Loader = styled('div')(({ theme }) => ({
    width: '60%',
    height: '10px',
    borderRadius: '2px',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    position: 'relative',
    overflow: 'hidden',

    '&::before': {
        content: '""',
        position: 'absolute',
        backgroundColor: theme.palette.success.main,
        width: '0%',
        height: '100%',
        borderRadius: '2px',
        animation: 'load 3.5s ease-in-out infinite',
        boxShadow: `${theme.palette.success.main} 0px 2px 29px 0px`,
    },

    '@keyframes load': {
        '50%': {
            width: '100%',
        },
        '100%': {
            right: 0,
            left: 'unset',
        },
    },
}))

interface DatabaseConfig {
    databaseType: string
    host: string
    port: number
    databaseName: string
    userName: string
    [key: string]: string | number
}

interface ReviewFormProps {
    sourceConfig: DatabaseConfig
    destConfig: DatabaseConfig
    onSubmit: () => void
    loading: boolean
}

export const ReviewForm: React.FC<ReviewFormProps> = ({
                                                          sourceConfig,
                                                          destConfig,
                                                          onSubmit,
                                                          loading,
                                                      }) => {
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

    const renderDatabaseInfo = (config: DatabaseConfig, title: string) => (
        <StyledPaper elevation={3}>
            <Typography variant="h6" gutterBottom color="primary">
                {title}
            </Typography>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <InfoItem>
                        <IconWrapper>
                            <StorageIcon fontSize="small" />
                        </IconWrapper>
                        <InfoLabel>Type:</InfoLabel>
                        <InfoValue>
                            <Chip
                                label={config.databaseType}
                                size="small"
                                color="primary"
                                variant="outlined"
                            />
                        </InfoValue>
                    </InfoItem>
                    <InfoItem>
                        <IconWrapper>
                            <LanguageIcon fontSize="small" />
                        </IconWrapper>
                        <InfoLabel>Host:</InfoLabel>
                        <InfoValue>{config.host}</InfoValue>
                    </InfoItem>
                    <InfoItem>
                        <IconWrapper>
                            <NumbersIcon fontSize="small" />
                        </IconWrapper>
                        <InfoLabel>Port:</InfoLabel>
                        <InfoValue>{config.port}</InfoValue>
                    </InfoItem>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <InfoItem>
                        <IconWrapper>
                            <DatabaseIcon fontSize="small" />
                        </IconWrapper>
                        <InfoLabel>Database:</InfoLabel>
                        <InfoValue>{config.databaseName || 'N/A'}</InfoValue>
                    </InfoItem>
                    <InfoItem>
                        <IconWrapper>
                            <PersonIcon fontSize="small" />
                        </IconWrapper>
                        <InfoLabel>User:</InfoLabel>
                        <InfoValue>{config.userName}</InfoValue>
                    </InfoItem>
                </Grid>
            </Grid>
        </StyledPaper>
    )

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <Box>
                {renderDatabaseInfo(sourceConfig, 'Source Database')}
                {renderDatabaseInfo(destConfig, 'Destination Database')}

                <Box sx={{ mt: 3 }}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={onSubmit}
                        disabled={loading}
                        fullWidth
                        sx={{
                            py: isMobile ? 1 : 1.5,
                            fontSize: isMobile ? '1rem' : '1.1rem',
                            borderRadius: theme.shape.borderRadius * 2,
                        }}
                    >
                        {loading ? 'Transferring...' : 'Start Transfer'}
                    </Button>
                </Box>

                {loading && (
                    <LoaderContainer>
                        <Loader />
                    </LoaderContainer>
                )}
            </Box>
        </motion.div>
    )
}

export default ReviewForm