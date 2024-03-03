import { NextResponse } from "next/server";


export async function GET(){
try{
   const responce=NextResponse.json({status:true,message:"User LoggedOut"});
   responce.cookies.set("token","",{httpOnly:true}); 
return responce

}catch(err:any){
   return NextResponse.json({message:err.message,status:false});
}
}