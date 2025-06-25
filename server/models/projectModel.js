import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
    projectname:{
        type: String,
        required: true
    },
    projectdescription:{
        type: String,
        required: true
    },
    projectcategoryname:{
        type: String,
        required: true
    },
    projecturl:{
        type: String,
        required: false
    },
    projectImage:{
        type: String,
        required: true
    }
});


export default mongoose.model("Project", projectSchema);