import dbConnect from '../../database/dbConnect';
import User from '../../models/User';
import bcrypt from 'bcrypt';

dbConnect();

export default async (req, res) => {
  const {method, body} = req;
  if(method === 'POST') {
    try {
      const {email, password} = body;
      let user = await User.findOne({email});
      if(user) {
        const salt = await bcrypt.genSalt(10);
        let hashedPassword = await bcrypt.hash(password, salt);
  
        const newUser = new User({ email, password:hashedPassword});
        
        await newUser.save();

        let jwtPayload = {
          id : user._id
        }

        jwt.sign(jwtPayload, process.env.JWT_SECRET, {expiresIn : process.env.JWT_EXPIRE}, (error, token) => {
          if(error) {
              return res.status(400).json({errorMessage : 'Jwt Error'})
          }
  
          return res.status(200).json({ 
              token,
              user : {_id,  email}
          });
  
        })
      }

      if(!user) {
        return res.status(400).json({errorMessage : 'ACCESS DENIED!!!'})
      }

    } catch (error) {
      return res.status(500).json({errorMessage : 'Internal server error!!!'})
    }
  }

}
