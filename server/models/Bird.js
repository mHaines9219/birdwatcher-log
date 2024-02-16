import mongoose from 'mongoose';

const birdSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    scientificName: {
      type: String,
      required: true,
    },
    habitat: {
      type: String,
      required: false,
    },
    lifeExpectancy: {
      type: Number,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Bird', birdSchema);
