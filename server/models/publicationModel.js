import mongoose from 'mongoose';

const publicationSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    authorname: {
        type: String,
        required: true
    },
    publishdate: {
        type: Date,
        required: true
    },
    publicationname: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: false,
        validate: {
            validator: function (v) {
                return !v || /^https?:\/\/.+/.test(v); // Valid URL if provided
            },
            message: props => `${props.value} is not a valid URL`
        }
    },
    description: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

export default mongoose.model('Publication', publicationSchema);
