import mongoose from 'mongoose';

const CourseSchema = new mongoose.Schema({
  name: String,
  professor: { type: String }, // store Firebase UID as string
  TAs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'TARequest' }],
  students: [{ type: String }] // can be student IDs or emails
});

export default mongoose.model('Course', CourseSchema);
