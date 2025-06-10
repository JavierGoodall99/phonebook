import { contactService } from '../../services/contactService';

// Mock the contactService methods
jest.mock('../../services/contactService', () => {
  const originalModule = jest.requireActual('../../services/contactService');
  
  return {
    contactService: {
      ...originalModule.contactService,
      getAllContacts: jest.fn(),
      getContactBy: jest.fn(),
      addContact: jest.fn(),
      updateContact: jest.fn(),
      deleteContact: jest.fn(),
      filterContacts: jest.fn(),
      exportContacts: jest.fn(),
      importContacts: jest.fn(),
    }
  };
});

// Reset mocks before each test
beforeEach(() => {
  jest.resetAllMocks();
});

// Helper to setup mock responses
export const setupContactServiceMocks = {
  getAllContacts: (contacts: any[]) => {
    (contactService.getAllContacts as jest.Mock).mockReturnValue(contacts);
  },
  getContactBy: (contact: any | undefined) => {
    (contactService.getContactBy as jest.Mock).mockReturnValue(contact);
  },
  addContact: (contact: any) => {
    (contactService.addContact as jest.Mock).mockReturnValue(contact);
  },
  updateContact: (contact: any) => {
    (contactService.updateContact as jest.Mock).mockReturnValue(contact);
  },
  deleteContact: (success: boolean) => {
    (contactService.deleteContact as jest.Mock).mockReturnValue(success);
  },
  filterContacts: (contacts: any[]) => {
    (contactService.filterContacts as jest.Mock).mockReturnValue(contacts);
  },
  exportContacts: (success: boolean) => {
    (contactService.exportContacts as jest.Mock).mockReturnValue(success);
  },
  importContacts: (success: boolean) => {
    (contactService.importContacts as jest.Mock).mockReturnValue(success);
  }
};
