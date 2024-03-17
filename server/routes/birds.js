import express from 'express';
const router = express.Router();
import Bird from '../models/Bird.js';
import multer from 'multer';
import upload from '../config/multerConfig.js';
import path from 'path';

router.post('/create', upload.single('imageUrl'), async (req, res) => {
  try {
    if (!req.body.name) {
      return res.status(400).send('All fields are required');
    }
    const newBird = {
      name: req.body.name,
      scientificName: req.body.scientificName,
      notes: req.body.notes,
      imageUrl: req.file.path,
    };
    const bird = await Bird.create(newBird);
    console.log(bird);
    return res.status(201).json({ bird });
  } catch (err) {
    console.log(err);
    return res.status(500).send('Something went wrong');
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
router.put(
  '/details/update/:id',
  upload.single('imageUrl'),
  async (req, res) => {
    try {
      if (!req.body.name) {
        return res.status(400).send('All fields are required');
      }
      const { id } = req.params;
      console.log('THIS IS THE PRE UPDATE BODY -----> ', req.body);
      const newInfo = {
        name: req.body.name,
        scientificName: req.body.scientificName,
        notes: req.body.notes,
        imageUrl: req.file ? req.file.path : undefined, // check if req.file is defined
      };
      const result = await Bird.findByIdAndUpdate(id, newInfo, { new: true }); // get the updated document
      console.log('THIS IS THE RESULT ------> ', result);
      return res.status(200).send('Bird updated');
    } catch (err) {
      console.log(err);
      return res.status(500).send('Something went wrong');
    }
  }
);

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
