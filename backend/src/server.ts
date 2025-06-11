import express, { Application, Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import routes from './routes';
import { contactService } from './services/contactService';

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV !== 'test') {
  contactService.importContacts();
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

app.get('/api/test', (req: Request, res: Response) => {
  res.status(200).json({ message: 'Test endpoint is working' });
});

app.use('/api', routes);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({
    status: 'error',
    message: 'Something went wrong!'
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
