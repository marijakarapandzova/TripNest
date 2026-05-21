package finki.ukim.emt.booking.model.dto.reservations;

import finki.ukim.emt.booking.model.domain.Reservation;
import finki.ukim.emt.booking.model.dto.accommodations.DisplayAccommodationDto;
import finki.ukim.emt.booking.model.enums.ReservationStatus;

import java.time.format.DateTimeFormatter;
import java.util.List;

public record DisplayReservationDto(
        Long id,
        DisplayAccommodationDto accommodation,
        String userName,
        ReservationStatus status,
        String createdAt,
        String updatedAt
) {
    private static final DateTimeFormatter formatter = DateTimeFormatter.ISO_DATE_TIME;

    public static DisplayReservationDto from(Reservation reservation) {
        return new DisplayReservationDto(
                reservation.getId(),
                DisplayAccommodationDto.from(reservation.getAccommodation()),
                reservation.getUser().getUsername(),
                reservation.getStatus(),
                reservation.getCreatedAt().format(formatter),
                reservation.getUpdatedAt().format(formatter)
        );
    }

    public static List<DisplayReservationDto> from(List<Reservation> reservations) {
        return reservations.stream().map(DisplayReservationDto::from).toList();
    }
}