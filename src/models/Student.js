import mongoose from "mongoose";
import pkg from "gerador-validador-cpf";
const { validate } = pkg;

const studentSchema = new mongoose.Schema(
  {
    id: { type: mongoose.Types.ObjectId },
    name: { type: String, required: true, maxLength: [150, "The name cannot be longer than 150 characters."] },
    cpf: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: function (value) {
          return validate(value);
        },
        message: (props) =>
          `${props.value} is not a valid CPF / não é um CPF válido!`,
      },
    },
    phoneNumber: {
      type: String,
      required: true,
      validate: {
        validator: function (value) {
          return /^[0-9]{10,11}$/.test(value);
        },
        message: (props) =>
          `${props.value} não é um número de telefone válido! O formato deve conter apenas 
          dígitos e ter entre 10 e 11 caracteres. / not a valid Brazilian phone number! 
          The format must contain only digits and be between 10 and 11 characters.`,
      },
    },
    address: { type: String },
    dateOfBirth: {
      type: Date,
      validate: {
        validator: function (value) {
          return value instanceof Date && !isNaN(value);
        },
        message: "Invalid date of birth",
      },
    },
    email: { type: String, required: true, match: /^\S+@\S+\.\S+$/ },
    monthlyTuition: { type: Number },
    dueDate: { 
      type: Number, 
      min: [1, "Due date must be a number within a month."], 
      max: [31, "Due date must be a number within a month."] },
    group: { type: mongoose.Types.ObjectId, ref: "groups" },
  },
  { versionKey: false }
);

const student = mongoose.model("students", studentSchema);

export { student, studentSchema };
