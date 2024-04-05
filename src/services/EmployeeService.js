import axios from '../config/axios/axios';

export const createEmployee = (employee) => {
    console.log("EMPLOYEE: ", employee);
    return axios.post('/create', employee);
}

export const getEmployees = () => {
    return axios.get('/getAll');
}

export const getEmployee =  (id) => {
    return  axios.get(`/getById/${id}`);
}

export const updateEmployee =  (employee) => {
    return  axios.put('/update', employee);
}

export const deleteEmployee =  (id) => {
    return  axios.delete(`/delete/${id}`);
}