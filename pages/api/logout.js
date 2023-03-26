import cookie from "cookie";

export default function handler(req,res){


    res.setHeader("Set-Cookie",cookie.serialize("authtoken","",{maxAge:2,secure:true,httpOnly:true,path:"/"}))

    res.status(200).json({sucess:"sucess"})
}