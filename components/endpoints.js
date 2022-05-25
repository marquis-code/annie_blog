import axios from 'axios';

export const Signup = async (formData) => {
    console.log(formData);
   const config = {
      headers : {
          'Content-Type' : 'application/json'
      }
  }
   const response = await axios.post('http://localhost:3000/api/signup', formData, config);
   return response;
}

export const Signin = async (formData) => {
    console.log(formData);
   const config = {
      headers : {
          'Content-Type' : 'application/json'
      }
  }
   const response = await axios.post('http://localhost:3000/api/login', formData, config);
   return response;
}

export const handleNewPost = async (formData) => {
    console.log(formData);
   const config = {
      headers : {
          'Content-Type' : 'application/json'
      }
  }
   const response = await axios.post('http://localhost:3000/api/blog', formData, config);
   return response;
}

export const handleNewlyEditedPost = async (formData, id) => {
    console.log(formData, id);
   const config = {
      headers : {
          'Content-Type' : 'application/json'
      }
  }
   const response = await axios.put(`http://localhost:3000/api/blog/${id}`, formData, config);
   return response;
}

export const handleBlogDelete = async (id) => {
   const response = await axios.delete(`http://localhost:3000/api/blog/${id}`);
   return response;
}

export const getSingleBlogPost = async (id) => {
    const response = await axios.get(`http://localhost:3000/api/blog/${id}`);
    return response;
 }

handleBlogDelete