import jwt from "jsonwebtoken"




export default function(token){

    try {
        
        let decoded=  jwt.verify(token,process.env.JWT_SECRET)

        
        return decoded.id

    } catch (error) {
    
        return false
    }

    return false

}