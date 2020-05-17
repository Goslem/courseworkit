import axios from 'axios'

const instance = axios.create({
    baseURL: '/api/'
})

export const login = (data) => {
    return instance.post('users', data)
}

// axios
//         .post('/api/users', {
//             login: 'Dmitry',
//             password: '123',
//         })
//         .then((response) => {
//             console.log(response)
//         })
//         .catch((error) => {
//             console.log(error)
//         })
