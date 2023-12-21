import mongoose from "mongoose";

const teacherSchema = new mongoose.Schema(
  {
    id: { type: mongoose.Types.ObjectId },
    name: { type: String, required: true },
    email: { type: String, required: true },
    phoneNumber: { type: String },
    cpf: { type: String },
    dateOfBirth: { type: Date },
    address: { type: String },
  },
  { versionKey: false }
);

const teacher = mongoose.model("teachers", teacherSchema);

export { teacher, teacherSchema };
