package com.parkease.parkease_backend.parking.dto;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
public class ParkingLotResponse {

    private Long id;
    private String name;
    private String address;
    private String city;
    private String pincode;
    private LocalDateTime createdAt;
    private List<ParkingSlotResponse> slots;
    private boolean active;
}