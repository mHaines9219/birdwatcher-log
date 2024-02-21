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
      notes: req.body.notes,
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

router.get('/details/:id', async (req, res) => {
  try {
    const birdById = await Bird.findById(req.params.id);
    return res.status(200).json({ birdById });
  } catch (err) {
    console.log(err);
  }
});
router.put('/details/update/:id', async (req, res) => {
  try {
    if (!req.body.name) {
      return res.status(400).send('All fields are required');
    }
    const { id } = req.params;
    console.log(req.body);
    const result = await Bird.findByIdAndUpdate(id, req.body);
    console.log('THIS IS THE RESULT' + result);
  } catch (err) {
    console.log(err);
  }
});

router.delete('/details/delete/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Bird.findByIdAndDelete(id);
    console.log(result + 'HAS BEEN DELETED');
    return res.status(200).send('Bird deleted');
  } catch (err) {
    console.log(err);
  }
});

export default router;
