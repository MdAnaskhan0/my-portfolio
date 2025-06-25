import mongoose from 'mongoose';

const projectCategorySchema = new mongoose.Schema({
    projectcategoryname:{
        type: String,
        required: true
    }
});

export default mongoose.model('ProjectCategory', projectCategorySchema);