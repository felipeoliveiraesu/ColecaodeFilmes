import axios from 'axios';

// base url = // https://sujeitoprogramador.com r-api/?api=filmes/ (todos os filmes)

const api = axios.create({
baseURL: 'https://sujeitoprogramador.com'
});

export default api;