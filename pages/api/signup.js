import dbConnect from '../../database/dbConnect';
import User from '../../models/User';
import bcrypt from 'bcrypt';

dbConnect();

 export default async function handler (req, res) {
  const {method, body} = req;
  if(method === 'POST') {
    try {
      const {username, email, password} = body;

      const user = await User.findOne({email});
      if (user) {
      return res.status(400).json({ errorMessage: "User Already Exist" });
      }

      const salt = await bcrypt.genSalt(10);
      let hashedPassword = await bcrypt.hash(password, salt);

      const newUser = new User({ username, email, password:hashedPassword });
      console.log(newUser)
      
      await newUser.save();

      return res.status(201).json({ successMessage: "Registeration success, Please sign in", username});

    } catch (error) {
      return res.status(500).json({errorMessage : 'Internal server error!!!'})
    }
  }

}
