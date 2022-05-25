import dbConnect from '../../database/dbConnect';
import User from '../../models/User';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

dbConnect();

 export default async function handler (req, res) {
  const {method, body} = req;
  if(method === 'POST') {
    try {
      const {email, password} = body;

      const user = await User.findOne({email}).select("+password");
      if(!user) {
         return res.status(404).json({ errorMessage: "Invalid Login Credentials"});
      } 
  
      const isMatchPassword = await bcrypt.compare(password, user.password);
      if(!isMatchPassword) {
         return res.status(404).json({ errorMessage: "Invalid Login Credentials"});
       } 
      
       const jwtPayload = {id : user._id}
  
      jwt.sign(jwtPayload, process.env.JWT_SECRET, {expiresIn : process.env.JWT_EXPIRE}, (err, token) => {
        if(err) {
        return res.status(400).json({ errorMessage: "Jwt Error"});
      }

      console.log(token)
  
      return res.status(200).json({token, user});
        });

    } catch (error) {
      return res.status(500).json({errorMessage : 'Internal server error!!!'})
    }
  }

}
