import mongoose from "mongoose";

const groupSchema = new mongoose.Schema(
  {
    id: { type: mongoose.Types.ObjectId },
    schoolId: { type: Number, required: true },
    groupLevel: { type: String, default: "Book 1" },
    classDates: { type: String, default: "" },
    firstClassDate: { type: Date, default: Date.now },
    lastClassDate: { type: Date, default: "" },
    teacher: { type: mongoose.Types.ObjectId, ref: "teachers" }
  },
  { versionKey: false }
);

const group = mongoose.model("groups", groupSchema);

export { group, groupSchema };
