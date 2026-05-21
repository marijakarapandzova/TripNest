package finki.ukim.emt.booking.repository;

import finki.ukim.emt.booking.model.domain.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReservationRepository extends JpaRepository<Reservation, Long> {
    List<Reservation> findByAccommodationId(Long accommodationId);
    List<Reservation> findByUserId(Long userId);
    List<Reservation> findByUserIdOrderByCreatedAtDesc(Long userId);
}