import mongoose from 'mongoose';

const searchSchema = new mongoose.Schema({
  term: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

export default mongoose.model('Search', searchSchema);
