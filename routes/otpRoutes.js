const express=require("express");
const router=express.Router();
const controller=require("../controllers/otpController");

router.post("/send-otp",controller.sendOTP);
router.post("/verify-otp",controller.verifyOTP);

module.exports=router;