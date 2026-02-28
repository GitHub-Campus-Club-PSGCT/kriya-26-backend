import { Schema, model } from "mongoose";

const leaderboardSchema = new Schema({
  teamId: { type: Schema.Types.ObjectId, ref: "Team" },
  teamName: String,
  round1Score: Number,
  round2Score: Number,
  totalScore: Number,
  rank: Number
});

export default model("Leaderboard", leaderboardSchema);
