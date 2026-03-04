package com.parkease.parkease_backend.parking.controller;

import com.parkease.parkease_backend.parking.dto.ParkingLotRequest;
import com.parkease.parkease_backend.parking.dto.ParkingLotResponse;
import com.parkease.parkease_backend.parking.dto.ParkingSlotResponse;
import com.parkease.parkease_backend.parking.service.ParkingLotService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.core.Authentication;

import java.util.List;

@RestController
@RequestMapping("/api/v1/parking-lots")
@RequiredArgsConstructor
public class ParkingLotController {

    private final ParkingLotService parkingLotService;

    @PostMapping
    public ParkingLotResponse createParkingLot(
            @RequestBody ParkingLotRequest request,
            Authentication authentication) {

        return parkingLotService.createParkingLot(request, authentication);
    }

    @GetMapping
    public List<ParkingLotResponse> getAllParkingLots() {
        return parkingLotService.getAllParkingLots();
    }

    @GetMapping("/{id}")
    public ParkingLotResponse getParkingLotById(@PathVariable Long id) {
        return parkingLotService.getParkingLotById(id);
    }

    @DeleteMapping("/{id}")
    public void deleteParkingLot(
            @PathVariable Long id,
            Authentication authentication) {

        parkingLotService.deleteParkingLot(id, authentication);
    }
}