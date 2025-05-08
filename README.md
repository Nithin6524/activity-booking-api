# Activity Booking API

A RESTful API for a basic activity booking application built with Node.js, Express, and MongoDB.

## Features

- User authentication (register/login) with JWT
- Public activity listings
- Activity booking for authenticated users
- User booking history
- Admin-only activity creation

## Tech Stack

- **Backend**: Node.js with Express.js
- **Database**: MongoDB
- **Authentication**: JWT Token-based auth
- **Validation**: Joi
- **Password Security**: bcrypt

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas)

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/activity-booking-api.git
   cd activity-booking-api
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the root directory with the following variables:
   ```
   PORT=3000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   JWT_EXPIRE=30d
   ```

4. Start the development server:
   ```
   npm run dev
   ```

5. (Optional) Create an admin user:
   ```
   node create-admin.js
   ```

## API Endpoints

### Authentication

- **Register User**: `POST /api/auth/register`
  - Body: `{ "username": "user", "email": "user@example.com", "password": "password123", "phone": "1234567890" }`

- **Login User**: `POST /api/auth/login`
  - Body: `{ "email": "user@example.com", "password": "password123" }`
  - Returns: JWT token

### Activities

- **List All Activities**: `GET /api/activities`
  - Public endpoint

- **Create Activity**: `POST /api/activities`
  - Admin only (requires authentication)
  - Body: `{ "title": "Event Name", "description": "Event details", "location": "Event venue", "dateTime": "2023-12-15T14:00:00.000Z" }`
  - Headers:
    Authorization: Bearer <JWT Token>

### Bookings

- **Book an Activity**: `POST /api/bookings`
  - Requires authentication
  - Body: `{ "activityId": "activity_id_here" }`
  - Headers:
    Authorization: Bearer <JWT Token>

- **Get User's Bookings**: `GET /api/bookings/my-bookings`
  - Requires authentication
  - Headers:
    Authorization: Bearer <JWT Token>

## Testing

A Postman collection is included in the repository for testing all endpoints.

## Project Structure

```
activity-booking-api/
├── src/
│   ├── config/         # Configuration files
│   ├── controllers/    # Request handlers
│   ├── middleware/     # Custom middleware
│   ├── models/         # Database models
│   ├── routes/         # API routes
│   ├── services/       # Business logic
│   └── index.js        # Entry point
├── .env                # Environment variables (create this)
├── create-admin.js     # Script to create admin user
├── package.json        # Project dependencies
└── README.md           # Project documentation
```


