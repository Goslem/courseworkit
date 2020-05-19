import { authAPI } from '../api/api'
import { stopSubmit } from 'redux-form'

const SET_USER_DATA = 'SET_USER_DATA'

const initialState = {
    userId: null,
    login: null,
    isAuth: false,
}

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.payload,
            }
        default:
            return state
    }
}

const setUserData = (userId, login, isAuth) => ({
    type: SET_USER_DATA,
    payload: { userId, login, isAuth },
})

export const login = ({ login, password }) => (dispatch) => {
    authAPI
        .login(login, password)
        .then((response) => {
            switch (response.status) {
                case 200:
                    let { id, login } = response.data
                    dispatch(setUserData(id, login, true))
                    break
                case 204:
                    dispatch(stopSubmit('login', { _error: true }))
                    break
            }
        })
        .catch((error) => console.log(error))
}

export const registration = ({ login, password }) => (dispatch) => {
    authAPI
        .registration(login, password)
        .then((response) => {
            switch (response.status) {
                case 200:
                    let { id, login } = response.data
                    dispatch(setUserData(id, login, true))
                    break
                case 204:
                    dispatch(stopSubmit('registration', { _error: true }))
                    break
            }
        })
        .catch((error) => console.log(error))
}

export const logout = () => (dispatch) => {
    authAPI
        .logout()
        .then((response) => {
            dispatch(setUserData(null, null, false))
        })
        .catch((error) => console.log(error))
}

export const getAuthUserData = () => (dispatch) => {
    return authAPI.me().then((response) => {
        // if (response.data.resultCode === 0) {
        //     let {id, login} = response.data[0]
        //     dispatch(setUserData(id, login, true))
        // }
        console.log(response)
    })
}
