package com.parkease.parkease_backend.parking.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.*;
import lombok.Data;

import java.util.List;

@Data
public class ParkingLotRequest {

    @NotBlank(message = "Parking lot name is required")
    private String name;

    @NotBlank(message = "Address is required")
    private String address;

    @NotBlank(message = "City is required")
    private String city;

    @NotBlank(message = "Pincode is required")
    @Pattern(regexp = "\\d{6}", message = "Pincode must be 6 digits")
    private String pincode;

    @NotEmpty(message = "At least one slot must be provided")
    @Valid
    private List<ParkingSlotRequest> slots;
}