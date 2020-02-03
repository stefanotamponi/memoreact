import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://react-todo-dd33b.firebaseio.com/'
});

export default instance;