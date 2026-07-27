import mongoose from 'mongoose';

const trekSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    price: { type: String, required: true },
    days: { type: String, required: true },
    rating: { type: Number, required: true, default: 0 },
    image: { type: String, required: true },
    images: [{ type: String }],
    diff: { type: String, required: true }, // Difficulty
    category: { type: String, required: true },
    description: { type: String },
    itinerary: [
      {
        day: Number,
        title: String,
        details: String,
      }
    ]
  },
  {
    timestamps: true,
  }
);

const Trek = mongoose.model('Trek', trekSchema);

export default Trek;
