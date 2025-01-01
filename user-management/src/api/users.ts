import axios from 'axios';

const API_URL = 'http://localhost:8080/api/users'; 

export const getUsers = async () => {
  try {
    const response = await axios.get(API_URL);  
    console.log('Users fetched:', response.data);  
    return response.data;  
  } catch (error) {
    console.error('Error fetching users:', error);  
    return [];  
  }
};

export const deleteUser = async (id: number) => {
  try {
    await axios.delete(`${API_URL}/${id}`); 
    console.log(`User with ID ${id} deleted`);  
  } catch (error) {
    console.error('Error deleting user:', error);  
  }
};
