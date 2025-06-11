# React Components Tests

This directory contains Jest tests for the main React components in the phonebook application:

## Components Tests

### ContactForm Tests

Tests for the `ContactForm` component cover:

1. Rendering in create mode with empty form fields
2. Rendering in edit mode with pre-filled form fields
3. Form validation on submission
4. Successful form submission in create mode
5. Successful form submission in edit mode
6. Cancel button behavior

### SearchBar Tests

Tests for the `SearchBar` component cover:

1. Proper rendering of input and button
2. Initial value handling
3. Input value updates
4. Form submission with search callback invocation

### ContactList Tests 

Tests for the `ContactList` component cover:

1. Initial loading state
2. Rendering contacts after loading
3. Search functionality 
4. Empty state display
5. Contact deletion
6. Edit modal handling
7. Refreshing contacts when triggered

## Running Tests

To run the tests, use:

```bash
npm test
```

## Test Structure

Each test file follows a similar structure:

1. Mocking dependencies
2. Setup of test data
3. Testing rendering behavior
4. Testing interactions
5. Testing component state changes

## Test Coverage

These tests cover the main functionality of each component, including:
- Component rendering
- State management
- Event handling
- API interactions
- Form submissions
- Data display
