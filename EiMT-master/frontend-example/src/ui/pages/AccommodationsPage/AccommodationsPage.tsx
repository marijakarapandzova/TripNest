import { Alert, CircularProgress, Typography } from '@mui/material';
import useAccommodations from '../../../hooks/accommodation/useAccommodations';
import AccommodationGrid from '../../components/accommodation/AccommodationGrid';
import PageHeader from '../../components/layout/PageHeader/PageHeader';
import Section from '../../components/layout/Section/Section';
import Surface from '../../components/layout/Surface/Surface';

const AccommodationsPage = () => {
  const { accommodations, loading, error } = useAccommodations();
  const availableCount = accommodations.filter((accommodation) => !accommodation.rented).length;

  return (
    <Section sx={{}}>
      <PageHeader
        id='stays-heading'
        title='Discover your next stay'
        subtitle='Browse curated accommodations, compare availability, and open any listing for full details and booking info.'
        meta={
          !loading && !error && accommodations.length > 0 ? (
            <Typography variant='body2' sx={{ color: 'primary.main', fontWeight: 600 }}>
              {availableCount} of {accommodations.length} stays currently available
            </Typography>
          ) : null
        }
      />

      {error && (
        <Alert severity='error' role='alert'>
          {error.message}
        </Alert>
      )}

      {loading && (
        <Surface sx={{ display: 'grid', placeItems: 'center', minHeight: 280 }}>
          <CircularProgress aria-label='Loading stays' />
        </Surface>
      )}

      {!loading && !error && accommodations.length === 0 && (
        <Alert severity='info'>No stays are listed yet. Check back soon.</Alert>
      )}

      {!loading && accommodations.length > 0 && (
        <AccommodationGrid accommodations={accommodations} />
      )}
    </Section>
  );
};

export default AccommodationsPage;

