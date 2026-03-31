package com.parkease.parkease_backend.booking.repository;

import com.parkease.parkease_backend.booking.entity.Booking;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface BookingRepository extends JpaRepository<Booking, Long> {

    @Query("""
            SELECT b FROM Booking b
            WHERE b.parkingSlot.id = :slotId
            AND b.status IN ('RESERVED','ACTIVE')
            AND b.startTime < :endTime
            AND b.endTime > :startTime
            """)
    List<Booking> findConflictingBookings(
            Long slotId,
            LocalDateTime startTime,
            LocalDateTime endTime
    );

    List<Booking> findByUserId(Long userId);

    Optional<Booking> findByIdAndUserId(Long bookingId, Long userId);

    @Query("""
                SELECT b FROM Booking b
                JOIN b.parkingSlot ps
                JOIN ps.parkingLot pl
                WHERE pl.owner.id = :ownerId
            """)
    Page<Booking> findBookingsByOwnerId(Long ownerId, Pageable pageable);
}



