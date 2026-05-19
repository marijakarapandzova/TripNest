// import { alpha, Avatar, Box, Breadcrumbs, Button, Chip, CircularProgress, Divider, Grid, Stack, Typography, Alert } from '@mui/material';
// import useHostDetails from '../../../hooks/host/useHostDetails';
// import useCountryDetails from '../../../hooks/country/useCountryDetails';
// import { Link, useNavigate, useParams } from 'react-router';
// import { ArrowBack, Public } from '@mui/icons-material';
// import Surface from '../../components/layout/Surface/Surface';
//
// const HostDetailsPage = () => {
//     const navigate = useNavigate();
//     const { id } = useParams();
//     const { hostDetails, loading, error } = useHostDetails(id);
//     const { countryDetails } = useCountryDetails(hostDetails ? String(hostDetails.country_id) : undefined);
//
//     if (loading) {
//         return (
//             <Surface sx={{ display: 'grid', placeItems: 'center', minHeight: 280 }}>
//                 <CircularProgress />
//             </Surface>
//         );
//     }
//
//     if (error) {
//         return (
//             <Box sx={{ py: 2 }}>
//                 <Alert severity='error' role='alert'>{error.message}</Alert>
//             </Box>
//         );
//     }
//
//     if (!hostDetails) {
//         return (
//             <Box sx={{ py: 2 }}>
//                 <Alert severity='warning'>Host not found.</Alert>
//             </Box>
//         );
//     }
//
//     const fullName = `${hostDetails.name} ${hostDetails.surname}`.trim();
//
//     return (
//         <Stack spacing={{ xs: 2.5, md: 3 }}>
//             <Breadcrumbs aria-label='breadcrumb'>
//                 <Link to='/hosts' style={{ textDecoration: 'none', color: 'inherit' }}
//                     onMouseEnter={e => (e.currentTarget.style.textDecoration = 'underline')}
//                     onMouseLeave={e => (e.currentTarget.style.textDecoration = 'none')}
//                 >
//                     Hosts
//                 </Link>
//                 <Typography color='text.primary'>{fullName}</Typography>
//             </Breadcrumbs>
//
//             <Surface
//                 sx={{
//                     p: { xs: 2.5, md: 3.5 },
//                     '&::before': {
//                         content: '""',
//                         position: 'absolute',
//                         inset: 0,
//                         background: (t) =>
//                             `linear-gradient(90deg, ${alpha(t.palette.primary.main, 0.10)} 0%, transparent 22%),
//                              radial-gradient(circle at 85% 35%, ${alpha(t.palette.secondary.main, 0.18)} 0%, transparent 55%)`,
//                         pointerEvents: 'none',
//                     },
//                 }}
//             >
//                 <Grid container spacing={{ xs: 2.5, md: 3 }} sx={{ position: 'relative', zIndex: 1 }}>
//                     <Grid size={{ xs: 12, md: 3 }}>
//                         <Box sx={{
//                             display: 'flex',
//                             justifyContent: 'center',
//                             mb: 1,
//                             bgcolor: (t) => alpha(t.palette.background.default, 0.65),
//                             p: 3,
//                             borderRadius: 4,
//                             border: 1,
//                             borderColor: 'divider',
//                         }}>
//                             <Avatar
//                                 sx={{ width: 96, height: 96, fontSize: 40, fontWeight: 700 }}
//                                 aria-hidden
//                             >
//                                 {hostDetails.name?.[0]}
//                                 {hostDetails.surname?.[0]}
//                             </Avatar>
//                         </Box>
//                     </Grid>
//
//                     <Grid size={{ xs: 12, md: 9 }}>
//                         <Typography variant='h3' gutterBottom sx={{ fontWeight: 800, letterSpacing: '-0.04em' }}>
//                             {fullName}
//                         </Typography>
//
//                         <Typography variant='subtitle1' sx={{ mb: 2, color: 'text.secondary' }}>
//                             Host profile
//                         </Typography>
//
//                         <Stack direction='row' spacing={1} useFlexGap sx={{ mb: 3, flexWrap: 'wrap' }}>
//                             <Chip
//                                 component={Link}
//                                 to={`/countries/${hostDetails.country_id}`}
//                                 clickable
//                                 icon={<Public />}
//                                 label={countryDetails ? countryDetails.name : 'Country'}
//                                 color='primary'
//                                 variant='outlined'
//                                 sx={{ px: 0.5, textDecoration: 'none', fontWeight: 600 }}
//                             />
//                         </Stack>
//
//                         <Divider sx={{ mb: 2.5, borderColor: (t) => alpha(t.palette.divider, 0.85) }} />
//
//                         <Grid size={{ xs: 12 }}>
//                             <Stack
//                                 direction={{ xs: 'column', sm: 'row' }}
//                                 spacing={1.5}
//                                 sx={{ alignItems: { sm: 'center' } }}
//                             >
//                                 <Button variant='outlined' startIcon={<ArrowBack />} onClick={() => navigate('/hosts')} sx={{ borderWidth: 2, borderRadius: 2 }}>
//                                     All hosts
//                                 </Button>
//                                 <Button variant='text' onClick={() => navigate('/accommodations')} sx={{ fontWeight: 700 }}>
//                                     Browse stays
//                                 </Button>
//                             </Stack>
//                         </Grid>
//                     </Grid>
//                 </Grid>
//             </Surface>
//         </Stack>
//     );
// };
//
// export default HostDetailsPage;
import { alpha, Avatar, Box, Breadcrumbs, Button, Chip, CircularProgress, Divider, Grid, Stack, Typography, Alert } from '@mui/material';
import useHostDetails from '../../../hooks/host/useHostDetails';
import useCountryDetails from '../../../hooks/country/useCountryDetails';
import { Link, useNavigate, useParams } from 'react-router';
import { ArrowBack, Public } from '@mui/icons-material';
import Surface from '../../components/layout/Surface/Surface';

const HostDetailsPage = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const { hostDetails, loading, error } = useHostDetails(id);
    const { countryDetails } = useCountryDetails(hostDetails ? String(hostDetails.country_id) : undefined);

    if (loading) {
        return (
            <Surface sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 300, borderRadius: 3 }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'center' }}>
                    <CircularProgress />
                    <Typography variant="body2" color="text.secondary">
                        Loading host...
                    </Typography>
                </Box>
            </Surface>
        );
    }

    if (error) {
        return (
            <Box sx={{ py: 2 }}>
                <Alert severity='error' sx={{ borderRadius: 2 }}>{error.message}</Alert>
            </Box>
        );
    }

    if (!hostDetails) {
        return (
            <Box sx={{ py: 2 }}>
                <Alert severity='warning' sx={{ borderRadius: 2 }}>Host not found.</Alert>
            </Box>
        );
    }

    const fullName = `${hostDetails.name} ${hostDetails.surname}`.trim();

    return (
        <Stack spacing={3}>
            {/* Breadcrumbs */}
            <Breadcrumbs>
                <Link to='/hosts' style={{ textDecoration: 'none', color: 'inherit', fontWeight: 500 }}>
                    Hosts
                </Link>
                <Typography color='text.primary'>{fullName}</Typography>
            </Breadcrumbs>

            {/* Main Card */}
            <Surface
                sx={{
                    p: { xs: 3, md: 4 },
                    borderRadius: 4,
                    position: 'relative',
                    overflow: 'hidden',
                    background: (t) =>
                        `linear-gradient(135deg, ${alpha(t.palette.primary.main, 0.08)}, ${alpha(
                            t.palette.secondary.main,
                            0.08
                        )})`,
                }}
            >
                <Grid container spacing={3}>
                    {/* Avatar Section */}
                    <Grid size={{ xs: 12, md: 3 }}>
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                            }}
                        >
                            <Avatar
                                sx={{
                                    width: 110,
                                    height: 110,
                                    fontSize: 42,
                                    fontWeight: 700,
                                    bgcolor: 'primary.main',
                                    boxShadow: 3,
                                }}
                            >
                                {hostDetails.name?.[0]}
                                {hostDetails.surname?.[0]}
                            </Avatar>
                        </Box>
                    </Grid>

                    {/* Info Section */}
                    <Grid size={{ xs: 12, md: 9 }}>
                        <Typography
                            variant='h3'
                            sx={{
                                fontWeight: 800,
                                letterSpacing: '-0.03em',
                                mb: 1,
                            }}
                        >
                            {fullName}
                        </Typography>

                        <Typography variant='subtitle1' color='text.secondary' sx={{ mb: 2 }}>
                            Host profile overview
                        </Typography>

                        {/* Country Chip */}
                        <Stack direction='row' spacing={1} sx={{ mb: 3 }}>
                            <Chip
                                component={Link}
                                to={`/countries/${hostDetails.country_id}`}
                                clickable
                                icon={<Public />}
                                label={countryDetails ? countryDetails.name : 'Country'}
                                color='primary'
                                variant='outlined'
                                sx={{
                                    fontWeight: 600,
                                    borderRadius: 2,
                                    '&:hover': {
                                        bgcolor: 'primary.main',
                                        color: 'white',
                                    },
                                }}
                            />
                        </Stack>

                        <Divider sx={{ mb: 3 }} />

                        {/* Actions */}
                        <Stack
                            direction={{ xs: 'column', sm: 'row' }}
                            spacing={2}
                        >
                            <Button
                                variant='outlined'
                                startIcon={<ArrowBack />}
                                onClick={() => navigate('/hosts')}
                                sx={{ borderRadius: 3 }}
                            >
                                All hosts
                            </Button>

                            <Button
                                variant='contained'
                                onClick={() => navigate('/accommodations')}
                                sx={{ borderRadius: 3 }}
                            >
                                Browse stays
                            </Button>
                        </Stack>
                    </Grid>
                </Grid>
            </Surface>
        </Stack>
    );
};

export default HostDetailsPage;