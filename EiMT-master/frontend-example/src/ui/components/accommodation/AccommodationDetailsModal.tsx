import { alpha, Alert, Avatar, Box, Button, Chip, CircularProgress, Dialog, DialogContent, Divider, IconButton, Stack, Typography } from '@mui/material';
import useAccommodationDetails from '../../../hooks/accommodation/useAccommodationDetails';
import useHostDetails from '../../../hooks/host/useHostDetails';
import useCountryDetails from '../../../hooks/country/useCountryDetails';
import { Link, Close, Category, PersonRounded, Public } from '@mui/icons-material';
import { Link as RouterLink } from 'react-router';

interface AccommodationDetailsModalProps {
  open: boolean;
  accommodationId?: string | number;
  onClose: () => void;
}

const AccommodationDetailsModal = ({ open, accommodationId, onClose }: AccommodationDetailsModalProps) => {
  const { accommodationDetails, loading, error } = useAccommodationDetails(
    accommodationId ? String(accommodationId) : undefined,
  );
  const { hostDetails, loading: hostLoading, error: hostError } = useHostDetails(
    accommodationDetails ? String(accommodationDetails.host_id) : undefined,
  );
  const { countryDetails } = useCountryDetails(
    hostDetails ? String(hostDetails.country_id) : undefined,
  );

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth='sm'
      fullWidth
      slotProps={{
        paper: {
          sx: {
            borderRadius: 3,
            border: 1,
            borderColor: 'divider',
          },
        }
      }}
    >
      {/* Close Button */}
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 1 }}>
        <IconButton
          onClick={onClose}
          size='small'
          sx={{
            color: 'text.secondary',
            '&:hover': { bgcolor: 'action.hover' },
          }}
        >
          <Close fontSize='small' />
        </IconButton>
      </Box>

      <DialogContent sx={{ pt: 0 }}>
        {/* Loading State */}
        {loading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
            <CircularProgress />
          </Box>
        )}

        {/* Error State */}
        {error && (
          <Alert severity='error' onClose={onClose}>
            {error.message}
          </Alert>
        )}

        {/* Not Found State */}
        {!loading && !error && !accommodationDetails && (
          <Alert severity='warning' onClose={onClose}>
            Accommodation not found.
          </Alert>
        )}

        {/* Content */}
        {!loading && !error && accommodationDetails && (
          <Stack spacing={2.5}>
            {/* Image */}
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                bgcolor: (t) => alpha(t.palette.primary.main, 0.08),
                p: 2,
                borderRadius: 2,
                border: 1,
                borderColor: 'divider',
              }}
            >
              <Avatar
                src='/assets/hero.png'
                variant='rounded'
                sx={{
                  width: '100%',
                  height: 'auto',
                  maxWidth: 240,
                  maxHeight: 180,
                  objectFit: 'contain',
                }}
              />
            </Box>

            {/* Title & Subtitle */}
            <Box>
              <Typography variant='h5' gutterBottom sx={{ fontWeight: 700 }}>
                {accommodationDetails.name}
              </Typography>
              <Typography variant='subtitle2' sx={{ color: 'text.secondary' }}>
                {accommodationDetails.numRooms} room(s) available
              </Typography>
            </Box>

            {/* Status Chips */}
            <Stack direction='row' spacing={1} useFlexGap sx={{ flexWrap: 'wrap' }}>
              <Chip
                label={accommodationDetails.rented ? 'Booked' : 'Available'}
                color={accommodationDetails.rented ? 'default' : 'success'}
                size='small'
                sx={{ fontWeight: 600 }}
              />
              <Chip
                label={`${accommodationDetails.condition} condition`}
                color='info'
                variant='outlined'
                size='small'
              />
              <Chip
                icon={<Category />}
                label={accommodationDetails.category}
                color='primary'
                variant='outlined'
                size='small'
              />
            </Stack>

            <Divider sx={{ borderColor: (t) => alpha(t.palette.divider, 0.85) }} />

            {/* Host Section */}
            <Stack spacing={1}>
              <Typography variant='subtitle2' color='text.secondary' sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
                <PersonRounded fontSize='small' aria-hidden />
                Host
              </Typography>
              <Stack direction='row' spacing={1} useFlexGap sx={{ flexWrap: 'wrap', alignItems: 'center' }}>
                {hostLoading && <CircularProgress size={22} aria-label='Loading host' />}
                {hostError && (
                  <Typography variant='body2' color='error'>
                    Could not load host details.
                  </Typography>
                )}
                {hostDetails && (
                  <>
                    <Typography variant='body2' sx={{ fontWeight: 600 }}>
                      {hostDetails.name} {hostDetails.surname}
                    </Typography>
                    <Chip
                      icon={<Public fontSize='small' />}
                      label={countryDetails ? countryDetails.name : 'Country'}
                      size='small'
                      variant='outlined'
                    />
                  </>
                )}
              </Stack>
            </Stack>

            <Divider sx={{ borderColor: (t) => alpha(t.palette.divider, 0.85) }} />

            {/* Action Buttons */}
            <Stack direction='row' spacing={1} useFlexGap sx={{ pt: 1 }}>
              <Button
                component={RouterLink}
                to={`/accommodations/${accommodationDetails.id}`}
                variant='contained'
                size='small'
                startIcon={<Link fontSize='small' />}
                fullWidth
              >
                Full Details
              </Button>
              <Button variant='outlined' size='small' fullWidth onClick={onClose}>
                Close
              </Button>
            </Stack>
          </Stack>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AccommodationDetailsModal;

