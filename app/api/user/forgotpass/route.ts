import bcryptjs from 'bcryptjs'
import User from '@/models/useModel'
import { sendMail } from '@/helper/nodemail'
import connectDb from '@/dbConfig/dbConfig'
import { NextRequest, NextResponse } from 'next/server'
export async function POST(request:NextRequest){
    try{
      const {email}=await request.json();
      const user=await User.findOne({email:email});
      if(!user){
   return NextResponse.json({status:false,message:"User dosen't Exists"})
      }


   const data =await sendMail({email:email,emailType:"forgot",userId:user._id});
if(data){
    return NextResponse.json({status:true,message:"Verification mail Send"})
}else{
    return NextResponse.json({status:false,message:"Can't send Verification mail"})
}

    }
    catch(err:any){
         return NextResponse.json({status:false,message:err.message});
    }
}