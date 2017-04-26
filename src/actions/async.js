import axios from 'axios';

// const baseUrl = 'http://192.168.0.6:8000';  // casa
const baseUrl = 'http://ec2-54-214-141-67.us-west-2.compute.amazonaws.com';  // amazon


export const loginAsync = (rut, clave, playerId) => {
  // remove possible "." and "-" from rut
  rut = rut.replace(/\./g, '').replace(/-/g, '');
  return axios.post(`${baseUrl}/login/`, {
    rut, clave, playerId
  });
};


export const fetchNotifications = (rut, clave, page) => {
  return axios.post(`${baseUrl}/api/notifications/`, {
    rut, clave, page
  });
}

export function logout(rut, playerId) {
  return axios.post(`${baseUrl}/logout/`, { rut, playerId })
}
