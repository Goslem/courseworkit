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
    socialLogin(socialId, name) {
        return instance.post('user/socialLogin', { socialId, name })
    },
    me() {
        return instance.post('user/me')
    },
    logout() {
        return instance.post('user/logout')
    },
}
