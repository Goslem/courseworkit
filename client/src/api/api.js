import axios from 'axios'

const instance = axios.create({
    baseURL: '/api/',
})

export const authAPI = {
    login(login, password) {
        return instance.post('auth/login', { login, password })
    },
    logout() {
        return instance.post('auth/logout')
    },
    registration(login, password) {
        return instance.post('auth/registration', { login, password })
    },
    me() {
        return instance.post('auth/me')
    }
}

