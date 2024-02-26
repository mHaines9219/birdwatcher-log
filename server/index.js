import express, { json } from 'express'; // ES6 import syntax
// import { PORT, mongoDBURL } from './config/config.js';
import mongoose from 'mongoose';
import birds from './routes/birds.js';
import cors from 'cors';
import multer from 'multer';
import dotenv from 'dotenv';
dotenv.config(); // load environment variables
const PORT = process.env.PORT || 5001;
const mongoDB_URL = process.env.MONGODB_URL;
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
app.use('/uploads', express.static('uploads'));

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

mongoose
  .connect(mongoDB_URL)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.log('Error:', err);
  });
