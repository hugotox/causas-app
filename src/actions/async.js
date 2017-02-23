import axios from 'axios';

// const baseUrl = 'http://192.168.0.10:8000';
const baseUrl = 'http://192.168.110.129:8000';  // kowork


export const loginAsync = (rut, clave, playerId) => {
  // remove possible "." and "-" from rut
  rut = rut.replace(/\./g, '').replace(/-/g, '');
  return axios.post(`${baseUrl}/login/`, {
    rut, clave, playerId
  });
};
