package com.parkease.parkease_backend.parking.dto;

import com.parkease.parkease_backend.parking.entity.VehicleType;
import com.parkease.parkease_backend.parking.entity.SlotSize;
import lombok.*;

import java.math.BigDecimal;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AvailableSlotResponse {

    private Long slotId;

    private String slotNumber;

    private VehicleType vehicleType;

    private SlotSize size;

    private BigDecimal price;

    private Long lotId;
}