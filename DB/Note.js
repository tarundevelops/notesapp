const mongoose = require("mongoose")



let noteSchema = new mongoose.Schema({
    userid:{
        type:String,
        required:true
    },
    notes:[{
        title:{type:String,
        required:true},
        desc:{
            type:String,
            required:true
        }
    }]

})
mongoose.models={}
export default mongoose.model("Note",noteSchema)