import { alpha, Alert, Avatar, Box, Breadcrumbs, Button, Chip, CircularProgress, Divider, Grid, Paper, Stack, Typography } from '@mui/material';
import useAccommodationDetails from '../../../hooks/accommodation/useAccommodationDetails';
import useHostDetails from '../../../hooks/host/useHostDetails';
import useCountryDetails from '../../../hooks/country/useCountryDetails';
import { useNavigate, useParams, Link } from 'react-router';
import { ArrowBack, Category, PersonRounded, Public } from '@mui/icons-material';

const AccommodationDetailsPage = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const { accommodationDetails, loading, error } = useAccommodationDetails(id);
    const { hostDetails, loading: hostLoading, error: hostError } = useHostDetails(
        accommodationDetails ? String(accommodationDetails.host_id) : undefined,
    );
    const { countryDetails } = useCountryDetails(
        hostDetails ? String(hostDetails.country_id) : undefined,
    );

    if (loading) {
        return (
            <Box sx={{ display: 'grid', placeItems: 'center', minHeight: 280 }}>
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Box sx={{ py: 2 }}>
                <Alert severity='error' role='alert'>{error.message}</Alert>
            </Box>
        );
    }

    if (!accommodationDetails) {
        return (
            <Box sx={{ py: 2 }}>
                <Alert severity='warning'>Accommodation not found.</Alert>
            </Box>
        );
    }

    return (
        <Stack spacing={{ xs: 2.5, md: 3 }}>
            <Breadcrumbs aria-label='breadcrumb'>
                <Link to='/accommodations' style={{ textDecoration: 'none', color: 'inherit' }}
                    onMouseEnter={e => (e.currentTarget.style.textDecoration = 'underline')}
                    onMouseLeave={e => (e.currentTarget.style.textDecoration = 'none')}
                >
                    Accommodations
                </Link>
                <Typography color='text.primary'>{accommodationDetails.name}</Typography>
            </Breadcrumbs>

            <Paper
                elevation={0}
                sx={{
                    p: { xs: 2.5, md: 3.5 },
                    borderRadius: 4,
                    border: 1,
                    borderColor: 'divider',
                    overflow: 'hidden',
                    position: 'relative',
                    '&::before': {
                        content: '""',
                        position: 'absolute',
                        inset: 0,
                        background: (t) =>
                            `radial-gradient(circle at 15% 10%, ${alpha(t.palette.primary.main, 0.18)} 0%, transparent 45%),
                             radial-gradient(circle at 85% 30%, ${alpha(t.palette.secondary.main, 0.14)} 0%, transparent 50%)`,
                        pointerEvents: 'none',
                    },
                }}
            >
                <Grid container spacing={{ xs: 2.5, md: 3 }} sx={{ position: 'relative', zIndex: 1 }}>
                    <Grid size={{ xs: 12, md: 4 }}>
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                bgcolor: (t) => alpha(t.palette.primary.main, 0.08),
                                p: { xs: 2.5, md: 3 },
                                borderRadius: 3,
                                border: 1,
                                borderColor: 'divider',
                            }}
                        >
                            <Avatar
                                src='/assets/hero.png'
                                variant='rounded'
                                sx={{ width: '100%', height: 'auto', objectFit: 'contain' }}
                            />
                        </Box>
                    </Grid>

                    <Grid size={{ xs: 12, md: 8 }}>
                        <Stack spacing={2}>
                            <Box>
                                <Typography variant='h3' gutterBottom sx={{ fontWeight: 700, letterSpacing: '-0.04em' }}>
                                    {accommodationDetails.name}
                                </Typography>

                                <Typography variant='subtitle1' sx={{ color: 'text.secondary' }}>
                                    {accommodationDetails.numRooms} room(s) available
                                </Typography>
                            </Box>

                            <Stack direction='row' spacing={1} useFlexGap sx={{ flexWrap: 'wrap' }}>
                                <Chip
                                    label={accommodationDetails.rented ? 'Booked' : 'Available'}
                                    color={accommodationDetails.rented ? 'default' : 'success'}
                                    sx={{ fontWeight: 600 }}
                                />
                                <Chip
                                    label={`${accommodationDetails.condition} condition`}
                                    color='info'
                                    variant='outlined'
                                />
                                <Chip
                                    icon={<Category />}
                                    label={accommodationDetails.category}
                                    color='primary'
                                    variant='outlined'
                                    sx={{ px: 0.5 }}
                                />
                            </Stack>

                            <Divider sx={{ borderColor: (t) => alpha(t.palette.divider, 0.85) }} />

                            <Stack spacing={1.25}>
                                <Typography variant='subtitle2' color='text.secondary' sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
                                    <PersonRounded fontSize='small' aria-hidden />
                                    Host
                                </Typography>
                                <Stack
                                    direction='row'
                                    spacing={1}
                                    useFlexGap
                                    sx={{ flexWrap: 'wrap', alignItems: 'center' }}
                                >
                                    {hostLoading && <CircularProgress size={22} aria-label='Loading host' />}
                                    {hostError && (
                                        <Typography variant='body2' color='error'>
                                            Could not load host details.
                                        </Typography>
                                    )}
                                    <Button
                                        component={Link}
                                        to={`/hosts/${accommodationDetails.host_id}`}
                                        variant='outlined'
                                        size='medium'
                                        sx={{ textTransform: 'none', fontWeight: 700, borderRadius: 2 }}
                                    >
                                        {hostDetails
                                            ? `${hostDetails.name} ${hostDetails.surname}`.trim()
                                            : 'View host profile'}
                                    </Button>
                                    {hostDetails && (
                                        <Button
                                            component={Link}
                                            to={`/countries/${hostDetails.country_id}`}
                                            variant='text'
                                            size='medium'
                                            startIcon={<Public fontSize='small' />}
                                            sx={{ textTransform: 'none', fontWeight: 700 }}
                                        >
                                            {countryDetails ? countryDetails.name : 'Country'}
                                        </Button>
                                    )}
                                </Stack>
                            </Stack>
                        </Stack>
                    </Grid>
                </Grid>
            </Paper>

            <Box>
                <Button
                    variant='outlined'
                    startIcon={<ArrowBack />}
                    onClick={() => navigate('/accommodations')}
                    sx={{ borderWidth: 2, borderRadius: 2, px: 2.25 }}
                >
                    Back to Accommodations
                </Button>
            </Box>
        </Stack>
    )
}

export default AccommodationDetailsPage;