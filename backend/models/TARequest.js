import mongoose from 'mongoose';

const TARequestSchema = new mongoose.Schema({
  taName: String,
  taEmail: String,
  course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
  schedule: String,
  status: {
    type: String,
    enum: ['pending', 'approved', 'denied'],
    default: 'pending'
  }
});

export default mongoose.model('TARequest', TARequestSchema);
