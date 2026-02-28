require("dotenv").config();
const express=require("express");
app=express();
app.use(express.json());
app.get("/",(req,res)=>{
    res.status(200).json({message:"Server is running"});
})
const PORT=process.env.PORT || 3000;
const mongoose=require("mongoose");
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected ✅"))
  .catch((err) => console.log("MongoDB connection error ❌", err));

const otpRoutes=require("./routes/otpRoutes");
app.use("/api/otp",otpRoutes);


app.listen(PORT,()=>{
    console.log(`Server is running at http://localhost:${PORT}`);
});