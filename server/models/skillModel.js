import mongoose from 'mongoose';

const skillSchema = new mongoose.Schema({
    skillname:{
        type: String,
        required: true
    },
    skilldescription:{
        type: String,
        required: true
    },
    skilllevel:{
        type: String,
        required: true
    }
});

export default mongoose.model('Skill', skillSchema);