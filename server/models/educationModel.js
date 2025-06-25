import mongoose from 'mongoose';

const educationModeSchema = new mongoose.Schema({
    degreename:{
        type: String,
        required: true
    },
    majorname:{
        type: String,
        required: true
    },
    yearofpassing:{
        type: String,
        required: true
    },
    institutionname:{
        type: String,
        required: true
    },
    cgpa:{
        type: Number,
        required: true
    }
});

export default mongoose.model('EducationMode', educationModeSchema);