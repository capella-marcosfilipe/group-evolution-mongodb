import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    id: { type: mongoose.Types.ObjectId },
    name: { type: String, required: true },
    cpf: { type: String, required: true },
    phoneNumber: { type: String },
    address: { type: String },
    dateOfBirth: { type: Date },
    email: { type: String },
    monthlyTuition: { type: Number },
    dueDate: { type: Number },
    group: { type: mongoose.Types.ObjectId, ref: "groups" }
  },
  { versionKey: false }
);

const student = mongoose.model("students", studentSchema);

export { student, studentSchema };
