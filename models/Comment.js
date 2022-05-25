import mongoose from 'mongoose';

const CommentSchema =  new mongoose.Schema({
    description: {
        type: String,
        trim: true,
        required:[true, 'Comment description is required']
    },
    date : {
        type : Date,
        default : Date.now()
    }
}, {
    timestamps : true
});

export default mongoose.models.Comment || mongoose.model('Comment', CommentSchema);