package com.parkease.parkease_backend.parking.repository;

import com.parkease.parkease_backend.parking.entity.ParkingLot;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ParkingLotRepository extends JpaRepository<ParkingLot, Long> {
}