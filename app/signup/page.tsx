"use client"
import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import {useRouter } from "next/navigation";

export default function Signup() {
    const [user, setUser] = useState({ username: "", email: "", password: "" });
    const [btnDis, setDis] = useState(true);
    //const router = typeof window !== "undefined" ? require("next/router").useRouter() : null;

    useEffect(() => {
        if (user.email.length > 0 && user.password.length > 0 && user.username.length > 0) {
            setDis(false);
        } else {
            setDis(true);
        }
    }, [user]);
  const router=useRouter();
    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const data = await axios.post('api/user/signup', user).then((e)=>{
              //  console.log(e);
              if(e.data.status){
              router.push('/profile');
              }else{
                alert(e.data.message)
              }
            })
            
        } catch (err) {
            console.error(err);
        }
    }

    return ( 
        <div className="flex flex-col w-full h-screen items-center justify-center rounded-md ">
            <div className="flex flex-col border border-2 border-white items-center rounded-md justify-center px-3 py-4">
                <h1>Signup</h1>
                <form onSubmit={handleSubmit} className="bg-black flex flex-col text-white">
                    <label htmlFor="username">Username:</label>
                    <input placeholder="Username" id="username" type="text" className="bg-transparent"  value={user.username} onChange={(e) => setUser({ ...user, username: e.target.value })} />
                    <label htmlFor="email">Email:</label>
                    <input placeholder="Email" className="bg-transparent" id="email" type="text" value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} />
                    <label htmlFor="password">Password:</label>
                    <input placeholder="Password" className="bg-transparent" id="password" type="password" value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value })} />
                    <button disabled={btnDis} onClick={handleSubmit} className="p-2 bg-green-400 rounded-md hover:scale-105">SignUp</button>
                </form>
                <h1 className="text-white text-sm">If already a user <Link href="/login" className="hover:scale-105 border-b-2">Login</Link></h1>
            </div>
        </div>
    );
}
