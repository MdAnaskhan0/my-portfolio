import mongoose from "mongoose";

const expertSchema = new mongoose.Schema({
    expartitemname:{
        type: String,
        required: true
    },
    expartitemdescription:{
        type: String,   
        required: true
    }
})
    
export default mongoose.model('Expert', expertSchema);