// Import required modules
import { NextApiRequest, NextApiResponse } from 'next';
import connectDb from '@/dbConfig/dbConfig';
import User from '@/models/useModel';

import bcrypt from 'bcrypt'
import { NextRequest, NextResponse } from 'next/server';
import { sendMail } from '@/helper/nodemail';

// Connect to the database
connectDb();

// Define the route handler for the POST method
export async function POST(req: NextRequest) {
    try {

        // Check if the request method is POST
     // return NextResponse.json({"hello":"world"})
            // Parse the request body
            const {email,password,username} = await req.json();

            // Check if the email already exists
            const existingUser = await User.findOne({email});
            if (existingUser) {
                return NextResponse.json({ status: false, message: 'User already exists' });
            }

            // Create a new user
            const hashed=await bcrypt.hash(password,10);
            const newUser = new User({ username, email, password:hashed });

            // Save the new user to the database
           const saved=await newUser.save();

            await sendMail({email,emailType:"verify",userId:saved._id})
            // Return a success response
            return NextResponse.json({ status: true, message: 'User registered successfully', user: saved });
        
    } catch (error) {
        // Handle any errors
        console.error('Error registering user:', error);
        return NextResponse.json({ status: false, message: 'Internal Server Error' });
    }
}
