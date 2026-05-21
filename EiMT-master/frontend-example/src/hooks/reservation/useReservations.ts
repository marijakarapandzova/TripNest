import { useState, useEffect } from 'react';
import type { Reservation } from '../../api/reservationApi';
import reservationApi from '../../api/reservationApi';

const useReservations = () => {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        setLoading(true);
        const response = await reservationApi.getUserReservations();
        setReservations(response.data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch reservations'));
      } finally {
        setLoading(false);
      }
    };

    fetchReservations();
  }, []);

  return { reservations, loading, error };
};

export default useReservations;
