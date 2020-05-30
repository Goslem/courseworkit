import { profileAPI } from '../api/api'

const SET_BONUSES_COUNT = '/profile/SET_BONUSES_COUNT'
const INITIAL_BONUSES = '/profile/INITIAL_BONUSES'
const SET_BONUSES = '/profile/SET_BONUSES'
const SET_COMPANY_COUNT = '/profile/SET_COMPANY_COUNT'
const INITIAL_COMPANY = '/profile/INITIAL_COMPANY'
const SET_COMPANY = '/profile/SET_COMPANY'
const SET_USER_INFO = '/profile/SET_USER_INFO'
const TOGGLE_EDIT_MODE = '/profile/TOGGLE_EDIT_MODE'
const TOGGLE_USER_NAME = '/profile/TOGGLE_USER_NAME'
const TOGGLE_USER_SURNAME = '/profile/TOGGLE_USER_SURNAME'
const TOGGLE_USER_COUNTRY = '/profile/TOGGLE_USER_COUNTRY'
const TOGGLE_USER_CITY = '/profile/TOGGLE_USER_CITY'

const initialState = {
    bonusesCount: 0,
    bonuses: [],
    companyCount: 0,
    company: [],
    userInfo: {
        name: null,
        surname: null,
        country: null,
        city: null,
    },
    editMode: false,
}

export const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_BONUSES_COUNT:
            return {
                ...state,
                bonusesCount: action.bonusesCount,
            }
        case INITIAL_BONUSES:
            return {
                ...state,
                bonuses: action.bonuses,
            }
        case SET_BONUSES:
            return {
                ...state,
                bonuses: [...state.bonuses].concat(action.bonuses),
            }
        case SET_COMPANY_COUNT:
            return {
                ...state,
                companyCount: action.companyCount,
            }
        case INITIAL_COMPANY:
            return {
                ...state,
                company: action.company,
            }
        case SET_COMPANY:
            return {
                ...state,
                company: [...state.company].concat(action.company),
            }
        case SET_USER_INFO:
            return {
                ...state,
                userInfo: { ...action.userInfo },
            }
        case TOGGLE_EDIT_MODE:
            return {
                ...state,
                editMode: action.editMode,
            }
        case TOGGLE_USER_NAME:
            return {
                ...state,
                userInfo: {
                    ...state.userInfo,
                    name: action.name,
                },
            }
        case TOGGLE_USER_SURNAME:
            return {
                ...state,
                userInfo: {
                    ...state.userInfo,
                    surname: action.surname,
                },
            }
        case TOGGLE_USER_COUNTRY:
            return {
                ...state,
                userInfo: {
                    ...state.userInfo,
                    country: action.country,
                },
            }
        case TOGGLE_USER_CITY:
            return {
                ...state,
                userInfo: {
                    ...state.userInfo,
                    city: action.city,
                },
            }
        default:
            return state
    }
}

const setBonusesCount = (bonusesCount) => ({ type: SET_BONUSES_COUNT, bonusesCount })
const setInitialBonuses = (bonuses) => ({ type: INITIAL_BONUSES, bonuses })
const setBonuses = (bonuses) => ({ type: SET_BONUSES, bonuses })
const setCompanyCount = (companyCount) => ({ type: SET_COMPANY_COUNT, companyCount })
const setInitialCompany = (company) => ({ type: INITIAL_COMPANY, company })
const setCompany = (company) => ({ type: SET_COMPANY, company })
const setUserInfo = (userInfo) => ({ type: SET_USER_INFO, userInfo })
const toggleEditMode = (editMode) => ({ type: TOGGLE_EDIT_MODE, editMode })
const toggleUserName = (name) => ({ type: TOGGLE_USER_NAME, name })
const toggleUserSurname = (surname) => ({ type: TOGGLE_USER_SURNAME, surname })
const toggleUserCountry = (country) => ({ type: TOGGLE_USER_COUNTRY, country })
const toggleUserCity = (city) => ({ type: TOGGLE_USER_CITY, city })

export const getBonusesCount = (userId) => async (dispatch) => {
    const response = await profileAPI.getBonusesCount(userId)

    if (response.data.statusCode === 200) {
        dispatch(setBonusesCount(response.data.data))
    }
}

export const getInitialBonuses = (userId) => async (dispatch) => {
    const response = await profileAPI.getBonuses(userId, 0, 5)

    if (response.data.statusCode === 200) {
        dispatch(setInitialBonuses(response.data.data))
    }
}

export const getBonuses = (userId, offset, limit) => async (dispatch) => {
    const response = await profileAPI.getBonuses(userId, offset, limit)

    if (response.data.statusCode === 200) {
        dispatch(setBonuses(response.data.data))
    }
}

export const getCompanyCount = (userId) => async (dispatch) => {
    const response = await profileAPI.getCompanyCount(userId)

    if (response.data.statusCode === 200) {
        dispatch(setCompanyCount(response.data.data))
    }
}

export const getInitialCompany = (userId) => async (dispatch) => {
    const response = await profileAPI.getCompany(userId, 0, 5)

    if (response.data.statusCode === 200) {
        dispatch(setInitialCompany(response.data.data))
    }
}

export const getCompany = (userId, offset, limit) => async (dispatch) => {
    const response = await profileAPI.getCompany(userId, offset, limit)

    if (response.data.statusCode === 200) {
        dispatch(setCompany(response.data.data))
    }
}

export const getUserInfo = (userId) => async (dispatch) => {
    const response = await profileAPI.getUserInfo(userId)

    if (response.data.statusCode === 200) {
        dispatch(setUserInfo(response.data.data))
    }
}

export const setEditMode = (editMode) => (dispatch) => {
    dispatch(toggleEditMode(editMode))
}

export const setUserName = (userId, name) => async (dispatch) => {
    const response = await profileAPI.setUserName(userId, name)

    if (response.data.statusCode === 200) {
        dispatch(toggleUserName(name))
    }
}

export const setUserSurname = (userId, surname) => async (dispatch) => {
    const response = await profileAPI.setUserSurname(userId, surname)

    if (response.data.statusCode === 200) {
        dispatch(toggleUserSurname(surname))
    }
}

export const setUserCountry = (userId, country) => async (dispatch) => {
    const response = await profileAPI.setUserCountry(userId, country)

    if (response.data.statusCode === 200) {
        dispatch(toggleUserCountry(country))
    }
}

export const setUserCity = (userId, city) => async (dispatch) => {
    const response = await profileAPI.setUserCity(userId, city)

    if (response.data.statusCode === 200) {
        dispatch(toggleUserCity(city))
    }
}
