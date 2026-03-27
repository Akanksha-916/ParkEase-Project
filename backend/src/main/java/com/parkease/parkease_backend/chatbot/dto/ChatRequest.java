package com.parkease.parkease_backend.chatbot.dto;

import com.parkease.parkease_backend.booking.dto.BookingRequest;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * DTO for sending a message to the chatbot.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ChatRequest {

    /**
     * The message text sent by the user to the chatbot.
     */
    private String message;

    private BookingRequest bookingRequest;
}