package com.parkease.parkease_backend.parking.dto;

import com.parkease.parkease_backend.parking.entity.SlotSize;
import com.parkease.parkease_backend.parking.entity.VehicleType;
import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;

@Data
@Builder
public class ParkingSlotResponse {

    private Long id;
    private String slotNumber;
    private BigDecimal price;
    private SlotSize size;
    private VehicleType vehicleType;
    private boolean active;
}