import mongoose from "mongoose";

const classRecordSchema = new mongoose.Schema(
  {
    id: { type: mongoose.Types.ObjectId },
    author: { type: mongoose.Types.ObjectId, ref: "teachers", required: true },
    group: { type: mongoose.Types.ObjectId, ref: "groups", required: true},
    date: { type: Date, default: Date.now },
    doneInClass: { type: String, required: true },
    nextClass: { type: String, default: "" },
    canceled: { type: Boolean, default: false },
  },
  { versionKey: false }
);

const classRecord = mongoose.model("classRecords", classRecordSchema);

export { classRecord, classRecordSchema };
