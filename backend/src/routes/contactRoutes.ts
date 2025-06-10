import express, { Router } from 'express';
import contactController from '../controllers/contactController';

const router: Router = express.Router();

router.get('/', contactController.getAllContacts);
router.post('/', contactController.createContact);
router.get('/contacts', contactController.filterContacts);
router.get('/export/json', contactController.exportContacts);
router.get('/import/json', contactController.importContacts);
router.get('/:phoneNumber', contactController.getContactByPhone);
router.put('/:phoneNumber', contactController.updateContact);
router.delete('/:phoneNumber', contactController.deleteContact);

export default router;
