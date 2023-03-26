import connectDB from "@/DB/connectDB";
import User from "@/DB/User";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";
import cookie from "cookie";


 async function handler(req,res){

    if(req.method === "POST"){


        let {name,email,password} = req.body
        name=(name+"").trim()
        email=(email+"").trim()
        password=(password+"").trim()
        if(!name || !email || !password){

            res.status(400).json({error:"Error occured"})
            return

        }

       let hashpassword= await bcrypt.hash(password,10)


      let user= await User.create({name,email,password:hashpassword})

      let token=  jwt.sign({name:user.name,id:user._id},process.env.JWT_SECRET,{expiresIn:"1h"})
    
      res.setHeader('Set-Cookie',cookie.serialize("authtoken",token,{secure:true,httpOnly:true,path:"/"}))

       res.status(200).json({sucess:"ok"})
        

    }else{

        
        res.status(200).json({err:"invalid method"})
    }
    
    
}

let chandler = connectDB(handler)

export default chandler