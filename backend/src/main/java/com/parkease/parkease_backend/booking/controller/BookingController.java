package com.parkease.parkease_backend.booking.controller;

import com.parkease.parkease_backend.booking.dto.BookingRequest;
import com.parkease.parkease_backend.booking.dto.BookingResponse;
import com.parkease.parkease_backend.booking.service.BookingService;
import com.parkease.parkease_backend.parking.dto.AvailableSlotResponse;
import com.parkease.parkease_backend.parking.entity.VehicleType;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/v1/bookings")
public class BookingController {

    private final BookingService bookingService;

    public BookingController(BookingService bookingService) {
        this.bookingService = bookingService;
    }

    @PostMapping
    public BookingResponse createBooking(
            @RequestBody BookingRequest request) {

        return bookingService.createBooking(request);
    }

    @GetMapping("/my")
    public List<BookingResponse> getMyBookings() {
        return bookingService.getMyBookings();
    }

    @PutMapping("/{bookingId}/cancel")
    public BookingResponse cancelBooking(@PathVariable Long bookingId) {
        return bookingService.cancelBooking(bookingId);
    }

    @GetMapping("/{lotId}/available-slots")
    public List<AvailableSlotResponse> getAvailableSlots(
            @PathVariable Long lotId,
            @RequestParam VehicleType vehicleType
    ) {

        return bookingService.getAvailableSlots(
                lotId,
                vehicleType
        );
    }
}