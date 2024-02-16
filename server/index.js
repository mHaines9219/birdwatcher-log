import express, { json } from 'express'; // ES6 import syntax
import { PORT, mongoDBURL } from './config/config.js';
import mongoose from 'mongoose';
import Bird from './models/Bird.js';

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  console.log(req.headers);
  return res.status(234).send('Hello from the server!');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

app.post('/birds', async (req, res) => {
  try {
    if (!req.body.name) {
      return res.status(400).send('All fields are required');
    }
    const newBird = {
      name: req.body.name,
      scientificName: req.body.scientificName,
      habitat: req.body.habitat,
      lifeExpectancy: req.body.lifeExpectancy,
    };
    const bird = await Bird.create(newBird);
    console.log(bird);
  } catch (err) {
    console.log(err);
  }
});

app.get('/birds', async (req, res) => {
  try {
    const birds = await Bird.find({});
    return res.status(200).json({ birds });
  } catch (err) {
    console.log(err);
  }
});

app.get('/birds/:id', async (req, res) => {
  try {
    const birdById = await Bird.findById(req.params.id);
    return res.status(200).json({ birdById });
  } catch (err) {
    console.log(err);
  }
});
app.put('/birds/:id', async (req, res) => {
  try {
    if (!req.body.name) {
      return res.status(400).send('All fields are required');
    }
    const { id } = req.params;
    const result = await Bird.findByIdAndUpdate(id, req.body);
  } catch (err) {
    console.log(err);
  }
});

app.delete('/birds/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Bird.findByIdAndDelete(id);
    return res.status(200).send('Bird deleted');
  } catch (err) {
    console.log(err);
  }
});
mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.log('Error:', err);
  });
