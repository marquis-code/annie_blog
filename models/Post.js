import mongoose from 'mongoose';

const PostSchema =  new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        required:[true, 'Post title is required']
    },
    description: {
        type: String,
        trim: true,
        required:[true, 'Post description is required']
    },
    readingTime: {
        type: Number,
        required:[true, 'Reading Time is required']
    },
    author: {
        type: String,
        trim: true,
        required:[true, 'Author is required']
    },
    tag : {
        type : [{type : String}]
     }
}, {
    timestamps : true
});

export default mongoose.models.Post || mongoose.model('Post', PostSchema);

