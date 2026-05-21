import { useState } from 'react';
import type { CreateReservationRequest } from '../../api/reservationApi';
import reservationApi from '../../api/reservationApi';

const useReservation = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const createReservation = async (data: CreateReservationRequest) => {
    setLoading(true);
    setError(null);

    try {
      const response = await reservationApi.createReservation(data);
      return response.data;
    } catch (err) {
      const errorMessage = err instanceof Error ? err : new Error('Failed to create reservation');
      setError(errorMessage);
      throw errorMessage;
    } finally {
      setLoading(false);
    }
  };

  const cancelReservation = async (reservationId: number) => {
    setLoading(true);
    setError(null);

    try {
      const response = await reservationApi.cancelReservation(reservationId);
      return response.data;
    } catch (err) {
      const errorMessage = err instanceof Error ? err : new Error('Failed to cancel reservation');
      setError(errorMessage);
      throw errorMessage;
    } finally {
      setLoading(false);
    }
  };

  return { createReservation, cancelReservation, loading, error };
};

export default useReservation;
