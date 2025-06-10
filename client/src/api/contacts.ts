import api from './axios';
import type { AxiosResponse } from 'axios';

export interface Contact {
  id: string;
  name: string;
  phoneNumber: string; 
  emailAddress?: string;
}

export const contactsApi = {
  getAll: async (): Promise<Contact[]> => {
    try {
      const response: AxiosResponse<Contact[]> = await api.get('/contacts');
      return response.data;
    } catch (error) {
      console.error('Failed to fetch contacts:', error);
      throw error;
    }
  },

  getById: async (id: string): Promise<Contact> => {
    try {
      const response: AxiosResponse<Contact> = await api.get(`/contacts/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Failed to fetch contact with id ${id}:`, error);
      throw error;
    }
  },
  create: async (contact: Omit<Contact, 'id'>): Promise<Contact> => {
    try {
      const response: AxiosResponse<Contact> = await api.post('/contacts', contact);
      return response.data;
    } catch (error) {
      console.error('Failed to create contact:', error);
      throw error;
    }
  },

  update: async (id: string, contact: Partial<Contact>): Promise<Contact> => {
    try {
      const response: AxiosResponse<Contact> = await api.put(`/contacts/${id}`, contact);
      return response.data;
    } catch (error) {
      console.error(`Failed to update contact with id ${id}:`, error);
      throw error;
    }
  },

  delete: async (id: string): Promise<void> => {
    try {
      await api.delete(`/contacts/${id}`);
    } catch (error) {
      console.error(`Failed to delete contact with id ${id}:`, error);
      throw error;
    }
  }
};

export default contactsApi;
