import mongoose from "mongoose";
import dotenv from "dotenv";
import Round2Question from "./models/round2questions.js";
import AlgorithmCard from "./models/AlgorithmCard.js";

dotenv.config();

async function check() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to DB");
    
    const questions = await Round2Question.find().limit(5);
    console.log("Round2 Questions:", JSON.stringify(questions, null, 2));

    const cards = await AlgorithmCard.find().limit(5);
    console.log("Algorithm Cards:", JSON.stringify(cards, null, 2));

    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

check();
