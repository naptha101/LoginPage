import nodemailer from 'nodemailer'
import User from '@/models/useModel'
import bcryptjs from 'bcryptjs'

export const sendMail= async ({email,emailType,userId}:any)=>{
try{
const hashed=await bcryptjs.hash(userId.toString(),10);
if(emailType=='verify'){
await User.findByIdAndUpdate(userId,{verifyToken:hashed ,
    verifyTokenExpiry: Date.now()+3600000})
}else if(emailType=='forgot'){
    await User.findByIdAndUpdate(userId,{ forgotPasswordToken: hashed,
        forgotPasswordTokenExpiry: Date.now()+3600000,})
}
var transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "9b2001508799df",
      pass: "17b635fb747c96"
    }
  });
  const mailoption={
    from:"yashverma2121212121@gmail.com",
    to:email,
    subject:emailType==="verify"?"Verification Mail":"Password Change Mail",
    html:`<p>Click: <a href=${emailType==='verify'?process.env.DOMAIN+"/verifyemail?="+hashed:process.env.DOMAIN+"/changepassword?="+hashed}>Here</a>
    to ${emailType==='verify'?"Verify Your Mail":"Change Password by verification"}
    </p>`
  }
  const mail=await transport.sendMail(mailoption)

return mail
}
catch(err:any){
throw new Error(err.message);
}
}