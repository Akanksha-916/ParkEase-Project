package com.parkease.parkease_backend.chatbot.controller;

import com.parkease.parkease_backend.chatbot.dto.ChatRequest;
import com.parkease.parkease_backend.chatbot.service.ChatService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/chat")
@RequiredArgsConstructor
public class ChatController {

    private final ChatService chatService;

    /**
     * Endpoint for sending a message to the chatbot
     */
    @PostMapping
    public String chat(@RequestBody ChatRequest request,
                       Authentication authentication) {
        return chatService.handleMessage(request, authentication);
    }
}