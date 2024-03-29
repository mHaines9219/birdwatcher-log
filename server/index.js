import express, { json } from 'express'; // ES6 import syntax
// import { PORT, mongoDBURL } from './config/config.js';
import mongoose from 'mongoose';
import birds from './routes/birds.js';
import cors from 'cors';
import multer from 'multer';
import dotenv from 'dotenv';
import checkAuthMiddleware from './middleware/checkAuth.js';
import User from './models/User.js';
import bcrypt from 'bcryptjs';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config(); // load environment variables
const PORT = process.env.PORT || 5001;
const mongoDB_URL = process.env.MONGODB_URL;
const app = express();

app.use(express.json());

app.use(cors());

app.get('/', (req, res) => {
  console.log(req.headers);
  return res.status(234).send('Hello from the server!');
});

app.use('/birds', birds);
app.use('/uploads', express.static('uploads'));

app.post('/signup', async (req, res) => {
  try {
    // Create a new user with the data from the request body
    const newUser = await User.create(req.body);
    // Redirect the client to the desired location
    res.redirect('/');
  } catch (error) {
    // Handle errors, such as validation errors or database errors
    console.error('Error signing up:', error);
    res.status(500).send('Error signing up');
  }
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    // Find the user in the database by username
    const user = await User.findOne({ username });

    if (user) {
      // Compare the hashed password in the database with the password provided by the user
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (isPasswordValid) {
        // Passwords match, user is authenticated
        res.json('Success');
      } else {
        // Passwords do not match
        res.status(401).json('The password is incorrect');
      }
    } else {
      // User not found in the database
      res.status(404).json('No record found for the username');
    }
  } catch (error) {
    // Handle errors, such as database errors
    console.error('Error logging in:', error);
    res.status(500).json('Error logging in');
  }
});
// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/dist/index.html'));
});

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
