import axios from 'axios';

const api = axios.create({
    // o IP abaixo é o do computador, pode ser adquirido na página web do expo
    baseURL: 'http://192.168.0.117:3333'
});

export default api;