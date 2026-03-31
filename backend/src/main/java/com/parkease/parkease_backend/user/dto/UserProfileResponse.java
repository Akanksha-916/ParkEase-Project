package com.parkease.parkease_backend.user.dto;

import com.parkease.parkease_backend.user.base.Role;
import com.parkease.parkease_backend.user.base.UserStatus;
import lombok.*;


@Data
@Builder
public class UserProfileResponse {
    private Long id;
    private String name;
    private String email;
    private String phoneNo;
    private String vehicleNo;
    private Role role;
    private UserStatus status;
}
