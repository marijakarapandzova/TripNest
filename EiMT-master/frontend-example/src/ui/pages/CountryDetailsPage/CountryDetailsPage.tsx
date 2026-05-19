import { alpha, Box, Breadcrumbs, Button, Chip, CircularProgress, Stack, Typography, Alert } from '@mui/material';
import useCountryDetails from '../../../hooks/country/useCountryDetails';
import { Link, useNavigate, useParams } from 'react-router';
import { ArrowBack, Public } from '@mui/icons-material';
import Surface from '../../components/layout/Surface/Surface';

const CountryDetailsPage = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const { countryDetails, loading, error } = useCountryDetails(id);

    if (loading) {
        return (
            <Surface sx={{ display: 'grid', placeItems: 'center', minHeight: 280 }}>
                <CircularProgress />
            </Surface>
        );
    }

    if (error) {
        return (
            <Box sx={{ py: 2 }}>
                <Alert severity='error' role='alert'>{error.message}</Alert>
            </Box>
        );
    }

    if (!countryDetails) {
        return (
            <Box sx={{ py: 2 }}>
                <Alert severity='warning'>Country not found.</Alert>
            </Box>
        );
    }

    return (
        <Stack spacing={{ xs: 2.5, md: 3 }}>
            <Breadcrumbs aria-label='breadcrumb'>
                <Link to='/countries' style={{ textDecoration: 'none', color: 'inherit' }}
                    onMouseEnter={e => (e.currentTarget.style.textDecoration = 'underline')}
                    onMouseLeave={e => (e.currentTarget.style.textDecoration = 'none')}
                >
                    Countries
                </Link>
                <Typography color='text.primary'>{countryDetails.name}</Typography>
            </Breadcrumbs>

            <Surface
                sx={{
                    p: { xs: 2.75, md: 4 },
                    '&::before': {
                        content: '""',
                        position: 'absolute',
                        inset: 0,
                        background: (t) =>
                            `linear-gradient(90deg, ${alpha(t.palette.primary.main, 0.10)} 0%, transparent 22%),
                             radial-gradient(circle at 82% 20%, ${alpha(t.palette.secondary.main, 0.18)} 0%, transparent 52%)`,
                        pointerEvents: 'none',
                    },
                }}
            >
                <Stack spacing={2.25} sx={{ position: 'relative', zIndex: 1 }}>
                    <Box>
                        <Typography variant='h3' gutterBottom sx={{ fontWeight: 800, letterSpacing: '-0.04em' }}>
                            {countryDetails.name}
                        </Typography>

                        <Stack direction='row' spacing={1} useFlexGap sx={{ flexWrap: 'wrap' }}>
                            <Chip
                                icon={<Public />}
                                label={countryDetails.continent}
                                color='primary'
                                variant='outlined'
                                sx={{ px: 0.5, fontWeight: 600 }}
                            />
                        </Stack>
                    </Box>

                    <Stack
                        direction={{ xs: 'column', sm: 'row' }}
                        spacing={1.5}
                        sx={{ alignItems: { sm: 'center' } }}
                    >
                        <Button variant='outlined' startIcon={<ArrowBack />} onClick={() => navigate('/countries')} sx={{ borderWidth: 2, borderRadius: 2 }}>
                            All countries
                        </Button>
                        <Button variant='text' onClick={() => navigate('/accommodations')} sx={{ fontWeight: 700 }}>
                            Browse stays
                        </Button>
                    </Stack>
                </Stack>
            </Surface>
        </Stack>
    );
};

export default CountryDetailsPage;
