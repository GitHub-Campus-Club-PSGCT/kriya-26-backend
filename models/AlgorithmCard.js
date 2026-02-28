import { Schema, model } from "mongoose";

const algorithmCardSchema = new Schema({
  name: { type: String, required: true },
  description: String,
  difficultyTag: String,
  iconUrl: String,
  createdAt: { type: Date, default: Date.now }
});

export default model("AlgorithmCard", algorithmCardSchema);
