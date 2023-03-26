import isLogin from "@/DB/isLogin"
import Note from "@/DB/Note"
import cookie from "cookie"


export default async function handler(req,res){

    if(req.method === "PUT"){


        try {
            let getcookie = req.headers.cookie
            let token= getcookie? cookie.parse(getcookie).authtoken:""
            let userid=isLogin(token)


            if(userid){

                let {id,title,desc} = req.body
                id+=""
                title+=""
                desc+=""

                if(!id.trim() || !title.trim() || !desc.trim() ){
                    res.status(400).json({error:'error'})
                    return
                }

                await Note.findOneAndUpdate({userid,"notes._id":id},{$set:{"notes.$.title":title,"notes.$.desc":desc}})
            }


            res.status(200).json({sucess:"ok"})
        } catch (error) {
            res.status(400).json({err:"Please provide correct info"})
        }

        

    }else{

        
        res.status(200).json({err:"invalid method"})
    }
    
    
}