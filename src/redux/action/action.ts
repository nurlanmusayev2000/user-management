import axios from 'axios';
import { Dispatch } from 'redux';

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
}

const getAllData = (data: User[]) => {
  return {
    type: "GET_ALL_DATA",
    payload: data
  };
};

// Middleware
const fetchData = () => {
  return (dispatch: Dispatch) => {
    axios
      .get('https://jsonplaceholder.typicode.com/users')
      .then(response => dispatch(getAllData(response.data)))
      .catch(error => console.error(error));
  };
};

export { fetchData, getAllData };
