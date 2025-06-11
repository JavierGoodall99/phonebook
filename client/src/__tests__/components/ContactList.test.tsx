import { render, screen, waitFor, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import ContactList from '../../components/ContactList';
import api from '../../api/axios';
import contactsApi from '../../api/contacts';

jest.mock('../../api/axios');
jest.mock('../../api/contacts');
jest.mock('../../components/ContactForm', () => {
  return {
    __esModule: true,
    default: jest.fn(() => <div data-testid="mock-contact-form">Contact Form</div>)
  };
});
jest.mock('../../components/SearchBar', () => {
  return {
    __esModule: true,
    default: jest.fn(({ onSearch }) => (
      <form 
        data-testid="mock-search-bar" 
        onSubmit={(e) => {
          e.preventDefault(); 
          onSearch('test');
        }}
      >
        <button type="submit">Search</button>
      </form>
    ))
  };
});

describe('ContactList Component', () => {
  const mockContacts = [
    {
      name: 'John Doe',
      phoneNumber: '1234567890',
      emailAddress: 'john@example.com'
    },
    {
      name: 'Jane Smith',
      phoneNumber: '0987654321',
      emailAddress: 'jane@example.com'
    }
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    
    (api.get as jest.Mock).mockResolvedValue({
      data: {
        status: 'success',
        results: 2,
        data: {
          contacts: mockContacts
        }
      }
    });
    
    (contactsApi.search as jest.Mock).mockResolvedValue(mockContacts);
    (contactsApi.delete as jest.Mock).mockResolvedValue({});
  });

  test('renders loading state initially', async () => {
    await act(async () => {
      render(<ContactList />);
    });
    
    expect(screen.getByText(/contact list/i)).toBeInTheDocument();
    expect(screen.getByTestId('mock-search-bar')).toBeInTheDocument();
    
    expect(screen.queryByText(/no contacts found/i)).not.toBeInTheDocument();
  });

  test('renders contacts after loading', async () => {
    await act(async () => {
      render(<ContactList />);
    });
    
    await waitFor(() => {
      expect(api.get).toHaveBeenCalledWith('/contacts');
    });

    await waitFor(() => {
      expect(screen.getAllByText('John Doe')[0]).toBeInTheDocument();
      expect(screen.getAllByText('Jane Smith')[0]).toBeInTheDocument();
      expect(screen.getAllByText('1234567890')[0]).toBeInTheDocument();
      expect(screen.getAllByText('0987654321')[0]).toBeInTheDocument();
    });
  });

  test('registers search callback with SearchBar', async () => {
    await act(async () => {
      render(<ContactList />);
    });
    
    expect(screen.getByTestId('mock-search-bar')).toBeInTheDocument();
    
    const SearchBar = jest.requireMock('../../components/SearchBar').default;
    expect(SearchBar).toHaveBeenCalled();
    expect(SearchBar.mock.calls[0][0]).toHaveProperty('onSearch');
    expect(typeof SearchBar.mock.calls[0][0].onSearch).toBe('function');
  });

  test('shows empty state when no contacts are found', async () => {
    (api.get as jest.Mock).mockResolvedValueOnce({
      data: {
        status: 'success',
        results: 0,
        data: {
          contacts: []
        }
      }
    });
    
    await act(async () => {
      render(<ContactList />);
    });
    
    await waitFor(() => {
      expect(api.get).toHaveBeenCalledWith('/contacts');
    });
    
    expect(screen.getByText(/no contacts found/i)).toBeInTheDocument();
  });

  test('deletes a contact when delete button is clicked', async () => {
    const originalConfirm = window.confirm;
    window.confirm = jest.fn(() => true);
    
    await act(async () => {
      render(<ContactList />);
    });
    
    await waitFor(() => {
      expect(api.get).toHaveBeenCalledWith('/contacts');
      expect(document.querySelector('.animate-spin')).not.toBeInTheDocument();
    });

    const deleteButtons = await screen.findAllByText('Delete');
    await act(async () => {
      fireEvent.click(deleteButtons[0]);
    });
    
    await waitFor(() => {
      expect(contactsApi.delete).toHaveBeenCalledWith('1234567890');
    });
    
    window.confirm = originalConfirm;
  });

  test('opens the edit modal when edit button is clicked', async () => {
    await act(async () => {
      render(<ContactList />);
    });
    
    await waitFor(() => {
      expect(api.get).toHaveBeenCalledWith('/contacts');
      expect(document.querySelector('.animate-spin')).not.toBeInTheDocument();
    });

    const editButtons = await screen.findAllByText('Edit');
    await act(async () => {
      fireEvent.click(editButtons[0]);
    });
    
    await waitFor(() => {
      expect(screen.getByTestId('mock-contact-form')).toBeInTheDocument();
    });
  });

  test('refreshes contacts when refreshTrigger prop changes', async () => {
    let rerender: ReturnType<typeof render>['rerender'];
    await act(async () => {
      const renderResult = render(<ContactList refreshTrigger={0} />);
      rerender = renderResult.rerender;
    });
    
    await waitFor(() => {
      expect(api.get).toHaveBeenCalledTimes(1);
    });
    
    await act(async () => {
      rerender(<ContactList refreshTrigger={1} />);
    });
    
    await waitFor(() => {
      expect(api.get).toHaveBeenCalledTimes(2);
    });
  });
});
