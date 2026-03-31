package com.parkease.parkease_backend.user.dto;

import lombok.Data;

@Data
public class UpdateProfileRequest {
    private String name;
    private String phoneNo;
    private String vehicleNo;
}
