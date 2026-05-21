import { Alert, Box, CircularProgress, Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import { useState } from 'react';
import useReservations from '../../../hooks/reservation/useReservations';
import useReservation from '../../../hooks/reservation/useReservation';
import PageHeader from '../../components/layout/PageHeader/PageHeader';
import Section from '../../components/layout/Section/Section';

const ReservationsPage = () => {
  const { reservations, loading, error } = useReservations();
  const { cancelReservation, loading: canceling } = useReservation();
  const [selectedReservationId, setSelectedReservationId] = useState<number | null>(null);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [cancelMessage, setCancelMessage] = useState<string | null>(null);
  const [cancelError, setCancelError] = useState<string | null>(null);

  const handleCancelClick = (reservationId: number) => {
    setSelectedReservationId(reservationId);
    setConfirmDialogOpen(true);
  };

  const handleConfirmCancel = async () => {
    if (!selectedReservationId) return;

    try {
      await cancelReservation(selectedReservationId);
      setCancelMessage('Reservation cancelled successfully!');
      setConfirmDialogOpen(false);
      setTimeout(() => setCancelMessage(null), 3000);
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Failed to cancel reservation';
      setCancelError(errorMsg);
      setTimeout(() => setCancelError(null), 5000);
    }
  };

  const handleCloseDialog = () => {
    setConfirmDialogOpen(false);
    setSelectedReservationId(null);
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      <PageHeader
        title='Your Reservations'
        description='Manage your accommodation reservations'
      />

      <Section>
        <Container maxWidth='lg'>
          {error && <Alert severity='error' sx={{ mb: 2 }}>{error.message}</Alert>}
          {cancelMessage && <Alert severity='success' sx={{ mb: 2 }}>{cancelMessage}</Alert>}
          {cancelError && <Alert severity='error' sx={{ mb: 2 }}>{cancelError}</Alert>}

          {reservations && reservations.length > 0 ? (
            <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
              <Table>
                <TableHead sx={{ bgcolor: (t) => t.palette.action.hover }}>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 600 }}>Accommodation</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Category</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Reserved On</TableCell>
                    <TableCell sx={{ fontWeight: 600, textAlign: 'right' }}>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {reservations.map((reservation) => (
                    <TableRow key={reservation.id} hover>
                      <TableCell>{reservation.accommodation.name}</TableCell>
                      <TableCell>{reservation.accommodation.category}</TableCell>
                      <TableCell>
                        <Typography
                          variant='body2'
                          sx={{
                            fontWeight: 600,
                            color: reservation.status === 'CREATED' ? 'success.main' : 'error.main',
                          }}
                        >
                          {reservation.status}
                        </Typography>
                      </TableCell>
                      <TableCell>{new Date(reservation.createdAt).toLocaleDateString()}</TableCell>
                      <TableCell sx={{ textAlign: 'right' }}>
                        {reservation.status === 'CREATED' && (
                          <Button
                            variant='outlined'
                            color='error'
                            size='small'
                            onClick={() => handleCancelClick(reservation.id)}
                            disabled={canceling}
                          >
                            Cancel
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <Paper sx={{ p: 4, textAlign: 'center', borderRadius: 2 }}>
              <Typography variant='h6' color='text.secondary'>
                No reservations yet
              </Typography>
              <Typography variant='body2' color='text.secondary' sx={{ mt: 1 }}>
                Start exploring accommodations and make your first reservation!
              </Typography>
            </Paper>
          )}
        </Container>
      </Section>

      <Dialog
        open={confirmDialogOpen}
        onClose={handleCloseDialog}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>Cancel Reservation?</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            Are you sure you want to cancel this reservation? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color='inherit'>
            No, Keep it
          </Button>
          <Button onClick={handleConfirmCancel} variant='contained' color='error' autoFocus disabled={canceling}>
            {canceling ? 'Canceling...' : 'Yes, Cancel it'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ReservationsPage;
