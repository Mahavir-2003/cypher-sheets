// models/File.ts
import mongoose from 'mongoose';

const FileSchema = new mongoose.Schema({
  filename: String,
  fileID: String,
  fileAccessURL: String,
  uploadedBy: {
    email: String,
    role: String
  },
  canBeAccessedBy: {
    Examiner: Boolean,
    Admin: { type: Boolean, default: true },
    Invigilator: Boolean
  }
});

export default mongoose.models.File || mongoose.model('File', FileSchema);