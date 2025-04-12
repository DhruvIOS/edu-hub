import mongoose from 'mongoose';

const ProfessorSchema = new mongoose.Schema({
  name: String,
  email: String,
  courses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }]
});

export default mongoose.model('Professor', ProfessorSchema);
