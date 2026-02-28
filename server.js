import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";

import otpRoutes from "./routes/otpRoutes.js";
import adminRoutes from "./routes/AdminRoutes.js";


dotenv.config();

const app = express();
app.use(express.json());

// Health check
app.get("/", (req, res) => {
  res.status(200).json({ message: "Server is running" });
});

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected ✅"))
  .catch((err) => console.log("MongoDB connection error ❌", err));

// Routes
app.use("/api/admin", adminRoutes);
app.use("/api/otp", otpRoutes);

// Server start
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
