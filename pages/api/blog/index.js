import dbConnect from '../../../database/dbConnect';
import Post from '../../../models/Post';

dbConnect();

 export default async function handler (req, res) {
  const {method, body} = req;

  if(method === 'GET'){
    try {
      const posts = await Post.find({}).sort({createdAt : -1});
      res.status(200).json(posts);
    } catch (error) {
      res.status(500).json({errorMessage : 'Internal server error'});
    }
  }

  if(method === 'POST') {
    try {
      let {title, tag, description, readingTime, author} = body;
      tag = tag.split(", ");
      tag = tag.filter((eachTag) => eachTag.startsWith('@'))
  
      const newPost = new Post({title, tag, description, readingTime, author});

      console.log(newPost);
      await newPost.save();
      
      return res.status(200).json({successMessage : 'New Blog Post was successfully created'})

    } catch (error) {
      return res.status(500).json({errorMessage : 'Internal server error'})
    }
  }

}
