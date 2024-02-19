import express, { json } from 'express'; // ES6 import syntax
import { PORT, mongoDBURL } from './config/config.js';
import mongoose from 'mongoose';
import birds from './routes/birds.js';
import cors from 'cors';

const app = express();

app.use(express.json());

app.use(cors());

// app.use(
//   cors({
//     origin: 'http://localhost:3000',
//     methods: 'GET,POST,PUT,DELETE',
//     allowedHeaders: 'Content-Type',
//   })
// );

app.get('/', (req, res) => {
  console.log(req.headers);
  return res.status(234).send('Hello from the server!');
});

app.use('/birds', birds);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.log('Error:', err);
  });
