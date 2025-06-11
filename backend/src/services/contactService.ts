import { Contact } from '../models/Contact';
import fs from 'fs';
import path from 'path';

class ContactService {
  private contacts: Contact[] = [];
  private readonly dataFilePath: string;

  constructor() {
    this.contacts = [];
    this.dataFilePath = path.join(__dirname, '../../data/contacts.json');
  }

  public getAllContacts(): Contact[] {
    return this.contacts;
  }

  public getContactBy(property: keyof Contact, value: string): Contact | undefined {
    return this.contacts.find(contact => contact[property] === value);
  }
  public addContact(contact: Contact): Contact {
    this.contacts.push(contact);
    return contact;
  } 
  public updateContact(phoneNumber: string, updatedContact: Contact): Contact | null {
    const index = this.contacts.findIndex(c => c.phoneNumber === phoneNumber);
    
    if (index !== -1) {
      if (updatedContact.phoneNumber && updatedContact.phoneNumber !== phoneNumber) {
        const existingContactWithNewNumber = this.contacts.find(c => c.phoneNumber === updatedContact.phoneNumber);
        if (existingContactWithNewNumber) {
          return null;
        }
      }
      
      this.contacts[index] = {
        ...this.contacts[index],
        ...updatedContact
      };
      
      this.exportContacts();
      
      return this.contacts[index];
    }
    
    return null;
  }

  public deleteContact(phoneNumber: string): boolean {
    const initialLength = this.contacts.length;
    this.contacts = this.contacts.filter(c => c.phoneNumber !== phoneNumber);
    
    const deleted = this.contacts.length < initialLength;
    if (deleted) {
      this.exportContacts();
    }
    
    return deleted;
  }

  public filterContacts(query: { name?: string; phone?: string }): Contact[] {
    return this.contacts.filter(contact => {
      if (!query.name && !query.phone) {
        return true;
      }
      
      const nameMatch = !query.name || contact.name.toLowerCase().includes(query.name.toLowerCase());
      
      const phoneMatch = !query.phone || contact.phoneNumber.includes(query.phone);
      
      return nameMatch && phoneMatch;
    });
  }

  public exportContacts(): boolean {
    try {
      const dir = path.dirname(this.dataFilePath);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      
      fs.writeFileSync(
        this.dataFilePath, 
        JSON.stringify(this.contacts, null, 2), 
        'utf8'
      );
      return true;
    } catch (error) {
      console.error('Error exporting contacts:', error);
      return false;
    }
  }

  public importContacts(): boolean {
    try {
      if (fs.existsSync(this.dataFilePath)) {
        const data = fs.readFileSync(this.dataFilePath, 'utf8');
        this.contacts = JSON.parse(data) as Contact[];
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error importing contacts:', error);
      return false;
    }
  }
}

export const contactService = new ContactService();
