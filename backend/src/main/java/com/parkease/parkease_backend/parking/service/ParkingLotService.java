package com.parkease.parkease_backend.parking.service;

import com.parkease.parkease_backend.parking.dto.ParkingLotRequest;
import com.parkease.parkease_backend.parking.dto.ParkingLotResponse;
import com.parkease.parkease_backend.parking.dto.ParkingSlotRequest;
import com.parkease.parkease_backend.parking.dto.ParkingSlotResponse;
import com.parkease.parkease_backend.parking.entity.ParkingLot;
import com.parkease.parkease_backend.parking.entity.ParkingSlot;
import com.parkease.parkease_backend.parking.repository.ParkingLotRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ParkingLotService {

    private final ParkingLotRepository parkingLotRepository;

    @Transactional
    public ParkingLotResponse createParkingLot(ParkingLotRequest request) {

        ParkingLot parkingLot = ParkingLot.builder()
                .name(request.getName())
                .address(request.getAddress())
                .city(request.getCity())
                .pincode(request.getPincode())
                .build();

        List<ParkingSlot> slots = request.getSlots().stream()
                .map(slotRequest -> mapToSlotEntity(slotRequest, parkingLot))
                .toList();

        parkingLot.setSlots(slots);

        ParkingLot savedLot = parkingLotRepository.save(parkingLot);

        return mapToResponse(savedLot);
    }

    @Transactional(readOnly = true)
    public List<ParkingLotResponse> getAllParkingLots() {

        return parkingLotRepository.findAll()
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    @Transactional(readOnly = true)
    public ParkingLotResponse getParkingLotById(Long id) {

        ParkingLot lot = parkingLotRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Parking lot not found"));

        return mapToResponse(lot);
    }

    @Transactional
    public void deleteParkingLot(Long id) {
        parkingLotRepository.deleteById(id);
    }

    private ParkingSlot mapToSlotEntity(ParkingSlotRequest request,
                                        ParkingLot parkingLot) {

        return ParkingSlot.builder()
                .slotNumber(request.getSlotNumber())
                .price(request.getPrice())
                .size(request.getSize())
                .vehicleType(request.getVehicleType())
                .isAvailable(true)
                .parkingLot(parkingLot)
                .build();
    }

    private ParkingLotResponse mapToResponse(ParkingLot lot) {

        List<ParkingSlotResponse> slotResponses = lot.getSlots()
                .stream()
                .map(slot -> ParkingSlotResponse.builder()
                        .id(slot.getId())
                        .slotNumber(slot.getSlotNumber())
                        .price(slot.getPrice())
                        .size(slot.getSize())
                        .vehicleType(slot.getVehicleType())
                        .isAvailable(slot.isAvailable())
                        .build())
                .toList();

        return ParkingLotResponse.builder()
                .id(lot.getId())
                .name(lot.getName())
                .address(lot.getAddress())
                .city(lot.getCity())
                .pincode(lot.getPincode())
                .createdAt(lot.getCreatedAt())
                .slots(slotResponses)
                .build();
    }

    @Transactional(readOnly = true)
    public List<ParkingSlotResponse> getSlotsByLotId(Long lotId) {

        ParkingLot lot = parkingLotRepository.findById(lotId)
                .orElseThrow(() -> new RuntimeException("Parking lot not found"));

        return lot.getSlots()
                .stream()
                .map(slot -> ParkingSlotResponse.builder()
                        .id(slot.getId())
                        .slotNumber(slot.getSlotNumber())
                        .price(slot.getPrice())
                        .size(slot.getSize())
                        .vehicleType(slot.getVehicleType())
                        .isAvailable(slot.isAvailable())
                        .build())
                .toList();
    }
}