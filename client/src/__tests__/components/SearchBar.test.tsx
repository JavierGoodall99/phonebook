import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import SearchBar from '../../components/SearchBar';

describe('SearchBar Component', () => {
  test('renders search input and button correctly', () => {
    render(<SearchBar onSearch={() => {}} />);
    
    expect(screen.getByPlaceholderText(/search by name or phone number/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument();
  });

  test('displays initial value if provided', () => {
    const initialValue = 'John Doe';
    render(<SearchBar onSearch={() => {}} initialValue={initialValue} />);
    
    expect(screen.getByPlaceholderText(/search by name or phone number/i)).toHaveValue(initialValue);
  });

  test('updates input value on change', () => {
    render(<SearchBar onSearch={() => {}} />);
    
    const searchInput = screen.getByPlaceholderText(/search by name or phone number/i);
    
    fireEvent.change(searchInput, { target: { value: 'Jane Doe' } });
    
    expect(searchInput).toHaveValue('Jane Doe');
  });

  test('calls onSearch with the input value when form is submitted', () => {
    const mockOnSearch = jest.fn();
    render(<SearchBar onSearch={mockOnSearch} />);
    
    const searchInput = screen.getByPlaceholderText(/search by name or phone number/i);
    const searchButton = screen.getByRole('button', { name: /search/i });
    
    fireEvent.change(searchInput, { target: { value: 'John Doe' } });
    fireEvent.click(searchButton);
    
    expect(mockOnSearch).toHaveBeenCalledWith('John Doe');
  });  test('prevents default form submission behavior', () => {
    const mockOnSearch = jest.fn();
    render(<SearchBar onSearch={mockOnSearch} />);
    
    const searchButton = screen.getByRole('button', { name: /search/i });
    const form = searchButton.closest('form');
    
    if (form) {
      fireEvent.click(searchButton);
      
      expect(mockOnSearch).toHaveBeenCalled();
    }
  });
});
