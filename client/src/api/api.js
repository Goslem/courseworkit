import axios from 'axios'

const instance = axios.create({
    baseURL: '/api/',
})

export const authAPI = {
    login(login, password) {
        return instance.post('auth/login', { login, password })
    },
    registration(login, password) {
        return instance.post('auth/registration', { login, password })
    },
    socialLogin(socialId, name) {
        return instance.post('auth/socialLogin', { socialId, name })
    },
    me() {
        return instance.post('auth/me')
    },
    logout() {
        return instance.post('auth/logout')
    },
}

export const adminAPI = {
    getUsersCount() {
        return instance.get('admin/users/count')
    },
    getUsers(offset, limit) {
        return instance.post('admin/users/get', { offset, limit })
    },
    setAdmins(ids) {
        return instance.post('admin/admins', { ids })
    },
    deleteAdmins(ids) {
        return instance.delete('admin/admins', { ids })
    },
    blockUsers(ids) {
        return instance.post('admin/users/block', { ids })
    },
    unblockUsers(ids) {
        return instance.post('admin/users/unblock', { ids })
    },
    deleteUsers(ids) {
        return instance.post('admin/users/delete', { ids })
    },
}
