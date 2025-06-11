import { Request, Response } from 'express';
import { Contact } from '../models/Contact';
import { contactService } from '../services/contactService';

class ContactController {

  public getAllContacts = (req: Request, res: Response): void => {
    const contacts = contactService.getAllContacts();
    res.status(200).json({
      status: 'success',
      results: contacts.length,
      data: { contacts }
    });
  };

  public filterContacts = (req: Request, res: Response): void => {
    const { name, phone } = req.query;
    
    const nameFilter = typeof name === 'string' ? name : undefined;
    const phoneFilter = typeof phone === 'string' ? phone : undefined;
    
    const filteredContacts = contactService.filterContacts({ 
      name: nameFilter,
      phone: phoneFilter 
    });
    
    res.status(200).json({
      status: 'success',
      results: filteredContacts.length,
      data: { contacts: filteredContacts }
    });
  };

  public getContactByPhone = (req: Request, res: Response): void => {
    const phoneNumber = req.params.phoneNumber;
    const contact = contactService.getContactBy('phoneNumber', phoneNumber);

    if (!contact) {
      res.status(404).json({
        status: 'fail',
        message: 'Contact not found'
      });
      return;
    }

    res.status(200).json({
      status: 'success',
      data: { contact }
    });
  };

  public createContact = (req: Request, res: Response): void => {
    try {
      const newContact: Contact = req.body;
      
      if (!newContact.name || !newContact.phoneNumber) {
        res.status(400).json({
          status: 'fail',
          message: 'Name and phone number are required'
        });
        return;
      }
      
      const existingContact = contactService.getContactBy('phoneNumber', newContact.phoneNumber);
      if (existingContact) {
        res.status(400).json({
          status: 'fail',
          message: 'A contact with this phone number already exists'
        });
        return;
      }
        const contact = contactService.addContact(newContact);
      
      contactService.exportContacts();
      
      res.status(201).json({
        status: 'success',
        data: { contact }
      });
    } catch (error) {
      res.status(400).json({
        status: 'fail',
        message: error instanceof Error ? error.message : 'Invalid contact data'
      });
    }
  };  public updateContact = (req: Request, res: Response): void => {
    try {
      const phoneNumber = req.params.phoneNumber;
      const updatedData: Partial<Contact> = req.body;
      const existingContact = contactService.getContactBy('phoneNumber', phoneNumber);
      if (!existingContact) {
        res.status(404).json({
          status: 'fail',
          message: 'Contact not found'
        });
        return;
      }

      if (updatedData.phoneNumber && updatedData.phoneNumber !== phoneNumber) {
        const existingContactWithNewNumber = contactService.getContactBy('phoneNumber', updatedData.phoneNumber);
        if (existingContactWithNewNumber) {
          res.status(400).json({
            status: 'fail',
            message: 'A contact with this phone number already exists'
          });
          return;
        }
      }
      
      const dataToUpdate: Contact = {
        ...existingContact,
        ...updatedData
      };
      
      const updatedContact = contactService.updateContact(phoneNumber, dataToUpdate);
      
      if (!updatedContact) {
        res.status(400).json({
          status: 'fail',
          message: 'Failed to update contact'
        });
        return;
      }
      
      res.status(200).json({
        status: 'success',
        data: { contact: updatedContact }
      });
    } catch (error) {
      res.status(400).json({
        status: 'fail',
        message: error instanceof Error ? error.message : 'Error updating contact'
      });
    }
  };  public deleteContact = (req: Request, res: Response): void => {
    const phoneNumber = req.params.phoneNumber;
    
    const deleted = contactService.deleteContact(phoneNumber);
    
    if (!deleted) {
      res.status(404).json({
        status: 'fail',
        message: 'Contact not found'
      });
      return;
    }
    
    res.status(204).send();
  };

  public exportContacts = (_req: Request, res: Response): void => {
    const success = contactService.exportContacts();
    
    if (success) {
      res.status(200).json({
        status: 'success',
        message: 'Contacts exported successfully'
      });
    } else {
      res.status(500).json({
        status: 'error',
        message: 'Failed to export contacts'
      });
    }
  };

  public importContacts = (_req: Request, res: Response): void => {
    const success = contactService.importContacts();
    
    if (success) {
      res.status(200).json({
        status: 'success',
        message: 'Contacts imported successfully',
        data: { contacts: contactService.getAllContacts() }
      });
    } else {
      res.status(500).json({
        status: 'error',
        message: 'Failed to import contacts or file does not exist'
      });
    }
  };
}

export default new ContactController();
