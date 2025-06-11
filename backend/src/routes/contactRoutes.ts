import express, { Router } from 'express';
import contactController from '../controllers/contactController';

const router: Router = express.Router();

router.get('/', (req, res) => {
  if (req.query.name || req.query.phone) {
    return contactController.filterContacts(req, res);
  }
  return contactController.getAllContacts(req, res);
});

router.post('/', contactController.createContact);
router.get('/export/json', contactController.exportContacts);
router.get('/import/json', contactController.importContacts);
router.get('/:phoneNumber', contactController.getContactByPhone);
router.put('/:phoneNumber', contactController.updateContact);
router.delete('/:phoneNumber', contactController.deleteContact);

export default router;
