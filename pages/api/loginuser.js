import connectDB from "@/DB/connectDB"
import User from "@/DB/User"
import jwt from "jsonwebtoken"
import cookie from "cookie"
import bcrypt from "bcrypt"

const handler = async (req,res)=>{
    if(req.method=="POST"){

        try {
            let {email,password}= req.body

            email=(email+"").trim()
            password=(password+"").trim()

            if(!email || !password){
                res.status(400).json({error:"error"})
                return
            }




        let user=    await User.findOne({email})
    

        if(!user){

            res.status(400).json({error:"Email not found"})
            return
        }
      let passcheck= await bcrypt.compare(password,user.password)


        if(user && passcheck){
        
          let token=  jwt.sign({name:user.name,id:user._id},process.env.JWT_SECRET,{expiresIn:"1h"})
          
          res.setHeader('Set-Cookie',cookie.serialize("authtoken",token,{secure:true,httpOnly:true,path:"/"}))
          res.status(200).json({sucess:"sucess"})

        }else{
        
            res.status(200).json({err:"error "})

        }
        } catch (error) {
        
            res.status(200).json({err:"error "+error})
        }
    }else{
        res.status(200).json({err:"error"})

    }



}

let response = connectDB(handler)
export default response