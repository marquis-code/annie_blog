import dbConnect from '../../database/dbConnect';
import User from '../../models/User';
const crypto = require('crypto');
const nodemailer = require("nodemailer");
const nodemailerMailgun = require('nodemailer-mailgun-transport');

dbConnect();

const auth = {
    auth : {
      api_key : process.env.API_KEY,
      domain : process.env.DOMAIN
    }
  }
  
  let transporter = nodemailer.createTransport(nodemailerMailgun(auth));

export default async function handler (req, res) {
    const {method, body} = req;

    if(method === 'POST'){
        const {email} = body;
        try {
            crypto.randomBytes(32, (error, buffer) => {
                if(error) {
                  return res.status(500).json({errorMessage : 'Internal server error'})
                }
          
                const token = buffer.toString('hex');
                User.findOne({email})
                .then((user) => {
                    if(!user){
                      return res.status(404).json({errorMessage : 'User does not exist'})
                  }
                user.resetPasswordToken = token;
                user.expireToken = Date.now() + 3600000;
                user.save().then(() => {
          
                transporter.sendMail({
                  to : email,
                  from: 'Annie blog <no-reply@annieblog.com>',
                  subject: `Password reset`,
                  html: `
                  <div style="box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);  border-radius: 25px; padding: 10px">
                    <p>Hello, ${user.username}</p>
                    <p>We've recieved a request to reset the password for your Annie Blog account associated with ${email}. yeah. No changes have been made to your account yet.</p>
                    <p>You can reset your password by clicking the link below:</p
                    <a clicktracking=off href=${CLIENT_URL}/reset/${token}>Reset my password</a>
                    <hr />
                    <p>Please note that this link will expire within an hour</p>
                    <p>If you dont reset your password within an hour, you must submit a new password reset request</p>
                    <p>Sincerely</p>
                    <p style="text-align:center">Need futher assistance ? </p>
                    <p style="text-align:center">contact adminstrator @ annogwa@gmail.com</p>
                  </div>
                  `});
                  return res.status(200).json({successMessage : 'Email was sent successfully check your email'})
                })
                }).catch(() => {
                  return res.status(500).json({errorMessage : 'something went wrong, please try again.'})
                })
             });
        } catch (error) {
            return res.status(500).json({errorMessage : 'Internal server error'})
        }
    }
}