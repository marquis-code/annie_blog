import dbConnect from '../../database/dbConnect';
import ApprovedUser from '../../models/ApprovedUser';

dbConnect();

 export default async (req, res) => {
  const {method, body} = req;
  if(method === 'POST') {
    try {
      const {email} = body;
  
      const newUser = new ApprovedUser({email});
        
      await newUser.save();
      
      return res.status(200).json({successMessage : 'Email was successfully approved'})

    } catch (error) {
      return res.status(500).json({errorMessage : 'Internal server error!!!'})
    }
  }

}
