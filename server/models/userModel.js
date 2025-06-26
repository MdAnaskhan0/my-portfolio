import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    phone: {
        type: String,
        required: true,
    },
    designation: {
        type: String,
        required: true,
    },
    dob: {
        type: Date,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    profilepicture: {  // lowercase here
        type: String,
        default: '',
    },
});

export default mongoose.model('User', userSchema);
