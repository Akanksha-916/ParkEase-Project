package com.parkease.parkease_backend.user.controller;

import com.parkease.parkease_backend.user.base.Role;
import com.parkease.parkease_backend.user.base.User;
import com.parkease.parkease_backend.user.dto.AuthResponse;
import com.parkease.parkease_backend.user.dto.LoginRequest;
import com.parkease.parkease_backend.user.dto.RegisterRequest;
import com.parkease.parkease_backend.user.repository.UserRepository;
import com.parkease.parkease_backend.security.JwtService;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public AuthController(AuthenticationManager authenticationManager,
                          JwtService jwtService,
                          UserRepository userRepository,
                          PasswordEncoder passwordEncoder) {
        this.authenticationManager = authenticationManager;
        this.jwtService = jwtService;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping("/register")
    public AuthResponse register(@RequestBody RegisterRequest request) {

        log.info("Registration attempt for email={}", request.getEmail());

        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already exists");
        }

        User user = User.builder()
                .name(request.getName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .phoneNo(request.getPhoneNo())
                .vehicleNo(request.getVehicleNo())
                .role(Role.USER)
                .build();

        userRepository.save(user);
        log.info("User registered successfully email={}", request.getEmail());
        String token = jwtService.generateToken(user.getEmail());

        return new AuthResponse(token);
    }

    @PostMapping("/login")
    public AuthResponse login(@RequestBody LoginRequest request) {


        log.info("Login attempt for email={}", request.getEmail());
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );
        log.info("Login success for email={}", request.getEmail());


        String token = jwtService.generateToken(request.getEmail());

        return new AuthResponse(token);
    }
}