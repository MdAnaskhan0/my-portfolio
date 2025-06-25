import mongoose from 'mongoose';

const experienceSchema = new mongoose.Schema({
    companyname:{
        type: String,
        required: true
    },
    jobtitle:{
        type: String,
        required: true
    },
    department:{
        type: String,
        required: true
    },
    startdate:{
        type: String,
        required: true
    },
    enddate:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    }
});

export default mongoose.model('Experience', experienceSchema);