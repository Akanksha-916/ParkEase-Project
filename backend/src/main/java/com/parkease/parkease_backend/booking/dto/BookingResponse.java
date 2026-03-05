package com.parkease.parkease_backend.booking.dto;
import com.parkease.parkease_backend.booking.entity.BookingStatus;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BookingResponse {
    private Long bookingId;

    private Long lotId;

    private Long slotId;

    private String slotNumber;

    private LocalDateTime startTime;

    private LocalDateTime endTime;

    private BookingStatus status;
}
