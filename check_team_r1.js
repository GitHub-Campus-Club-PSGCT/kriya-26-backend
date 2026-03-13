import mongoose from "mongoose";
import dotenv from "dotenv";
import Team from "./models/Team.js";

dotenv.config();

async function check() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to DB");

    const kriyaID = "2006";
    const team = await Team.findOne({ $or: [{ kriyaID }, { kriyaID: "KRIYA" + kriyaID }] });
    
    if (team) {
      console.log("Team found:", team.kriyaID);
      console.log("Round 1 Data:", JSON.stringify(team.round1, null, 2));
    } else {
      console.log("Team 2006/KRIYA2006 NOT found");
    }

    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

check();
