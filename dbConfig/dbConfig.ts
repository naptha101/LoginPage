import mongoose from "mongoose";
export default async function connectDb(){
    try{
await mongoose.connect(process.env.DB_URL!).then(()=>{
    console.log("Connected");
}).catch((err)=>{
    console.log(err)
})

    }
    catch(err){
        console.log(err);
    }
}