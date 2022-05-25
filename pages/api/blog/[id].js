import dbConnect from '../../../database/dbConnect';
import Post from '../../../models/Post';

dbConnect();

export default async (req, res) => {
    const {method, body} = req;
    const {id} = req.query;

    if(method === 'GET') {
        try {
         const post = await Post.findById(id);
     
         if(!post) { return res.status(400).json({errorMessage : 'Post with Id was not found'})}
     
         res.status(200).json(post);
     
        } catch (error) {
          res.status(500).json({errorMessage : 'Internal server error'});
        }
       }
     
       if(method === 'PUT') {
           try {
             const post = await Post.findByIdAndUpdate(id,  {$set : body}, {new : true});
              console.log(post);
             if(!post) { return res.status(400).json({errorMessage : 'Post with Id was not found'})}
                 
              res.status(200).json({post, successMessage : 'Product was successfully Updated'});
           } catch (error) {
             res.status(500).json({errorMessage : 'Internal server error'});
           }
       }
     
       if(method === 'DELETE') {
           try {
             const post = await Post.findByIdAndDelete(id);
     
             if(!post) { return res.status(400).json({errorMessage : 'Post with Id was not found'})}
                 
             res.status(200).json({data : {}, successMessage : 'Post was successfully deleted'});
           } catch (error) {
             res.status(500).json({errorMessage : 'Internal server error'});
           }
       }
}