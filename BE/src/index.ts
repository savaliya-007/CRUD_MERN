import { config } from 'dotenv';
import express, { Request, Response } from 'express';


config();

const app = express();
const port = process.env.PORT;

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server related');
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
