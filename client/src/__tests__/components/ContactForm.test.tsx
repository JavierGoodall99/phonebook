import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import ContactForm from '../../components/ContactForm';
import contactsApi from '../../api/contacts';

jest.mock('../../api/contacts', () => ({
  create: jest.fn(),
  update: jest.fn()
}));

describe('ContactForm Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders the form correctly in create mode', () => {
    render(<ContactForm />);
    
    expect(screen.getByText('Add New Contact')).toBeInTheDocument();
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/phone number/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /save contact/i })).toBeInTheDocument();
  });

  test('renders the form correctly in edit mode', () => {
    const mockContact = {
      name: 'John Doe',
      phoneNumber: '1234567890',
      emailAddress: 'john@example.com'
    };
    
    render(<ContactForm initialValues={mockContact} mode="edit" />);
    
    expect(screen.getByText('Edit Contact')).toBeInTheDocument();
    expect(screen.getByLabelText(/name/i)).toHaveValue('John Doe');
    expect(screen.getByLabelText(/phone number/i)).toHaveValue('1234567890');
    expect(screen.getByLabelText(/email address/i)).toHaveValue('john@example.com');
    expect(screen.getByRole('button', { name: /update contact/i })).toBeInTheDocument();
  });

  test('validates form fields on submission', async () => {
    render(<ContactForm />);
    
    fireEvent.click(screen.getByRole('button', { name: /save contact/i }));
    
    await waitFor(() => {
      expect(screen.getByText('Name is required')).toBeInTheDocument();
      expect(screen.getByText('Phone number is required')).toBeInTheDocument();
      expect(screen.getByText('Email address is required')).toBeInTheDocument();
    });

    expect(contactsApi.create).not.toHaveBeenCalled();
  });

  test('submits the form with valid data in create mode', async () => {
    const mockOnSuccess = jest.fn();
    
    (contactsApi.create as jest.Mock).mockResolvedValueOnce({
      name: 'Jane Doe',
      phoneNumber: '9876543210',
      emailAddress: 'jane@example.com'
    });
    
    render(<ContactForm onSuccess={mockOnSuccess} />);
    
    fireEvent.change(screen.getByLabelText(/name/i), { target: { value: 'Jane Doe' } });
    fireEvent.change(screen.getByLabelText(/phone number/i), { target: { value: '9876543210' } });
    fireEvent.change(screen.getByLabelText(/email address/i), { target: { value: 'jane@example.com' } });
    
    fireEvent.click(screen.getByRole('button', { name: /save contact/i }));
    
    await waitFor(() => {
      expect(contactsApi.create).toHaveBeenCalledWith({
        name: 'Jane Doe',
        phoneNumber: '9876543210',
        emailAddress: 'jane@example.com'
      });
      
      expect(mockOnSuccess).toHaveBeenCalled();
    });
  });

  test('submits the form with valid data in edit mode', async () => {
    const mockOnSuccess = jest.fn();
    const initialValues = {
      name: 'John Doe',
      phoneNumber: '1234567890',
      emailAddress: 'john@example.com'
    };
    
    (contactsApi.update as jest.Mock).mockResolvedValueOnce({
      name: 'John Smith',
      phoneNumber: '1234567890',
      emailAddress: 'johnsmith@example.com'
    });
    
    render(<ContactForm initialValues={initialValues} mode="edit" onSuccess={mockOnSuccess} />);
    
    fireEvent.change(screen.getByLabelText(/name/i), { target: { value: 'John Smith' } });
    fireEvent.change(screen.getByLabelText(/email address/i), { target: { value: 'johnsmith@example.com' } });
    
    fireEvent.click(screen.getByRole('button', { name: /update contact/i }));
    
    await waitFor(() => {
      expect(contactsApi.update).toHaveBeenCalledWith('1234567890', {
        name: 'John Smith',
        phoneNumber: '1234567890',
        emailAddress: 'johnsmith@example.com'
      });
      
      expect(mockOnSuccess).toHaveBeenCalled();
    });
  });

  test('calls onCancel when Cancel button is clicked', () => {
    const mockOnCancel = jest.fn();
    
    render(<ContactForm onCancel={mockOnCancel} />);
    
    fireEvent.click(screen.getByRole('button', { name: /cancel/i }));
    
    expect(mockOnCancel).toHaveBeenCalledTimes(1);
  });
});
