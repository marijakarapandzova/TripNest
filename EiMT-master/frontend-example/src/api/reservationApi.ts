import useAxios from '../hooks/useAxios';

export interface Reservation {
  id: number;
  accommodation: {
    id: number;
    name: string;
    category: string;
    host_id: number;
    condition: string;
    numRooms: number;
    rented: boolean;
  };
  userName: string;
  status: 'CREATED' | 'CANCELLED';
  createdAt: string;
  updatedAt: string;
}

export interface CreateReservationRequest {
  accommodationId: number;
}

const reservationApi = {
  createReservation: async (data: CreateReservationRequest) => {
    return await useAxios.post<Reservation>('/accommodations/reserve', data);
  },

  getUserReservations: async () => {
    return await useAxios.get<Reservation[]>('/accommodations/user/reservations');
  },

  getAccommodationReservations: async (accommodationId: number) => {
    return await useAxios.get<Reservation[]>(`/accommodations/${accommodationId}/reservations`);
  },

  cancelReservation: async (reservationId: number) => {
    return await useAxios.post<Reservation>(`/accommodations/reservations/${reservationId}/cancel`, {});
  },
};

export default reservationApi;
