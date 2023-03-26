import connectDB from "@/DB/connectDB"
import isLogin from "@/DB/isLogin"
import Note from "@/DB/Note"
import cookie from "cookie"
const handler = async (req,res)=>{
    

    let getcookie = req.headers.cookie
    let token= getcookie? cookie.parse(getcookie).authtoken:""
    let userid=isLogin(token)
    if(token && userid){
        let doc = await Note.findOne({userid})

        if(doc){

            res.status(200).json({notes:doc.notes})

            

        }else{


            res.status(200).json({})
        }

        
    }else{
        res.status(200).json({error:"error"})

    }


}

let response = connectDB(handler)
export default response