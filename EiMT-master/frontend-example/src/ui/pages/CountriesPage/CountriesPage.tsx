import { Alert, CircularProgress, Typography } from '@mui/material';
import useCountries from '../../../hooks/country/useCountries';
import CountryGrid from '../../components/country/CountryGrid';
import PageHeader from '../../components/layout/PageHeader/PageHeader';
import Section from '../../components/layout/Section/Section';
import Surface from '../../components/layout/Surface/Surface';

const CountriesPage = () => {
    const { countries, loading, error } = useCountries();

    return (
        <Section>
            <PageHeader
                id='countries-heading'
                title='Countries & regions'
                subtitle='Explore where stays are rooted. Each card opens a country profile with continent context.'
                meta={
                    !loading && !error && countries.length > 0 ? (
                        <Typography variant='body2' sx={{ color: 'primary.main', fontWeight: 600 }}>
                            {countries.length} countr{countries.length === 1 ? 'y' : 'ies'} available
                        </Typography>
                    ) : null
                }
            />

            {error && (
                <Alert severity='error' role='alert' sx={{ mt: 2, borderRadius: 2 }}>
                    {error.message}
                </Alert>
            )}

            {loading && (
                <Surface sx={{ display: 'grid', placeItems: 'center', minHeight: 280 }}>
                    <CircularProgress aria-label='Loading countries' />
                </Surface>
            )}

            {!loading && !error && countries.length === 0 && (
                <Alert severity='info' sx={{ mt: 2, borderRadius: 2 }}>
                    No countries are listed yet. Check back soon.
                </Alert>
            )}

            {!loading && !error && countries.length > 0 && (
                <CountryGrid countries={countries} />
            )}
        </Section>
    );
};

export default CountriesPage;

