// Import required modules
import { NextApiRequest, NextApiResponse } from 'next';
import connectDb from '@/dbConfig/dbConfig';
import User from '@/models/useModel';
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { NextRequest, NextResponse } from 'next/server';

// Connect to the database
connectDb();

// Define the route handler for the POST method
export async function POST(req: NextRequest) {
    try {

        // Check if the request method is POST
     // return NextResponse.json({"hello":"world"})
            // Parse the request body
            const {email,password} = await req.json();

            // Check if the email already exists
            const existingUser = await User.findOne({email});
            if (!existingUser) {
                return NextResponse.json({ status: false, message: 'User dosent exists' });
            }

            // Create a new user
            const hashed=await bcrypt.compare(password,existingUser.password);
           
        if(hashed){
            const j=await jwt.sign({id:existingUser._id},"secret",{expiresIn:"3d"});
            const r= NextResponse.json({ status: true, message: 'User Login successfully', user: existingUser });
            r.cookies.set("token",j,{httpOnly:true});
            return r;
        }else{
            return NextResponse.json({ status: false, message: 'User cant unsuccessfully', user: existingUser });
        }
    } catch (error:any) {
        // Handle any errors
        console.error('Error registering user:', error);
        return NextResponse.json({ status: false, message: 'Internal Server Error' });
    }
}
