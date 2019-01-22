import axios from 'axios'
import store from '@/store'

// create an axios instance
const service = axios.create({
    // baseURL: process.env.BASE_API, // api 的 base_url
    // timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use( config => {
    // Do something before request is sent
    if (store.getters.token) {
        /** adicionar token */
    }
    return config
}, error => {
    // Do something with request error
    Promise.reject(error)
})

// response interceptor
service.interceptors.response.use( response => response,
error => {
    return Promise.reject(error)
})

export default service