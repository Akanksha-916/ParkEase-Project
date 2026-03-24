#🚀🚗 ParkEase – Smart Parking Spot Finder

ParkEase is a full-stack intelligent parking system that enables users to find and reserve parking spaces in real time, while providing owners and administrators complete control over parking operations.

---

## 🌟 Project Overview

Urban parking is a major challenge due to lack of real-time information and inefficient management.
ParkEase solves this by introducing a **role-based smart system** with live slot tracking, booking, and management.

---

## 🧩 System Roles

### 👤 User

* Search parking locations
* View real-time slot availability
* Book parking slots
* Track booking history

---

### 🏢 Parking Owner

* Add and manage parking slots
* Monitor slot status (Available / Occupied)
* View user bookings
* Update slot availability dynamically

---

### 🛡️ Admin

* Manage users and owners
* Monitor system activity
* Control parking listings
* Ensure system security and data integrity

---

## ⚙️ Key Features

* 🔍 Real-time parking slot tracking
* 📅 Instant booking system
* 🔐 JWT-based authentication
* 📊 Role-based dashboards (Admin / Owner / User)
* ⚡ REST API integration
* 🧾 Booking history and management
* 🧠 Scalable backend architecture

---

## 🏗️ Tech Stack

| Layer       | Technology Used      |
| ----------- | -------------------- |
| Frontend    | React.js             |
| Backend     | Java, Spring Boot    |
| Database    | PostgreSQL           |
| API Testing | Postman, Swagger UI  |
| Tools       | Git, GitHub, VS Code |

---

## 🔄 System Workflow

1. User searches for parking
2. Frontend sends API request
3. Backend processes request using Spring Boot
4. Data is fetched from PostgreSQL database
5. Available slots are displayed
6. User books a slot
7. Booking is stored and slot status updates
8. Owner/Admin dashboards reflect changes

---

## ⚙️ Setup & Installation

### 🔽 Clone Repository

```bash id="a1x92l"
git clone https://github.com/Akanksha-916/ParkEase-Project.git
cd ParkEase-Project
```

---

### 🗄️ Database Setup (PostgreSQL)

1. Open PostgreSQL
2. Create database:

```sql id="b72kq1"
CREATE DATABASE parkease;
```

---

### 📦 Backend Setup (Spring Boot)

* Go to backend folder
* Configure `application.properties`:


* Run Spring Boot application

✅ Backend runs on:
`http://localhost:8081/parkease`

---

### 🎨 Frontend Setup (React)

```bash id="d3k9ps"
cd frontend
npm install
npm start
```

✅ Frontend runs on:
`http://localhost:5173`

---

## 🔌 API Testing

* 📮 Postman → Used for testing REST APIs
* 📄 Swagger UI → API documentation and testing

👉 Swagger URL:
`http://localhost:8081/parkease/swagger-ui/index.html`

---

## 🌍 Problem Addressed

* 🚫 Time wasted searching for parking
* 🚫 Traffic congestion
* 🚫 Lack of real-time parking data
* 🚫 Manual parking management systems

---

## 🔮 Future Enhancements

* 💳 Online payment integration
* 📍 GPS-based navigation
* 📱 Mobile application (React Native)
* 🤖 AI-based parking prediction
* 🔔 Notification system

---

## 👩‍💻 Team Members

* **Punith A** – Frontend Developer
* **Ratna Shiva Singh** – Backend Developer
* **Rajeswari Devi** – Backend Developer
* **Nilakshi Kuldhar** – Frontend Developer
* **Akanksha Devi** – Backend Developer & GitHub Owner


---

## 📌 Conclusion

ParkEase is a scalable and efficient parking solution that leverages modern technologies to improve urban mobility.
It provides a seamless experience for users, owners, and administrators while supporting the vision of smart cities.

---
