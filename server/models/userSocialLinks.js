import mongoose from 'mongoose';

const userSocialLinksSchema = new mongoose.Schema({
    socialmedianame:{
        type: String,
        required: true
    },
    socialmediaurl:{
        type: String,
        required: true
    }
});

export default mongoose.model('UserSocialLinks', userSocialLinksSchema);