# Phonebook Application

A full-stack phonebook application with a React frontend and Express backend. This application allows users to manage contacts with features like adding, editing, deleting, searching, and importing/exporting contacts.

## Technology Stack

### Backend
- **Node.js + Express.js**: API server
- **TypeScript**: Type-safe development
- **Jest**: Testing framework
- **Nodemon**: Development server with hot-reload

### Frontend
- **React 19**: UI library
- **TypeScript**: Type-safe development
- **Vite**: Fast build tool and development server
- **Tailwind CSS**: Utility-first CSS framework
- **Axios**: HTTP client
- **Jest + React Testing Library**: Testing framework

## Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- npm or yarn

## Setup Instructions

### Backend Setup

1. Navigate to the backend directory:
   cd backend

2. Install dependencies:
   npm install

3. Start the development server:
   npm run dev
   The server will run on http://localhost:5000 by default.

4. For production build:
   npm run build
   npm start


### Frontend Setup

1. Navigate to the client directory:
   cd client

2. Install dependencies:
   npm install

3. Start the development server:
   npm run dev
   The client will run on http://localhost:3000 by default.

4. For production build:
   npm run build
   npm run preview


## Running Tests

### Backend Tests
cd backend
npm test         # Run all tests
npm run test:watch # Run tests in watch mode

### Frontend Tests
cd client
npm test

## API Endpoints

- `GET /` - Health check endpoint
- `GET /contacts` - Get all contacts
- `POST /contacts` - Create a new contact
- `GET /contacts/:phoneNumber` - Get contact by phone number
- `PUT /contacts/:phoneNumber` - Update existing contact
- `DELETE /contacts/:phoneNumber` - Delete a contact
- `GET /contacts/export/json` - Export contacts to JSON
- `GET /contacts/import/json` - Import contacts from JSON

## Development

For the best development experience, run both the backend and frontend in development mode simultaneously using separate terminal windows.

## Project Structure

- `/backend` - Express.js server with TypeScript
  - `/src` - Source code
    - `/controllers` - API controllers
    - `/models` - Data models
    - `/routes` - API routes
    - `/services` - Business logic
    - `/__tests__` - Test files
  - `/data` - Data storage

- `/client` - React frontend with TypeScript and Vite
  - `/src` - Source code
    - `/components` - React components
    - `/api` - API client code
    - `/__tests__` - Test files

## Environment Variables

The backend uses dotenv to manage environment variables. A `.env.default` file is provided in the backend directory. To set up your environment:

1. Copy the default file:

   cd backend
   cp .env.default .env

2. Modify the values in the `.env` file as needed for your environment.
