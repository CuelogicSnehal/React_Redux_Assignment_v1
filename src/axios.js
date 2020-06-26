import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://assignment-87476.firebaseio.com/'
});

export default instance;