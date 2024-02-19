import express from 'express';
const router = express.Router();
import Bird from '../models/Bird.js';

router.post('/create', async (req, res) => {
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

router.get('/', async (req, res) => {
  try {
    const birds = await Bird.find({});
    return res.status(200).json({ birds });
  } catch (err) {
    console.log(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const birdById = await Bird.findById(req.params.id);
    return res.status(200).json({ birdById });
  } catch (err) {
    console.log(err);
  }
});
router.put('/:id', async (req, res) => {
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

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Bird.findByIdAndDelete(id);
    return res.status(200).send('Bird deleted');
  } catch (err) {
    console.log(err);
  }
});

export default router;
