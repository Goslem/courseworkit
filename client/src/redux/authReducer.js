import { authAPI } from '../api/api'
import { stopSubmit } from 'redux-form'

const SET_USER_DATA = 'SET_USER_DATA'
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING'

const initialState = {
    userId: null,
    name: null,
    isAuth: false,
    isAdmin: false,
    isFetching: false,
}

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.payload,
            }
        case TOGGLE_IS_FETCHING:
            return {
                ...state,
                isFetching: action.isFetching,
            }
        default:
            return state
    }
}

const setUserData = (userId, name, isAuth, isAdmin) => ({
    type: SET_USER_DATA,
    payload: { userId, name, isAuth, isAdmin },
})

const toggleIsFetching = (isFetching) => ({
    type: TOGGLE_IS_FETCHING,
    isFetching,
})

export const login = ({ login, password }) => (dispatch) => {
    dispatch(toggleIsFetching(true))
    authAPI
        .login(login, password)
        .then((response) => {
            dispatch(toggleIsFetching(false))
            switch (response.data.statusCode) {
                case 200:
                    let { id, name, isAdmin } = response.data.data
                    dispatch(setUserData(id, name, true, isAdmin))
                    break
                case 204:
                    dispatch(stopSubmit('login', { _error: 204 }))
                    break
                case 403:
                    dispatch(stopSubmit('login', { _error: 403 }))
                    break
                default:
                    dispatch(stopSubmit('login', { _error: 500 }))
            }
        })
        .catch((error) => {
            dispatch(stopSubmit('login', { _error: 500 }))
        })
}

export const registration = ({ login, password }) => (dispatch) => {
    dispatch(toggleIsFetching(true))
    authAPI
        .registration(login, password)
        .then((response) => {
            dispatch(toggleIsFetching(false))
            switch (response.data.statusCode) {
                case 200:
                    let { id, name, isAdmin } = response.data.data
                    dispatch(setUserData(id, name, true, isAdmin))
                    break
                case 204:
                    dispatch(stopSubmit('registration', { _error: 204 }))
                    break
                default:
                    dispatch(stopSubmit('registration', { _error: 500 }))
            }
        })
        .catch((error) => {
            dispatch(stopSubmit('registration', { _error: 500 }))
        })
}

export const socialLogin = (socialId, name) => (dispatch) => {
    dispatch(toggleIsFetching(true))
    authAPI
        .socialLogin(socialId, name)
        .then((response) => {
            dispatch(toggleIsFetching(false))
            switch (response.data.statusCode) {
                case 200:
                    let { id, name, isAdmin } = response.data.data
                    dispatch(setUserData(id, name, true, isAdmin))
                    break
                case 403:
                    dispatch(stopSubmit('login', { _error: 403 }))
                    break
                default:
                    dispatch(stopSubmit('login', { _error: 500 }))
            }
        })
        .catch((error) => {
            dispatch(stopSubmit('login', { _error: 500 }))
        })
}

export const getAuthUserData = () => (dispatch) => {
    return authAPI.me().then((response) => {
        if (response.data.statusCode === 200) {
            let { id, name, isAdmin } = response.data.data
            dispatch(setUserData(id, name, true, isAdmin))
        }
    })
}

export const logout = () => (dispatch) => {
    authAPI
        .logout()
        .then((response) => {
            dispatch(setUserData(null, null, false))
        })
        .catch((error) => console.log(error))
}
