# World Tour Guide API

## Overview

Backend API service for the World Tour Guide web application, providing secure endpoints for tourist destination management, user authentication, booking operations, and admin functionality.

## API Features

### Authentication Endpoints
- User registration
- User login
- Admin authentication
- Token management

### Location Endpoints
- Get all locations
- Get location by ID
- Create new location (Admin)
- Update location (Admin)
- Delete location (Admin)

### Booking Endpoints
- Create booking
- Get user bookings
- Update booking status
- Cancel booking

### Wishlist Endpoints
- Add to wishlist
- Remove from wishlist
- Get user wishlist

### Admin Endpoints
- User management
- Booking management
- Platform statistics

## Technology Stack

- **Backend Framework**: Node.js/Express, 
- **Database**: MongoDB,
- **Authentication**: JWT
- **Cloud Storage**: cloudinary


### Example Endpoints

```javascript
// Authentication
POST /auth/signup
POST /auth/login
POST /auth/admin/login
GET  /auth/verify

// User
GET /user
GET /user/:id
POST /user 
PUT /user/:id 
DELETE /user/:id 

// Locations
GET /location
GET /location/:id
POST /location/create (Admin)
PUT /location/:id (Admin)
DELETE /location/:id (Admin)

// Bookings
POST /bookings
GET /bookings/user/:userId
PUT /bookings/:id
DELETE /bookings/:id

// Wishlist
POST /wishlist
GET /wishlist/user/:userId
DELETE /wishlist/:id
