import express from 'express';
import dotenv from 'dotenv';
import routes from '../src/routes/index';
import globalErrorHandler from './errors/error-handler';
import AppError from './errors/error';
import { connectDB } from './db';
const PORT = process.env.PORT || 7000;
dotenv.config();

const app = express();
app.use(express.json());

app.use('/api/v1', routes);
app.all('*', async (req, res, next) => {
    next(new AppError(`Cannot find ${req.originalUrl} on this server`, 404)); 
  });
app.use(globalErrorHandler); 

  app.listen(PORT, async () => {
    try {
      await connectDB();
      console.log(`Server started on port ${PORT} 🔥🔥🔥`);
    } catch (error) {
      console.error(`Error connecting to the database: ${(error as Error).message}`);
      process.exit(1); 
    }
  });