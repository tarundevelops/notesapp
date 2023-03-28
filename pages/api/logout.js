import cookie from "cookie";

export default function handler(req,res){


    res.setHeader("Set-Cookie",cookie.serialize("authtoken","",{secure:true,httpOnly:true,path:"/"}))

    res.status(200).json({sucess:"sucess"})
}
