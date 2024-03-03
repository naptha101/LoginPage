"use client";
import toast from "react-hot-toast";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Profile() {
  const router = useRouter();
  const [data,SetData]=useState("");
const GetUser=async ()=>{
    try{
   await axios.get('/api/user/me').then((e)=>{
    console.log(e);
    SetData(e.data.user._id);
   })
    }
    catch(error){
        console.error(error.message);
        toast.error(error.message);
    }
}

  const handleLogout = async () => {
    try {
      await axios.get('/api/user/logout').then((response) => {
        console.log(response.data);
        toast.success(response.data.message);
        // Redirect to login page after successful logout
        router.push('/login');
      });
    } catch (error) {
      console.error(error.message);
      toast.error(error.message);
    }
  };
//   useEffect(()=>{
// GetUser()
//   },[])

  return (
    <div className="flex flex-col w-full h-screen justify-center items-center">
      <div>
        <h1>Profile Photo</h1>
        <h1>{data==""?"Nothing":<Link href={'/profile/'+data}>Go To User</Link>}</h1>
        <button className="bg-amber-600 p-4 rounded-xl" onClick={handleLogout}>Logout</button>
        <button className="bg-amber-600 p-4 rounded-xl" onClick={GetUser}>User Information</button>
      </div>
    </div>
  );
}
