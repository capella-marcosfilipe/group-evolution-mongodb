import mongoose from "mongoose";
import { validate } from "gerador-validador-cpf";

const teacherSchema = new mongoose.Schema(
  {
    id: { type: mongoose.Types.ObjectId },
    name: { type: String, required: true, maxLength: 100 },
    email: { type: String, required: true, match: /^\S+@\S+\.\S+$/  },
    phoneNumber: {
      type: String,
      required: true,
      validate: {
        validator: function (value) {
          return /^[0-9]{10,11}$/.test(value);
        },
        message: (props) =>
          `${props.value} não é um número de telefone válido! O formato deve conter apenas dígitos e ter entre 10 e 11 caracteres. / not a valid Brazilian phone number! The format must contain only digits between 10 and 11 characters.`,
      },
    },
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
    dateOfBirth: {
      type: Date,
      validate: {
        validator: function (value) {
          return value instanceof Date && !isNaN(value);
        },
        message: "Invalid date of birth",
      },
    },
    address: { type: String },
  },
  { versionKey: false }
);

const teacher = mongoose.model("teachers", teacherSchema);

export { teacher, teacherSchema };
