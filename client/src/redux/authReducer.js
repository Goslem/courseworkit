import { authAPI } from '../api/api'

const SET_USER_DATA = '/auth/SET_USER_DATA'
const TOGGLE_IS_FETCHING = '/auth/TOGGLE_IS_FETCHING'
const TOGGLE_LOGIN_STATUS = '/auth/TOGGLE_LOGIN_STATUS'
const TOGGLE_REGISTRATION_STATUS = '/auth/TOGGLE_REGISTRATION_STATUS'

const initialState = {
    userId: null,
    isAuth: false,
    isAdmin: false,
    isFetching: false,
    loginStatusCode: 0,
    registrationStatusCode: 0,
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
        case TOGGLE_LOGIN_STATUS:
            return {
                ...state,
                loginStatusCode: action.loginStatusCode,
            }
        case TOGGLE_REGISTRATION_STATUS:
            return {
                ...state,
                registrationStatusCode: action.registrationStatusCode,
            }
        default:
            return state
    }
}

const setUserData = (userId, isAuth, isAdmin) => ({
    type: SET_USER_DATA,
    payload: { userId, isAuth, isAdmin },
})

const toggleIsFetching = (isFetching) => ({ type: TOGGLE_IS_FETCHING, isFetching })
const setLoginStatusCode = (loginStatusCode) => ({ type: TOGGLE_LOGIN_STATUS, loginStatusCode })
const setRegistrationStatusCode = (registrationStatusCode) => ({
    type: TOGGLE_REGISTRATION_STATUS,
    registrationStatusCode,
})

export const getAuthUserData = () => async (dispatch) => {
    const response = await authAPI.me()

    if (response.data.statusCode === 200) {
        let { id, isAdmin } = response.data.data
        dispatch(setUserData(id, true, isAdmin))
    }

    return response
}

export const login = ({ login, password }) => async (dispatch) => {
    dispatch(toggleIsFetching(true))
    const response = await authAPI.login(login, password)

    dispatch(toggleIsFetching(false))
    
    switch (response.data.statusCode) {
        case 200:
            let { id, isAdmin } = response.data.data
            dispatch(setUserData(id, true, isAdmin))
            break
        case 204:
            dispatch(setLoginStatusCode(204))
            break
        case 403:
            dispatch(setLoginStatusCode(403))
            break
        default:
            dispatch(setLoginStatusCode(500))
    }
}

export const registration = ({ login, password }) => async (dispatch) => {
    dispatch(toggleIsFetching(true))
    const response = await authAPI.registration(login, password)

    dispatch(toggleIsFetching(false))

    switch (response.data.statusCode) {
        case 200:
            let { id } = response.data.data
            dispatch(setUserData(id, true, false))
            break
        case 204:
            dispatch(setRegistrationStatusCode(204))
            break
        default:
            dispatch(setRegistrationStatusCode(500))
    }
}

export const socialLogin = (socialId, name) => async (dispatch) => {
    dispatch(toggleIsFetching(true))
    const response = await authAPI.socialLogin(socialId, name)

    dispatch(toggleIsFetching(false))

    switch (response.data.statusCode) {
        case 200:
            let { id, isAdmin } = response.data.data
            dispatch(setUserData(id, true, isAdmin))
            break
        case 403:
            dispatch(setLoginStatusCode(403))
            break
        default:
            dispatch(setLoginStatusCode(500))
    }
}

export const logout = () => async (dispatch) => {
    const response = await authAPI.logout()

    if (response.data.statusCode === 200) {
        dispatch(setUserData(null, false, false))
    }
}

export const toggleLoginStatus = () => (dispatch) => {
    dispatch(setLoginStatusCode(0))
}

export const toggleRegistrationStatus = () => (dispatch) => {
    dispatch(setRegistrationStatusCode(0))
}
