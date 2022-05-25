import dbConnect from '../../database/dbConnect';
import User from '../../models/User';

dbConnect();

export default async (req, res) => {
    const {method, body} = req;

    if(method === 'POST') {
        try {
            const {password, token} = body;
            User.findOne({resetPasswordToken : token, expireToken : {$gt : Date.now()}}).then((user) => {
              if(!user){return res.status(400).json({errorMessage : 'Reset password link session has expired'})};
               bcrypt.hash(password, 10).then((hashedPassword) => {
               user.password = hashedPassword;
               user.resetPasswordToken = undefined;
               user.expireToken = undefined;
               user.save().then(() => {
                   return res.status(200).json({successMessage : 'Password reset was successful'})
               })
              }).catch(() => {
                  return res.status(500).json({errorMessage : 'something went wrong, please try again.'})
              })
            })
        } catch (error) {
            return res.status(500).json({errorMessage : 'something went wrong, please try again.'})
        }
    }
}