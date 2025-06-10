import { useEffect, useState } from 'react';
import api from '../api/axios';
import type { AxiosResponse } from 'axios';
import type { Contact } from '../api/contacts';
import contactsApi from '../api/contacts';
import ContactForm from './ContactForm';
import SearchBar from './SearchBar';

interface ContactsApiResponse {
  status: string;
  results: number;
  data: {
    contacts: Contact[];
  };
}

interface ContactListProps {
  refreshTrigger?: number; 
}

const ContactList = ({ refreshTrigger = 0 }: ContactListProps) => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [editingContact, setEditingContact] = useState<Contact | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);

  const fetchContacts = async () => {
    try {
      setIsLoading(true);
      const response: AxiosResponse<ContactsApiResponse> = await api.get('/contacts');
      setContacts(response.data.data.contacts);
      setError(null);
    } catch (err) {
      setError('Failed to fetch contacts. Please try again later.');
      console.error('Error fetching contacts:', err);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchContacts();
  }, [refreshTrigger]);
  const handleDelete = async (phoneNumber: string) => {
    if (window.confirm('Are you sure you want to delete this contact?')) {
      try {
        await contactsApi.delete(phoneNumber);
        // Update the contacts list after successful deletion
        setContacts(contacts.filter(contact => contact.phoneNumber !== phoneNumber));
        setError(null);
      } catch (err) {
        setError('Failed to delete contact. Please try again.');
        console.error('Error deleting contact:', err);
      }
    }
  };
  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchTerm.trim()) {
      return fetchContacts(); 
    }

    try {
      setIsLoading(true);
      const searchParam = isNaN(Number(searchTerm)) ? { name: searchTerm } : { phone: searchTerm };
      
      const contacts = await contactsApi.search(searchParam);
      setContacts(contacts);
      setError(null);
    } catch (err) {
      setError('Failed to search contacts. Please try again.');
      console.error('Error searching contacts:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (contact: Contact) => {
    setEditingContact(contact);
    setIsEditModalOpen(true);
  };

  const handleEditSuccess = () => {
    setIsEditModalOpen(false);
    setEditingContact(null);
    fetchContacts(); // Refresh the contacts list
  };

  const handleEditCancel = () => {
    setIsEditModalOpen(false);
    setEditingContact(null);
  };

  const filteredContacts = contacts.filter(contact => {
    const lowerSearchTerm = searchTerm.toLowerCase();
    return (
      contact.name.toLowerCase().includes(lowerSearchTerm) ||
      contact.phoneNumber.includes(searchTerm) ||
      (contact.emailAddress && contact.emailAddress.toLowerCase().includes(lowerSearchTerm))
    );
  });

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-semibold mb-4">Contact List</h2>
      
      <SearchBar 
        onSearch={(query) => {
          setSearchTerm(query);
          if (query.trim()) {
            handleSearch(new Event('submit') as unknown as React.FormEvent);
          } else {
            fetchContacts();
          }
        }}
        initialValue={searchTerm}
      />
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      {isLoading ? (
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <>
          {filteredContacts.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No contacts found. Add a new contact to get started!
            </div>
          )}
          
          {/* Contacts table */}
          {filteredContacts.length > 0 && (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Phone Number
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredContacts.map((contact) => (
                    <tr key={contact.phoneNumber} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {contact.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {contact.phoneNumber}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {contact.emailAddress || '-'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button 
                          className="text-blue-600 hover:text-blue-900 ml-4"
                          onClick={() => handleEdit(contact)}
                        >
                          Edit
                        </button>
                        <button 
                          className="text-red-600 hover:text-red-900 ml-4"
                          onClick={() => handleDelete(contact.phoneNumber)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          
          <div className="md:hidden mt-4">
            {filteredContacts.map((contact) => (
              <div key={contact.phoneNumber} className="border rounded-lg p-4 mb-4 shadow-sm">
                <div className="font-semibold">{contact.name}</div>
                <div className="text-gray-600 mt-1">{contact.phoneNumber}</div>
                <div className="text-gray-600 mt-1">{contact.emailAddress || '-'}</div>
                <div className="mt-3 flex justify-end">
                  <button 
                    className="text-blue-600 hover:text-blue-900 mr-4"
                    onClick={() => handleEdit(contact)}
                  >
                    Edit
                  </button>
                  <button 
                    className="text-red-600 hover:text-red-900"
                    onClick={() => handleDelete(contact.phoneNumber)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
      
      <div className="mt-6 flex justify-end">
        <button
          onClick={() => fetchContacts()}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
        >
          Refresh List
        </button>
      </div>     
      {isEditModalOpen && editingContact && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="bg-white rounded-lg overflow-hidden shadow-md max-w-sm w-full z-10">
            <div className="bg-gray-100 px-4 py-2 border-b">
              <h3 className="text-lg font-semibold">Edit Contact</h3>
            </div>
            <div className="p-4">
              <ContactForm
                initialValues={editingContact}
                onSuccess={handleEditSuccess}
                onCancel={handleEditCancel}
                mode="edit"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactList;
