import connectDB from "@/DB/connectDB"
import isLogin from "@/DB/isLogin"
import Note from "@/DB/Note"
import cookie from "cookie"
const handler = async (req,res)=>{
    

    if(req.method==="POST"){

        let getcookie = req.headers.cookie
        let token= getcookie? cookie.parse(getcookie).authtoken:""
        let userid=isLogin(token)
        if(token && userid){
            let doc = await Note.findOne({userid})
            
            let {title,desc} = req.body
            title+=""
            desc+=""

            if(!title.trim() || !desc.trim()){
                res.status(400).json({error:"error"})
                return
            }
            if(doc){
                
        await Note.findOneAndUpdate({userid},{$push:{notes:{
                    title,desc
                }}})
                
                
                
                res.status(200).json({notes:doc.notes})
                
            
                
            }else{
                
                await Note.create({userid,notes:[{title,desc}]})
                
                res.status(200).json({})
        }
        
        
    }else{
        
        res.status(200).json({error:"error"})
    }
    
    
}else{
    res.status(200).json({error:"error"})

}
}

let response = connectDB(handler)
export default response