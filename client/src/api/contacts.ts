import api from './axios';
import type { AxiosResponse } from 'axios';

export interface Contact {
  name: string;
  phoneNumber: string; 
  emailAddress?: string;
}

interface ApiResponse<T> {
  status: string;
  results?: number;
  data: T;
  message?: string;
}

export const contactsApi = {
  getAll: async (): Promise<Contact[]> => {
    try {
      const response: AxiosResponse<ApiResponse<{ contacts: Contact[] }>> = await api.get('/contacts');
      return response.data.data.contacts;
    } catch (error) {
      console.error('Failed to fetch contacts:', error);
      throw error;
    }
  },
  getByPhone: async (phoneNumber: string): Promise<Contact> => {
    try {
      const response: AxiosResponse<ApiResponse<{ contact: Contact }>> = await api.get(`/contacts/${phoneNumber}`);
      return response.data.data.contact;
    } catch (error) {
      console.error(`Failed to fetch contact with phone number ${phoneNumber}:`, error);
      throw error;
    }
  },  create: async (contact: Contact): Promise<Contact> => {
    try {
      const response: AxiosResponse<ApiResponse<{ contact: Contact }>> = await api.post('/contacts', contact);
      return response.data.data.contact;
    } catch (error) {
      console.error('Failed to create contact:', error);
      throw error;
    }
  },

  update: async (phoneNumber: string, contact: Partial<Contact>): Promise<Contact> => {
    try {
      const response: AxiosResponse<ApiResponse<{ contact: Contact }>> = await api.put(`/contacts/${phoneNumber}`, contact);
      return response.data.data.contact;
    } catch (error) {
      console.error(`Failed to update contact with phone number ${phoneNumber}:`, error);
      throw error;
    }
  },

  delete: async (phoneNumber: string): Promise<void> => {
    try {
      await api.delete(`/contacts/${phoneNumber}`);
    } catch (error) {
      console.error(`Failed to delete contact with phone number ${phoneNumber}:`, error);
      throw error;
    }
  },
  
  search: async (params: { name?: string; phone?: string }): Promise<Contact[]> => {
    try {
      const queryParams = new URLSearchParams();
      if (params.name) queryParams.append('name', params.name);
      if (params.phone) queryParams.append('phone', params.phone);
      
      const url = `/contacts/contacts?${queryParams.toString()}`;
      const response: AxiosResponse<ApiResponse<{ contacts: Contact[] }>> = await api.get(url);
      return response.data.data.contacts;
    } catch (error) {
      console.error('Failed to search contacts:', error);
      throw error;
    }
  }
};

export default contactsApi;
