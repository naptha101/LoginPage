'use client'
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
export default function VerifyEmailPage({}){
    const [token,setToken]=useState("");
    const [verified,setVerified]=useState(false);
    const [error,setError]=useState(false);
    const [id,setId]=useState("")
    const [pass,setPass]=useState({password:"",confirmPassword:""});
    const changUsePass=async ()=>{
        try{
await axios.post('api/user/changepassword',{token}).then((e)=>{
    console.log(e);

    if(e.data.status){
        setVerified(true)
      setId(e.data.id);
    }

}).catch((err)=>alert(err.message))

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
const handleUpdate=async(p)=>{
p.preventDefault();
    try{
        if(pass.password.length==0||pass.confirmPassword.length==0){
            toast("Enter all Credentials");
        }
        if(pass.password!=pass.confirmPassword){
            toast("Password not Matching");
        }
        await axios.put('api/user/updateuser',{id:id,password:pass.password}).then((e)=>{
            console.log(e);
        })

    }catch(err:any){
        throw new Error(err.message);
    }
}
useEffect(()=>{
changUsePass();
},[token])
return(
    <div className="w-full h-screen flex flex-col justify-center items-center">

<div className="p-4 bg-white text-black">
{verified?<h1>User Verified now change the password</h1>:<h1>User Not verified</h1>}
{verified&&<form onSubmit={handleUpdate}>
<h1 className="text-xl">Enter password:</h1>
<input type="text" onChange={(e)=>{setPass({...pass,password:e.target.value})}} value={pass.password}></input>
<h1 className="text-xl">Confirm password:</h1>
<input type="text" onChange={(e)=>{setPass({...pass,confirmPassword:e.target.value})}} value={pass.confirmPassword}></input>
<button type="submit">Change</button>
<input></input>
</form>}
</div>
    </div>
)

}