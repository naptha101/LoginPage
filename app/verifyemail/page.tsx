'use client'
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
export default function VerifyEmailPage({}){
    const [token,setToken]=useState("");
    const [verified,setVerified]=useState(false);
    const [error,setError]=useState(false);
    const verifyUserEmail=async ()=>{
        try{
await axios.post('api/user/verifyemail',{token}).then((e)=>{
    console.log(e);

    if(e.data.status)setVerified(true);
})

        }catch(err:any){
            setError(true);
   console.log(err.message);
        }
    }
useEffect(()=>{
const URLToken=window.location.search.split('=')[1];
if(URLToken){
    console.log(URLToken)
    setToken(URLToken);
}
},[])
useEffect(()=>{
verifyUserEmail();
},[token])
return(
    <div className="w-full h-screen flex flec-col justify-center items-center">

<div className="p-4 bg-white text-black">
{verified?<h1>Ueer Verified</h1>:<h1>User Not verified</h1>}
</div>
    </div>
)

}