import mongoose from 'mongoose';

const ApprovedUserSchema =  new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        trim: true,
        lowercase: true,
        required:[true, 'Email is required'],
        match: [
           /(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@[*[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+]*/,
           "Please provide a valid email address"
        ]
    }
}, {
    timestamps : true
});

export default mongoose.models.ApprovedUser || mongoose.model('ApprovedUser', ApprovedUserSchema);