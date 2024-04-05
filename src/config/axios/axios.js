import axios from 'axios';

const instance = axios.create({ 
    baseURL: import.meta.env.VITE_URL_API || 'http://localhost:8080/api/employees' 

})

export default instance;