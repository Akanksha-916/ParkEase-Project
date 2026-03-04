package com.parkease.parkease_backend.parking.dto;

import com.parkease.parkease_backend.parking.entity.SlotSize;
import com.parkease.parkease_backend.parking.entity.VehicleType;
import jakarta.validation.constraints.*;
import lombok.Data;

import java.math.BigDecimal;

@Data
public class ParkingSlotRequest {

    @NotBlank(message = "Slot number is required")
    private String slotNumber;

    @NotNull(message = "Price is required")
    @Positive(message = "Price must be greater than 0")
    private BigDecimal price;

    @NotNull(message = "Slot size is required")
    private SlotSize size;

    @NotNull(message = "Vehicle type is required")
    private VehicleType vehicleType;

}