import { NextRequest, NextResponse } from "next/server";
import connectDb from "@/dbConfig/dbConfig";
import { TokenEncode } from "@/helper/tokenEncode";
import User from "@/models/useModel";
connectDb();
export async function GET(request:NextRequest) {
    try{
        const tok= await TokenEncode(request)
const user= await User.findById({_id:tok}).select('-password')
return NextResponse.json({status:true,message:"User Found",user:user})

    }catch(err){
return NextResponse.json({status:false,message:"User Not Found"})
    }
}