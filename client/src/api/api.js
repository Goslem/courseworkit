import axios from 'axios'

const instance = axios.create({
    baseURL: '/api/',
})

export const authAPI = {
    login(login, password) {
        return instance.post('user/login', { login, password })
    },
    registration(login, password) {
        return instance.post('user/registration', { login, password })
    },
    me() {
        return instance.post('user/me')
    },
    logout() {
        return instance.post('user/logout')
    },
}

