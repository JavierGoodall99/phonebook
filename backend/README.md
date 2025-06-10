# Phonebook Express.js Server

A basic Express.js server written in TypeScript with a health-check endpoint.

## Installation

```bash
npm install
```

## Development

```bash
npm run dev
```

This will start the development server with hot-reloading using Nodemon.

## Production Build

```bash
npm run build
npm start
```

## API Endpoints

- `GET /` - Health check endpoint that returns server status
- `GET /contacts` - Get all contacts
- `POST /contacts` - Create a new contact
- `GET /contacts/:phoneNumber` - Get contact by phone number
- `PUT /contacts/:phoneNumber` - Update existing contact by phone number
- `DELETE /contacts/:phoneNumber` - Delete a contact by phone number
- `GET /contacts/export/json` - Export contacts to JSON file
- `GET /contacts/import/json` - Import contacts from JSON file
