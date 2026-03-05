package com.parkease.parkease_backend.booking.dto;

import com.parkease.parkease_backend.parking.entity.VehicleType;
import lombok.*;

import java.time.LocalDateTime;
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BookingRequest {
    private Long lotId;

    private LocalDateTime startTime;

    private LocalDateTime endTime;

    private VehicleType vehicleType;

}
