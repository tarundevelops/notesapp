const mongoose = require("mongoose")



export default function(handler){
    mongoose.connect(process.env.MONGODB_URI).then((d)=>{console.log("connected")})

    return handler
}
