import isLogin from "@/DB/isLogin"
import cookie from "cookie"
const handler = async (req,res)=>{
    

    let getcookie = req.headers.cookie
    let token= getcookie? cookie.parse(getcookie).authtoken:""
    let userid=isLogin(token)
    if(token && userid){
        res.status(200).json({login:true})

        
    }else{
        res.status(200).json({error:"error"})

    }


}

export default handler