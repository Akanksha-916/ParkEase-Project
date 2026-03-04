package com.parkease.parkease_backend.user.controller;
import com.parkease.parkease_backend.user.service.AdminService;
import com.parkease.parkease_backend.user.dto.RegisterRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/admin")
@RequiredArgsConstructor

public class AdminController {
    private final AdminService adminService;

    @PostMapping("/owners")
    public void createOwner(@RequestBody RegisterRequest request) {
        adminService.createOwner(request);
    }
}
