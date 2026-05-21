package finki.ukim.emt.booking.model.dto.reservations;

public record CreateReservationDto(
        Long accommodationId,
        Long userId
) {}