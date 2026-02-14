package com.parkease.parkease_backend.base;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "users")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @JsonProperty("name")
    private String name;

    @JsonProperty("vehicleNo")
    @Column(name = "vehicle_no", nullable = false, unique = true)
    private String vehicleNo;

    @JsonProperty("phoneNo")
    @Column(name = "phone_no", nullable = false, unique = true)
    private String phoneNo;

    @JsonProperty("email")
    @Column(nullable = false, unique = true)
    private String email;

    // Manual getters (backup for when Lombok fails)
    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getVehicleNo() {
        return vehicleNo;
    }

    public String getPhoneNo() {
        return phoneNo;
    }

    public String getEmail() {
        return email;
    }

    // Manual setters (backup for when Lombok fails)
    public void setId(Long id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setVehicleNo(String vehicleNo) {
        this.vehicleNo = vehicleNo;
    }

    public void setPhoneNo(String phoneNo) {
        this.phoneNo = phoneNo;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}