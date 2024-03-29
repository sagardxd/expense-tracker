import express, { Request, Response } from 'express';
import userRouter from './routes/user';

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;

app.use("/api/user", userRouter);

// Define routes
app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to Expense Tracker!');
});

app.get('/api/income', (req: Request, res: Response) => {
  res.send('You are viewing your income.');
});

app.get('/api/expenses', (req: Request, res: Response) => {
  res.send('You are viewing your expenses.');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
