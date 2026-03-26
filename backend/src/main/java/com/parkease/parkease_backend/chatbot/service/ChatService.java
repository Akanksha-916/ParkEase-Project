package com.parkease.parkease_backend.chatbot.service;

import com.parkease.parkease_backend.booking.dto.BookingRequest;
import com.parkease.parkease_backend.booking.dto.BookingResponse;
import com.parkease.parkease_backend.booking.service.BookingService;
import com.parkease.parkease_backend.chatbot.dto.ChatRequest;
import com.parkease.parkease_backend.parking.dto.ParkingLotResponse;
import com.parkease.parkease_backend.parking.dto.ParkingSlotResponse;
import com.parkease.parkease_backend.parking.service.ParkingLotService;
import com.parkease.parkease_backend.parking.service.ParkingSlotService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import java.util.List;


@Service
@RequiredArgsConstructor
public class ChatService {

    // Injecting required services to fetch parking data
    private final ParkingLotService parkingLotService;
    private final ParkingSlotService parkingSlotService;
    private final BookingService bookingService;


    /**
     * Main method to handle all chatbot messages
     * It reads user input and decides which action to perform
     */
    public String handleMessage(ChatRequest request, Authentication authentication) {


        String msg = request.getMessage();

        //Handles empty or blank user input (e.g., "", "   ")
        if (msg == null || msg.trim().isEmpty()) {
            // This message guides the user by suggesting available commands
            return """
                    I’m sorry 😔 I couldn’t understand your request.
                    
                    Here are some things you can try:
                    - list lots  
                    - show slots <lotId>  
                    - show all slots <lotId>  
                    - book slot <slotId>  
                    - cancel slot <slotId>  
                    - parking in <city>  
                    
                    Or type 'menu' to see all available options.
                    """;
        }
        // Convert message to lowercase for easy matching
        msg = msg.toLowerCase().trim();

        // Greeting Section
        if (msg.equals("hi") || msg.equals("hello") || msg.equals("hey")) {
            return "Hello! 👋  Welcome to ParkEase 🚗 Type 'menu' to see available options.";
        }

        //MENU SECTION (Shows all available commands)
        else if (msg.contains("menu") || msg.contains("options") || msg.contains("help menu")) {
            return """
                    Welcome to ParkEase 🚗
                    
                    📝 Account:
                    1️⃣ Register → (type: 'register')  
                    2️⃣ Login → (type: 'login') – required for booking/cancelling
                    
                    📍 Parking (No login required):
                    3️⃣ To Get all List of parking lots → (type: 'list lots')  
                    4️⃣ To Fetch available slots for a specific parking lot → (type: 'show slots <lotId>')  
                    5️⃣ To Fetch both available and booked slots → (type: 'show all slots <lotId>')  
                    6️⃣ To know parkingLots near to user city → (type: 'parking in <city>')  
                    
                    🅿 Booking (🔒 Login required):
                    7️⃣ To Book a parking slot in particularLot → (type: 'book slot and give your boooking requiremets')  
                    8️⃣ To Cancel your booking → (type: 'cancel slot <slotId>')  
                    
                    💰 Pricing:
                    9️⃣ To Get price of a specific slot → (type: 'price of slot <slotId>')  
                    
                    ⏰ Info:
                    🔟 Parking timings → (type: 'timings')  
                    1️⃣1️⃣ Payment methods → (type: 'payment')  
                    1️⃣2️⃣ Support contact → (type: 'contact')  
                    
                    Example commands:
                    - show slots 1  
                    - book slot 5  
                    - parking in Hyderabad
                    
                    👉 Note: New users must register before login.  
                    👉 Login is required for booking or cancelling slots.
                    
                    Type the command to proceed!
                    """;
        }

        // Login & Registration Help
        else if (msg.contains("login") || msg.contains("how to login") || msg.contains("register")) {
            return """
                    🔐 Account Setup & Login Instructions:
                    
                    1️⃣ Register first:
                       Use this API : POST /api/v1/auth/register
                    
                       Example:
                       {
                         "name": "Your Name",
                         "email": "your_email",
                         "password": "your_password",
                         "phone_number": "your number",
                         "vehicle_number":"vehicle_number"
                       }
                    
                    2️⃣ Then login:
                       API : POST /api/v1/auth/login
                    
                       Example:
                       {
                         "email": "your_email",
                         "password": "your_password"
                       }
                    
                    3️⃣ You will receive a JWT token.
                    
                    4️⃣ Use the token in requests:
                       Authorization: Bearer <your_token>
                    
                    👉 Note: Login is required for booking and cancelling slots.
                    """;
        }


        /**
         * PARKING LOT OPERATIONS
         */

        // Fetch all parking lots
        if (msg.contains("list lots") || msg.contains("show lots")) {
            return listParkingLots();
        }

        // Fetch available slots for a specific parking lot
        else if (msg.startsWith("show slots")) {
            try {
                Long lotId = Long.parseLong(msg.split(" ")[2]); // "show slots 1"
                return showAvailableSlots(lotId);
            } catch (Exception e) {
                return "Please provide a valid parking lot ID, e.g., 'show slots 1'";
            }
        }

        // Fetch both available and booked slots
        else if (msg.startsWith("show all slots")) {
            try {
                Long lotId = Long.parseLong(msg.split(" ")[3]); // "show all slots 1"
                return showAllSlots(lotId);
            } catch (Exception e) {
                return "Please provide a valid parking lot ID, e.g., 'show all slots 1'";
            }
        }


        /**
         * Books a parking slot by marking it as inactive.
         * If already booked, prevents duplicate booking.
         */

        // BOOKING SLOT
        else if (msg.startsWith("book slot")) {
            return bookSlot(request, authentication);
        }


        /**
         * Cancels a booking by making the slot available again.
         * If the slot is already available, no action is taken.
         */

        else if (msg.startsWith("cancel slot")) {
            try {
                if (authentication == null || !authentication.isAuthenticated()) {
                    return "Please login to cancel booking.\n if you want to know how to login or register typr <register> or <login>";
                }

                Long slotId = Long.parseLong(msg.split(" ")[2]);

                return parkingSlotService.getSlotById(slotId).map(slot -> {
                    if (slot.isActive()) return "Slot already available.";
                    slot.setActive(true);
                    parkingSlotService.updateSlot(slotId, slot);
                    return "Slot " + slot.getSlotNumber() + " cancelled successfully!\n" + "\uD83D\uDC49 The slot is now available for others";
                }).orElse("Slot not found!");

            } catch (Exception e) {
                return "Invalid slot ID \n Please check your respective slot id based on your booking info by typing command <list all slots<lotid>> ";
            }
        }

        // Get price of a specific slot
        else if (msg.startsWith("price of slot")) {
            try {
                Long slotId = Long.parseLong(msg.split(" ")[3]);

                return parkingSlotService.getSlotById(slotId).map(slot -> "Price for Slot " + slot.getSlotNumber() + " is ₹" + slot.getPrice()).orElse("Slot not found!");

            } catch (Exception e) {
                return "Please provide valid slot ID, e.g., 'price of slot 3'";
            }
        }

        // Find parking lots by city
        else if (msg.contains("parking in")) {
            try {
                String[] words = msg.split(" ");
                String city = words[words.length - 1]; // take last word as city

                List<ParkingLotResponse> lots = parkingLotService.getAllParkingLots().stream().filter(lot -> lot.getCity().equalsIgnoreCase(city)).toList();

                if (lots.isEmpty()) {
                    return "No parking lots found in " + city;
                }

                StringBuilder sb = new StringBuilder("Parking lots in " + city + ":\n");
                for (ParkingLotResponse lot : lots) {
                    sb.append("ID: ").append(lot.getId()).append(", Name: ").append(lot.getName()).append(", Address: ").append(lot.getAddress()).append("\n");
                }

                return sb.toString();

            } catch (Exception e) {
                return "Please specify location like 'parking in Hyderabad'";
            }
        }



        // Parking timing information
        else if (msg.contains("time") || msg.contains("open") || msg.contains("timings")) {
            return "Parking is available 24/7.";
        }

        // Payment methods supported
        else if (msg.contains("payment") || msg.contains("pay")) {
            return "We support UPI, cards, and net banking.";
        }

        // Contact/support information
        else if (msg.contains("contact") || msg.contains("support")) {
            return "Contact us at support@parkease.com.";
        }

        // Thank you response
        else if (msg.contains("thank")) {
            return "You're welcome! 😊 Happy parking with ParkEase 🚗\nType 'menu' to explore more options.";
        }

        // Default response if command is not recognized
        return """
                Apologies 😔 I couldn't understand your request.
                
                Please try valid commands like:
                
                You can try these commands:
                - list lots  
                - show slots <lotId>  
                - show all slots <lotId>  
                - book slot <slotId>  
                - cancel slot <slotId>  
                - parking in <city>  
                
                Or type 'menu' to see all available options.
                """;
    }


    /**
     * Fetches all parking lots from the database
     * and returns a formatted string with basic details
     * like ID, name, and city.
     */
    private String listParkingLots() {
        List<ParkingLotResponse> lots = parkingLotService.getAllParkingLots();

        if (lots.isEmpty()) {
            return "No parking lots available.";
        }

        StringBuilder sb = new StringBuilder("Parking Lots:\n");
        for (ParkingLotResponse lot : lots) {
            sb.append("ID: ").append(lot.getId()).append(", Name: ").append(lot.getName()).append(", City: ").append(lot.getCity()).append("\n");
        }
        return sb.toString();
    }

    /**
     * Retrieves only available (active) slots for a given parking lot.
     * Filters slots where active = true.
     */

    private String showAvailableSlots(Long lotId) {
        try {
            // Fetch parking lot by ID
            ParkingLotResponse lotResponse = parkingLotService.getParkingLotById(lotId);

            // Filter only active (available) slots
            List<ParkingSlotResponse> availableSlots = lotResponse.getSlots().stream().filter(ParkingSlotResponse::isActive).toList();

            // If no parking lots exist
            if (availableSlots.isEmpty()) {
                return "No available slots in this parking lot.";
            }

            // Build response string
            StringBuilder sb = new StringBuilder("Available Slots:\n");
            for (ParkingSlotResponse slot : availableSlots) {
                sb.append("Slot id ").append(slot.getId()).append(" ,Slot name").append(slot.getSlotNumber()).append(", Price: ").append(slot.getPrice()).append(", Type: ").append(slot.getVehicleType()).append(", Size: ").append(slot.getSize()).append("\n");
            }
            return sb.toString();
        } catch (Exception e) {
            return "Parking lot not found.\n please view All avaible lots in my System By passing command \"list lots\" ";
        }
    }

    private String bookSlot(ChatRequest request, Authentication authentication) {

        if (authentication == null || !authentication.isAuthenticated()) {
            return "🔒 Please login to book a slot.if you want to know how to login or register typr <register> or <login>";
        }

        try {
            // Extract booking details from ChatRequest message payload
            // Assume ChatRequest has BookingRequest object inside
            BookingRequest bookingRequest = request.getBookingRequest();

            if (bookingRequest == null) {
                return "Please provide booking details in JSON format (lotId, vehicleType, startTime, endTime).";
            }

            // Call your BookingService to create booking
            BookingResponse response = bookingService.createBooking(bookingRequest);

            return "✅ Booking Successful!\n" + "Booking ID: " + response.getBookingId() + "\n" + "Parking Lot ID: " + response.getLotId() + "\n" + "Slot ID: " + response.getSlotId() + "\n" + "Slot Number: " + response.getSlotNumber() + "\n" + "Start Time: " + response.getStartTime() + "\n" + "End Time: " + response.getEndTime() + "\n" + "Status: " + response.getStatus();

        } catch (Exception e) {
            return "❌ Booking failed: " + e.getMessage() + "\n" + "Please check lot ID, slot availability, vehicle type, and date/time format (yyyy-MM-ddTHH:mm).";
        }
    }

    /**
     * Retrieves all slots for a parking lot and separates them
     * into available and booked categories.
     */

    private String showAllSlots(Long lotId) {
        try {
            ParkingLotResponse lotResponse = parkingLotService.getParkingLotById(lotId);

            // Separate available and booked slots
            List<ParkingSlotResponse> availableSlots = lotResponse.getSlots().stream().filter(ParkingSlotResponse::isActive).toList();

            List<ParkingSlotResponse> bookedSlots = lotResponse.getSlots().stream().filter(slot -> !slot.isActive()).toList();

            StringBuilder sb = new StringBuilder();
            sb.append("Slots in Parking Lot: ").append(lotResponse.getName()).append("\n");

            // Append available slots
            sb.append("\nAvailable Slots:\n");
            if (availableSlots.isEmpty()) sb.append("None\n");
            else
                availableSlots.forEach(slot -> sb.append("Slot Id ").append(slot.getId()).append(" ,Slot name").append(slot.getSlotNumber()).append(", Price: ").append(slot.getPrice()).append(", Type: ").append(slot.getVehicleType()).append("\n"));
            // Append booked slots
            sb.append("\nBooked Slots:\n");
            if (bookedSlots.isEmpty()) sb.append("None\n");
            else
                bookedSlots.forEach(slot -> sb.append("Slot Id ").append(slot.getId()).append(",Slot name ").append(slot.getSlotNumber()).append(", Price: ").append(slot.getPrice()).append(", Type: ").append(slot.getVehicleType()).append("\n"));

            return sb.toString();
        } catch (Exception e) {
            return "Parking lot not found.";
        }
    }

}



