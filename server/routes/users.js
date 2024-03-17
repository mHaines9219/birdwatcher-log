import express from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/User'; // Assuming your User model is in the models directory

const router = express.Router();

// Registration endpoint
router.post('/register', async (req, res) => {
  try {
    // Extract registration data from the request body
    const { username, password } = req.body;

    // Check if the username already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user instance
    const newUser = new User({
      username,
      password: hashedPassword,
    });

    // Save the user to the database
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
