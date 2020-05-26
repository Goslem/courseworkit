import { profileAPI } from '../api/api'

const SET_BONUSES_COUNT = 'SET_BONUSES_COUNT'
const INITIAL_BONUSES = 'INITIAL_BONUSES'
const SET_BONUSES = 'SET_BONUSES'
const SET_COMPANY_COUNT = 'SET_COMPANY_COUNT'
const INITIAL_COMPANY = 'INITIAL_COMPANY'
const SET_COMPANY = 'SET_COMPANY'
const SET_USER_INFO = 'SET_USER_INFO'

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
