import connectDb from "@/dbConfig/dbConfig";
import User from "@/models/useModel";
import { NextRequest, NextResponse } from "next/server";
connectDb();
export async function POST(request:NextRequest) {
    try{
        const reqBody=await request.json()
  const {token}=reqBody;
const user=await User.findOne({ forgotPasswordToken: token,
    forgotPasswordTokenExpiry: {$gt:Date.now()}});
    if(!user){
        return NextResponse.json({status:false,message:"Time Out"});
    }  
    console.log(user);
   // user.isVerified=true;
   user.forgotPasswordToken= undefined;
   user.forgotPasswordTokenExpiry= undefined;
    await user.save();
    return NextResponse.json({status:true,message:"User password verfied now you can change password",id:user._id})

    }
    catch(err){
  return NextResponse.json({status:false,message:"Error Occured"});
    }
}
