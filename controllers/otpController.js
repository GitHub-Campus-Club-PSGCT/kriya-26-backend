const Team=require('../models/Team');
const generateOTP=require('../utils/otpGenerator');
const sendOTPEmail=require('../services/mailService');

async function sendOTP(req,res){
    const{kriyaID}=req.body;
    if(!kriyaID){
        return res.status(400).json({message:"kriyaID is required"});
    }
    try{
        const team=await Team.findOne({kriyaID});
        if(!team){
            return res.status(404).json({message:"Team not found"});
        }
        const otp=generateOTP();
        const expiesAt=new Date(Date.now()+60*60*1000);

        team.otp=otp;
        team.otpExpiry=expiesAt;
        await team.save();

        await sendOTPEmail(team.regMail,otp);
        res.status(200).json({message:"OTP sent to registered email"});
    }
    catch(error){
        console.error("Error in sendOTP:",error);
        res.status(500).json({message:"Internal server error"});
    }
}

async function verifyOTP(req,res){
    const{kriyaID,otp}=req.body;
    if(!kriyaID || !otp){
        return res.status(400).json({message:"kriyaID and otp are required"});
    }
    try{
        const team=await Team.findOne({kriyaID});
        if(!team){
            return res.status(404).json({message:"Team not found"});
        }
        if(!team.otp){
            return res.status(400).json({message:"No OTP generated for this team"});
        }

        //Check expiry
        if(team.otpExpiry < new Date()){
            return res.status(400).json({message:"OTP has expired"});
        }

        //Check OTP match
        if(team.otp !== otp){
            return res.status(400).json({message:"Invalid OTP"});
        }

        //OTP is valid, clear it from DB
        team.otp=null;
        team.otpExpiry=null;
        await team.save();

        res.status(200).json({message:"OTP verified successfully"});
    }
    catch(error){
        console.error("Error in verifyOTP:",error);
        res.status(500).json({message:"OTP verification failed"});
    }
}

module.exports={sendOTP,verifyOTP};
