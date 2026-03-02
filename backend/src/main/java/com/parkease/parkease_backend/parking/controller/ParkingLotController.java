package com.parkease.parkease_backend.parking.controller;

import com.parkease.parkease_backend.parking.dto.ParkingLotRequest;
import com.parkease.parkease_backend.parking.dto.ParkingLotResponse;
import com.parkease.parkease_backend.parking.dto.ParkingSlotResponse;
import com.parkease.parkease_backend.parking.service.ParkingLotService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/parking-lots")
@RequiredArgsConstructor
public class ParkingLotController {

    private final ParkingLotService parkingLotService;

    @PostMapping
    public ParkingLotResponse createParkingLot(@Valid @RequestBody ParkingLotRequest request) {
        return parkingLotService.createParkingLot(request);
    }

    @GetMapping
    public List<ParkingLotResponse> getAllParkingLots() {
        return parkingLotService.getAllParkingLots();
    }

    @GetMapping("/{id}")
    public ParkingLotResponse getParkingLotById(@PathVariable Long id) {
        return parkingLotService.getParkingLotById(id);
    }
    @GetMapping("/{id}/slots")
    public List<ParkingSlotResponse> getSlotsByLotId(@PathVariable Long id) {
        return parkingLotService.getSlotsByLotId(id);
    }

    @DeleteMapping("/{id}")
    public void deleteParkingLot(@PathVariable Long id) {
        parkingLotService.deleteParkingLot(id);
    }
}