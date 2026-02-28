import { Schema, model } from "mongoose";

const round1QuestionSchema = new Schema({
  seaNumber: Number,
  qType: String,
  questionText: String,
  imageUrl: String,
  options: [String],
  correctAnswer: String,
  algorithmCardId: { type: Schema.Types.ObjectId, ref: "AlgorithmCard" },
  timeLimitSec: Number
});

export default model("Round1Question", round1QuestionSchema);
