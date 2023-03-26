import isLogin from "@/DB/isLogin"
import Note from "@/DB/Note"
import cookie from "cookie"

export default async function handler(req,res){

    if(req.method === "DELETE"){

        let getcookie = req.headers.cookie
        let token= getcookie? cookie.parse(getcookie).authtoken:""
        let userid=isLogin(token)

        if(userid){
            let {id}=req.body
            id+=""
            if(!id.trim()){
                res.status(400).json({error:"error"})
                return
            }
        try {
            
            await Note.findOneAndUpdate({userid },{$pull:{notes:{_id:id}}})
        } catch (error) {
            res.status(400).json({error:"error"})
            return
        }
        }

       res.status(200).json({sucess:"ok"})
        

    }else{

        
        res.status(200).json({err:"invalid method"})
    }
    
    
}