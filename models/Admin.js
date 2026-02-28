import { Schema, model } from "mongoose";

const adminSchema = new Schema({
  username: { type: String, unique: true, required: true },
  passwordHash: { type: String, required: true }
});

export default model("Admin", adminSchema);
