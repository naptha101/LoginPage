import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
export async function TokenEncode(request:NextRequest){
try{
const token=request.cookies.get('token')?.value||'';
const decoded=await jwt.verify(token,"secret");
return decoded.id;

}catch(err:any){
    throw new Error(err.message)
}
}