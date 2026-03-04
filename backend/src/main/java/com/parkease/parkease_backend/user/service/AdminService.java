package com.parkease.parkease_backend.user.service;
import com.parkease.parkease_backend.user.base.Role;
import com.parkease.parkease_backend.user.base.User;
import com.parkease.parkease_backend.user.base.UserStatus;
import com.parkease.parkease_backend.user.dto.RegisterRequest;
import com.parkease.parkease_backend.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor

public class AdminService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Transactional
    public void createOwner(RegisterRequest request) {

        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already exists");
        }

        User owner = User.builder()
                .name(request.getName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .phoneNo(request.getPhoneNo())
                .vehicleNo(request.getVehicleNo())
                .role(Role.OWNER)
                .status(UserStatus.ACTIVE)
                .build();

        userRepository.save(owner);
    }
}
