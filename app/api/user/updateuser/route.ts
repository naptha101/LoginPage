import bcryptjs from 'bcryptjs'
import connectDb from '@/dbConfig/dbConfig'
import { NextRequest, NextResponse } from 'next/server'
import User from '@/models/useModel';
export async function PUT(request:NextRequest) {
    try{
  const {id,password}=await request.json();
  const hashed=await bcryptjs.hash(password,10);
  const user=await User.findByIdAndUpdate(id,{password:hashed},{new:true})
  if(!user){
    return NextResponse.json({status:false,message:"Can't update Password"})
  }
  return NextResponse.json({status:true,message:"Password Updated",user:user})

    }catch(err:any){
        return NextResponse.json({status:false,message:"Error Occured"})
    }
    
}