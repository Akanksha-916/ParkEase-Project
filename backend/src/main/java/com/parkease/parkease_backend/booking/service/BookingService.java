package com.parkease.parkease_backend.booking.service;

import com.parkease.parkease_backend.booking.dto.BookingRequest;
import com.parkease.parkease_backend.booking.dto.BookingResponse;
import com.parkease.parkease_backend.booking.entity.Booking;
import com.parkease.parkease_backend.booking.entity.BookingStatus;
import com.parkease.parkease_backend.booking.repository.BookingRepository;
import com.parkease.parkease_backend.parking.dto.AvailableSlotResponse;
import com.parkease.parkease_backend.parking.entity.ParkingLot;
import com.parkease.parkease_backend.parking.entity.ParkingSlot;
import com.parkease.parkease_backend.parking.entity.VehicleType;
import com.parkease.parkease_backend.parking.repository.ParkingLotRepository;
import com.parkease.parkease_backend.parking.repository.ParkingSlotRepository;
import com.parkease.parkease_backend.user.base.User;
import com.parkease.parkease_backend.user.repository.UserRepository;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class BookingService {

    private final BookingRepository bookingRepository;
    private final ParkingLotRepository parkingLotRepository;
    private final ParkingSlotRepository parkingSlotRepository;
    private final UserRepository userRepository;

    public BookingService(
            BookingRepository bookingRepository,
            ParkingLotRepository parkingLotRepository,
            ParkingSlotRepository parkingSlotRepository,
            UserRepository userRepository
    ) {
        this.bookingRepository = bookingRepository;
        this.parkingLotRepository = parkingLotRepository;
        this.parkingSlotRepository = parkingSlotRepository;
        this.userRepository = userRepository;
    }

    @Transactional
    public BookingResponse createBooking(BookingRequest request) {

        Authentication authentication =
                SecurityContextHolder.getContext().getAuthentication();

        String email = authentication.getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        ParkingLot lot = parkingLotRepository.findById(request.getLotId())
                .orElseThrow(() -> new RuntimeException("Parking lot not found"));

        List<ParkingSlot> slots =
                parkingSlotRepository.findByParkingLotId(request.getLotId());

        ParkingSlot assignedSlot = null;

        for (ParkingSlot slot : slots) {

            if (!slot.getVehicleType().equals(request.getVehicleType()))
                continue;

            List<Booking> conflicts =
                    bookingRepository.findConflictingBookings(
                            slot.getId(),
                            request.getStartTime(),
                            request.getEndTime()
                    );

            if (conflicts.isEmpty()) {
                assignedSlot = slot;
                break;
            }
        }

        if (assignedSlot == null) {
            throw new RuntimeException("No available slots");
        }

        Booking booking = Booking.builder()
                .user(user)
                .parkingSlot(assignedSlot)
                .startTime(request.getStartTime())
                .endTime(request.getEndTime())
                .status(BookingStatus.RESERVED)
                .build();

        bookingRepository.save(booking);

        return BookingResponse.builder()
                .bookingId(booking.getId())
                .lotId(lot.getId())
                .slotId(assignedSlot.getId())
                .slotNumber(assignedSlot.getSlotNumber())
                .startTime(booking.getStartTime())
                .endTime(booking.getEndTime())
                .status(booking.getStatus())
                .build();
    }

    @Transactional
    public List<BookingResponse> getMyBookings() {

        Authentication authentication =
                SecurityContextHolder.getContext().getAuthentication();

        String email = authentication.getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        List<Booking> bookings =
                bookingRepository.findByUserId(user.getId());

        return bookings.stream().map(booking ->

                BookingResponse.builder()
                        .bookingId(booking.getId())
                        .lotId(booking.getParkingSlot().getParkingLot().getId())
                        .slotId(booking.getParkingSlot().getId())
                        .slotNumber(booking.getParkingSlot().getSlotNumber())
                        .startTime(booking.getStartTime())
                        .endTime(booking.getEndTime())
                        .status(booking.getStatus())
                        .build()

        ).toList();
    }

    @Transactional
    public BookingResponse cancelBooking(Long bookingId) {

        Authentication authentication =
                SecurityContextHolder.getContext().getAuthentication();

        String email = authentication.getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Booking booking = bookingRepository
                .findByIdAndUserId(bookingId, user.getId())
                .orElseThrow(() -> new RuntimeException("Booking not found"));

        if (booking.getStatus() == BookingStatus.CANCELLED) {
            throw new RuntimeException("Booking already cancelled");
        }

        if (booking.getStatus() == BookingStatus.COMPLETED) {
            throw new RuntimeException("Completed booking cannot be cancelled");
        }

        booking.setStatus(BookingStatus.CANCELLED);

        bookingRepository.save(booking);

        return BookingResponse.builder()
                .bookingId(booking.getId())
                .lotId(booking.getParkingSlot().getParkingLot().getId())
                .slotId(booking.getParkingSlot().getId())
                .slotNumber(booking.getParkingSlot().getSlotNumber())
                .startTime(booking.getStartTime())
                .endTime(booking.getEndTime())
                .status(booking.getStatus())
                .build();
    }

    @Transactional
    public List<AvailableSlotResponse> getAvailableSlots(
            Long lotId,
            VehicleType vehicleType
    ) {

        List<ParkingSlot> slots =
                parkingSlotRepository.findByParkingLotId(lotId);

        List<AvailableSlotResponse> availableSlots = new ArrayList<>();

        LocalDateTime now = LocalDateTime.now();

        for (ParkingSlot slot : slots) {

            if (!slot.getVehicleType().equals(vehicleType)) {
                continue;
            }

            List<Booking> conflicts =
                    bookingRepository.findConflictingBookings(
                            slot.getId(),
                            now,
                            now
                    );

            if (conflicts.isEmpty()) {

                availableSlots.add(
                        AvailableSlotResponse.builder()
                                .slotId(slot.getId())
                                .slotNumber(slot.getSlotNumber())
                                .vehicleType(slot.getVehicleType())
                                .size(slot.getSize())
                                .price(slot.getPrice())
                                .lotId(slot.getParkingLot().getId())
                                .build()
                );
            }
        }

        return availableSlots;
    }

    @Transactional
    public List<BookingResponse> getOwnerBookings() {

        Authentication authentication =
                SecurityContextHolder.getContext().getAuthentication();

        String email = authentication.getName();

        User owner = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        List<Booking> bookings =
                bookingRepository.findBookingsByOwnerId(owner.getId(), Pageable.unpaged())
                        .getContent();

        return bookings.stream().map(booking ->

                BookingResponse.builder()
                        .bookingId(booking.getId())
                        .lotId(booking.getParkingSlot().getParkingLot().getId())
                        .slotId(booking.getParkingSlot().getId())
                        .slotNumber(booking.getParkingSlot().getSlotNumber())
                        .startTime(booking.getStartTime())
                        .endTime(booking.getEndTime())
                        .status(booking.getStatus())
                        .build()

        ).toList();
    }

}