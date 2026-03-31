package com.parkease.parkease_backend.user.controller;

import com.parkease.parkease_backend.user.base.User;
import com.parkease.parkease_backend.user.dto.UpdateProfileRequest;
import com.parkease.parkease_backend.user.dto.UserProfileResponse;
import com.parkease.parkease_backend.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@Slf4j

@RestController
@RequestMapping("/api/v1/profile")
@RequiredArgsConstructor
public class ProfileController {

    private final UserRepository userRepository;

    @GetMapping
    public User getProfile(Authentication authentication) {

        String email = authentication.getName();

        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    @PutMapping
    public UserProfileResponse updateProfile(
            @RequestBody UpdateProfileRequest request,
            Authentication authentication) {

        String email = authentication.getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));


        user.setName(request.getName());
        user.setPhoneNo(request.getPhoneNo());
        user.setVehicleNo(request.getVehicleNo());

        User savedUser = userRepository.save(user);

        return mapToResponse(savedUser);
    }

    private UserProfileResponse mapToResponse(User user) {
        return UserProfileResponse.builder()
                .id(user.getId())
                .name(user.getName())
                .email(user.getEmail())
                .phoneNo(user.getPhoneNo())
                .vehicleNo(user.getVehicleNo())
                .role(user.getRole())
                .status(user.getStatus())
                .build();
    }
}