import mongoose from 'mongoose';

const UserSchema =  new mongoose.Schema({
    username : {
      type : String,
      unique : true,
      trim : true,
      lowercase : true,
      required:[true, 'Username is required']
    },
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
    },

    password : {
        type:String,
        required:[true, 'Password is required'],
        minlength:8,
        select: false,
        maxlength:200,
        unique:true
    },
    resetPasswordToken: {
        type: String,
        default: ''
    },
    expireToken : {
        type : Date
    },
    role : {
        type :  Number,
        default : 0
    }
}, {
    timestamps : true
});

export default mongoose.models.User || mongoose.model('User', UserSchema);