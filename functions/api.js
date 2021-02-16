import * as SecureStore from 'expo-secure-store'
import axios from 'axios';
import { Alert } from 'react-native';

// axios.defaults.baseURL = 'http://192.168.18.132:8000/api'
// const baseUrl = 'https://husyl-be.herokuapp.com/api'
// const baseUrl = 'http://192.168.18.20:8000/api'
// const baseUrl = 'http://192.168.18.29:8000/api'
const baseUrl = 'https://husyl-back.herokuapp.com/api'
// const baseUrl = 'http://192.168.0.121:8000/api'



export const setUser = async (data) => {
  await SecureStore.setItemAsync('token', data.token);
  await SecureStore.setItemAsync('user', JSON.stringify(data));
  axios.defaults.headers.common['Authorization'] = data.token;
}

export const setConfigurations = async () => {
  const token = await SecureStore.getItemAsync('token');
  axios.defaults.headers.common['Authorization'] = token;
}

setConfigurations()

export const signup = (data) => {
  return axios({
    url: `${baseUrl}/users/signup`,
    method: 'POST',
    data: data
  })
}

export const login = (data) => {
  return axios({
    url: `${baseUrl}/users/login`,
    method: 'POST',
    data: data
  })
}

export const createJob = async (data) => {
  const token = await SecureStore.getItemAsync('token')
  // Alert.alert(token)
  return axios({
    url: `${baseUrl}/jobs`,
    method: 'POST',
    data: data,
    headers: {
      "Authorization": token
    }
  })
}

export const getJobs = () => {
  return axios({
    url: `${baseUrl}/jobs`,
    method: 'GET'
  })
}

export const getJob = (id) => {
  return axios({
    url: `${baseUrl}/jobs/${id}`,
    method: 'GET'
  })
}

export const addJobGiver = (payload) => {
  return axios({
    url: `${baseUrl}/users/giver`,
    method: 'POST',
    data: payload
  })
}

export const updateJobGiver = (data) => {
  return axios({
    url: `${baseUrl}/users/giver/${data.id}`,
    method: 'POST',
    data: data.payload
  })
}

export const addJobSeeker = (payload) => {
  return axios({
    url: `${baseUrl}/users/seeker`,
    method: 'POST',
    data: payload
  })
}

export const updateJobSeeker = (data) => {
  return axios({
    url: `${baseUrl}/users/seeker/${data.id}`,
    method: 'POST',
    data: data.payload
  })
}

export const getMyJobs = () => {
  return axios({
    url: `${baseUrl}/jobs/byusers`,
    method: 'GET'
  })
}

export const createApplication = (payload) => {
  return axios({
    url: `${baseUrl}/applications`,
    method: 'POST',
    data: payload
  })
}

export const getApplication = (user, job) => {
  return axios({
    url: `${baseUrl}/applications/${user}/${job}`,
    method: 'GET'
  })
}

export const updateJobStatus = (data) => {
  return axios({
    url: `${baseUrl}/jobs/${data.id}`,
    method: 'PATCH',
    data: data.payload
  })
}

export const updateApplicationStatus = (data) => {
  return axios({
    url: `${baseUrl}/applications/status/${data.id}`,
    method: 'PATCH',
    data: data.payload
  })
}

export const getChats = () => {
  return axios({
    url: `${baseUrl}/chats`,
    method: 'GET'
  })
}
export const getMessages = (chatId) => {
  return axios({
    url: `${baseUrl}/messages/${chatId}`,
    method: 'GET'
  })
}

export const sendMessage = (payload) => {
  return axios({
    url: `${baseUrl}/messages`,
    method: 'POST',
    data: payload
  })
}

export const openJobPosting = async (payload) => {
  const token = await SecureStore.getItemAsync('token')
  return axios({
    url: `${baseUrl}/payments/openjobposting`,
    method: 'POST',
    data: payload,
    headers: {
      "Authorization": token
    }
  })
}

export const logoutOfDevice = async () => {
  await SecureStore.deleteItemAsync('token');
  await SecureStore.deleteItem('user');
  return
}
