import { Alert, Box, CircularProgress, Stack } from '@mui/material';
import useAccommodationEvents from '../../../hooks/accommodation/useAccommodationEvents';
import AccommodationEventGrid from '../../components/accommodationEvent/AccommodationEventGrid';
import PageHeader from '../../components/layout/PageHeader/PageHeader';

const AccommodationEventsPage = () => {
  const { accommodationEvents, loading, error } = useAccommodationEvents();

  return (
    <Stack spacing={{ xs: 3, md: 4 }} component='section' aria-labelledby='stays-heading' sx={{ py: { xs: 1, md: 1.5 } }}>
      <PageHeader id='stays-heading' title='Events' subtitle='Recent activity happening across the platform.' />

      {error && (
        <Alert severity='error' role='alert'>
          {error.message}
        </Alert>
      )}

      {loading && (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: 280,
            borderRadius: 2,
            border: 1,
            borderColor: 'divider',
            bgcolor: 'background.paper',
          }}
        >
          <CircularProgress aria-label='Loading stays' />
        </Box>
      )}

      {!loading && !error && accommodationEvents.length === 0 && (
        <Alert severity='info'>No accommodation events available.</Alert>
      )}

      {!loading && accommodationEvents.length > 0 && (
        <AccommodationEventGrid accommodationEvents={accommodationEvents} />
      )}
    </Stack>
  );
};

export default AccommodationEventsPage;
