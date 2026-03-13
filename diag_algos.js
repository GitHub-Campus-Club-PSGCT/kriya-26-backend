import mongoose from "mongoose";
import dotenv from "dotenv";
import AlgorithmCard from "./models/AlgorithmCard.js";

dotenv.config();

async function check() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to DB");

    const cards = await AlgorithmCard.find();
    console.log("Total Cards:", cards.length);
    console.log("Cards Sample:", JSON.stringify(cards.slice(0, 2), null, 2));

    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

check();
