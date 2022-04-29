import axios from 'axios';

export const handleAdminAccess = async (formData) => {
   const config = {
      headers : {
          'Content-Type' : 'application/json'
      }
  }
   const response = await axios.post('/api/admin', formData, config);
   return response;
}