# Ambulance Ordering System

This project is an Ambulance Ordering System with a secure User Registration Module.

## Project Overview

The system allows users to register and order ambulance services. It features role-based access control and secure authentication mechanisms.

### Features

- User registration and authentication
- Role-based access control (User, Paramedic, Admin)
- JWT token-based security
- Account locking after multiple failed login attempts
- Secure password storage with BCrypt encryption

## Technologies Used

### Backend
- Spring Boot 3.2.4
- Spring Security
- Spring Data JPA
- JWT for secure token-based authentication
- H2 Database (can be replaced with MySQL/PostgreSQL in production)
- Maven for dependency management

### Frontend
- React.js
- React Router for navigation
- Axios for API communication
- Bootstrap for responsive design

## Security Implementation

The system implements several security tactics:
1. **Authentication**: JWT token-based authentication mechanism
2. **Authorization**: Role-based access control for different user types
3. **Data Protection**: Password encryption with BCrypt
4. **Account Protection**: Locking mechanism after failed attempts
5. **Secure Communication**: HTTPS ready configuration
6. **Input Validation**: Server-side input validation for all user inputs

## Getting Started

### Prerequisites
- Java 17 or higher
- Node.js and npm
- Maven

### Running the Application

#### Backend
1. Navigate to the backend directory
2. Run `mvn spring-boot:run`
3. The backend server will start on http://localhost:8080

#### Frontend
1. Navigate to the frontend directory
2. Run `npm install` to install dependencies
3. Run `npm start` to start the development server
4. The frontend will start on http://localhost:3000

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Register a new user
- `POST /api/auth/signin` - Authenticate a user and get a JWT token

### Test Endpoints
- `GET /api/test/all` - Public content
- `GET /api/test/user` - User content (requires user role)
- `GET /api/test/paramedic` - Paramedic content
- `GET /api/test/admin` - Admin content

## Future Enhancements
- Add ambulance ordering functionality
- Implement real-time tracking
- Add payment integration
- Add emergency prioritization
- Implement geolocation features

## How to Use Different Roles

### Admin Role
**Login credentials:** 
- Username: `admin`
- Password: `admin123`

**Admin capabilities:**
- Access to admin dashboard via the "Admin Board" menu item
- Manage all users (view, edit, delete)
- Manage all ambulance bookings
- Change user roles (User → Paramedic → Admin)
- Configure system settings
- View statistics and reports

### Paramedic Role
**Login credentials:**
- Username: `paramedic`
- Password: `paramedic123`

**Paramedic capabilities:**
- Access to paramedic dashboard via the "Paramedic Board" menu item
- View all incoming ambulance requests
- Update booking status (Pending → In Progress → Completed)
- View detailed booking information
- Assign drivers to bookings

### Regular User
**Login credentials:**
- You can register a new account or use:
- Username: `user123`
- Password: `password123`

**User capabilities:**
- Request emergency or scheduled ambulances
- View booking history
- Update personal information 