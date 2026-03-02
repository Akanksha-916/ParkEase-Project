package com.parkease.parkease_backend.parking.repository;

import com.parkease.parkease_backend.parking.entity.ParkingSlot;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ParkingSlotRepository extends JpaRepository<ParkingSlot, Long> {

    List<ParkingSlot> findByParkingLotId(Long lotId);
}