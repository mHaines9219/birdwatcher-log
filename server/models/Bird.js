import mongoose from 'mongoose';

const birdSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    scientificName: {
      type: String,
      required: false,
    },

    notes: {
      type: String,
      required: false,
    },

    imageUrl: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Bird', birdSchema);
