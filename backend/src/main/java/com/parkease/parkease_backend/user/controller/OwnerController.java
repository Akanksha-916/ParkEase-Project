package com.parkease.parkease_backend.user.controller;

import com.parkease.parkease_backend.booking.dto.BookingResponse;
import com.parkease.parkease_backend.booking.service.BookingService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/owner")
@RequiredArgsConstructor
public class OwnerController {
    private final BookingService bookingService;

    @GetMapping("/bookings")
    @PreAuthorize("hasRole('OWNER')")
    public ResponseEntity<List<BookingResponse>> getOwnerBookings() {

        return ResponseEntity.ok(
                bookingService.getOwnerBookings()
        );
    }
}
