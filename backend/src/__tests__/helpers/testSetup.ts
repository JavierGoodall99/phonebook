import { contactService } from '../../services/contactService';

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

beforeEach(() => {
  jest.resetAllMocks();
});

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

describe('Test Setup', () => {
  it('should correctly mock contactService', () => {
    expect(jest.isMockFunction(contactService.getAllContacts)).toBe(true);
    expect(jest.isMockFunction(contactService.getContactBy)).toBe(true);
    expect(jest.isMockFunction(contactService.addContact)).toBe(true);
    expect(jest.isMockFunction(contactService.updateContact)).toBe(true);
    expect(jest.isMockFunction(contactService.deleteContact)).toBe(true);
  });
});
