import connectDb from "@/dbConfig/dbConfig";
import User from "@/models/useModel";
import { NextRequest, NextResponse } from "next/server";
connectDb();
export async function POST(request:NextRequest) {
    try{
        const reqBody=await request.json()
  const {token}=reqBody;
const user=await User.findOne({verifyToken: token,
    verifyTokenExpiry: {$gt:Date.now()}});
    if(!user){
        return NextResponse.json({status:false,message:"Not Verified"});
    }  
    console.log(user);
    user.isVerified=true;
    user.verifyToken=undefined;
    user.verifyTokenExpiry=undefined;
    await user.save();
    return NextResponse.json({status:true,message:"User Verified Succesfully"})

    }
    catch(err){
  return NextResponse.json({status:false,message:"Error Occured"});
    }
}