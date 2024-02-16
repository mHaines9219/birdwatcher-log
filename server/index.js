import express from 'express'; // ES6 import syntax
import { PORT, mongoDBURL } from './config/config.js';
import mongoose from 'mongoose';

const app = express();

app.get('/', (req, res) => {
  console.log(req.headers);
  return res.status(234).send('Hello from the server!');
});

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
