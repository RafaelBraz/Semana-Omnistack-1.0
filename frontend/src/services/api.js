import axios from 'axios';

// Cria uma conexão simples, através do axios, com a api
// disponibilizada na porta 3333 do localhost
const api = axios.create({
    baseURL: 'http://localhost:3333',
});

export default api;