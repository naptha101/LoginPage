"use client"
import Link from "next/link"
import { useRouter } from "next/navigation"
import React from "react"
import axios from "axios"
import { HtmlContext } from "next/dist/server/future/route-modules/app-page/vendored/contexts/entrypoints"
export default function login(){
    const router=useRouter()
   const [user,setUser]=React.useState({email:"",password:""})
   async function HandleSubmit(e:any) {
        e.preventDefault();
        try {
            
            await axios.post('/api/user/login',user).then((e)=>{
                if(e.data.status){
                router.push('/profile');
                }else{
                  alert('Password Dosent match')
                }
              })
        }
        catch (err:any) {
            console.log(err.message)
        }
    }
    const handleForgot=async ()=>{
        try{
            await axios.post('api/user/forgotpass',{email:user.email}).then((e)=>{
                console.log(e);
            
            })

        }catch(err:any){
            console.log(err.message)
        }
    } 
   return (
        <div className="flex flex-col w-full h-screen items-center justify-center">
      <div className="flex flex-col boder border-2 px-4 py-6 rounded-lg border-white item-center justify-center">      
<h3>Login</h3>
<form onSubmit={HandleSubmit} className="bg-black flex flex-col p-2 gap-2 text-white">
   
    <label htmlFor="Email">Email:</label> 
    <input placeholder="Email" className="bg-transparent p-2 rounded-md" id="Email" type="text" value={user.email} onChange={(e)=>{setUser({...user,email:e.target.value})}}></input>
    <label htmlFor="Password">Password:</label>
    <input placeholder="Password" className="bg-transparent p-2 rounded-md" id="Password" type="password" value={user.password} onChange={(e)=>{setUser({...user,password:e.target.value})}}></input>
<button type="submit" className="p-2 rounded-md hover:scale-105 bg-green-400">Submit</button>
</form>
<h1 className="text-white text-xl">If already user <Link href={'/login'} className="border-b-2">Login</Link></h1>
<h1 onClick={()=>{handleForgot()}} className=" w-fit border-b-2">forgot Password</h1>
</div>
        </div>
    )
}