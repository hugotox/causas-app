import axios from 'axios';

const MASTER_KEY = "b\'7BTL-LFzdPWy-8n5m1dhEwbOesagm_u2rlkbHLcUNIQ=\'"
const baseUrl = 'http://192.168.0.10:8000';  // casa
// const baseUrl = 'http://192.168.110.129:8000';  // kowork
// const baseUrl = 'http://ec2-54-214-141-67.us-west-2.compute.amazonaws.com';  // amazon


export const loginAsync = (rut, clave, playerId) => {
  // remove possible "." and "-" from rut
  rut = rut.replace(/\./g, '').replace(/-/g, '');
  return axios.post(`${baseUrl}/login/`, {
    rut, clave, playerId
  });
};


export const fetchNotifications = (rut, page) => {
  return axios.post(`${baseUrl}/api/notifications/`, {
    rut,
    key: MASTER_KEY,
    page
  });
}
