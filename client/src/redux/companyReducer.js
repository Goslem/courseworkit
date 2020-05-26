import { companyAPI } from '../api/api'

const SET_COMPANY_ID = 'SET_COMPANY_ID'
const SET_COMPANY = 'SET_COMPANY'
const SET_BONUSES_COUNT = 'SET_BONUSES_COUNT'
const INITIAL_BONUSES = 'INITIAL_BONUSES'
const SET_BONUSES = 'SET_BONUSES'
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING'

const initialState = {
    userCompanyId: [],
    company: {
        title: null,
        description: null,
        videoLink: null,
        currentAmount: null,
        targetAmount: null,
        expirationDate: null,
    },
    bonusesCount: 0,
    bonuses: [],
    isFetching: false,
}

export const companyReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_COMPANY_ID:
            return {
                ...state,
                userCompanyId: action.userCompanyId,
            }
        case SET_COMPANY:
            return {
                ...state,
                company: { ...action.company },
            }
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
        case TOGGLE_IS_FETCHING:
            return {
                ...state,
                isFetching: action.isFetching,
            }

        default:
            return state
    }
}

const setCompanyId = (userCompanyId) => ({ type: SET_COMPANY_ID, userCompanyId })
const setCompany = (company) => ({ type: SET_COMPANY, company })
const setBonusesCount = (bonusesCount) => ({ type: SET_BONUSES_COUNT, bonusesCount })
const setInitialBonuses = (bonuses) => ({ type: INITIAL_BONUSES, bonuses })
const setBonuses = (bonuses) => ({ type: SET_BONUSES, bonuses })
const toggleIsFetching = (isFetching) => ({ type: TOGGLE_IS_FETCHING, isFetching })

export const getUserCompanyId = (userId) => async (dispatch) => {
    const response = await companyAPI.getUserCompanyId(userId)

    if (response.data.statusCode === 200) {
        dispatch(setCompanyId(response.data.data))
    }
}

export const getCompany = (companyId) => async (dispatch) => {
    const response = await companyAPI.getCompany(companyId)

    if (response.data.statusCode === 200) {
        dispatch(setCompany(response.data.data))
    }
}

export const getBonusesCount = (companyId) => async (dispatch) => {
    const response = await companyAPI.getBonusesCount(companyId)

    if (response.data.statusCode === 200) {
        dispatch(setBonusesCount(response.data.data))
    }
}

export const getInitialBonuses = (companyId) => async (dispatch) => {
    const response = await companyAPI.getBonuses(companyId, 0, 5)

    if (response.data.statusCode === 200) {
        dispatch(setInitialBonuses(response.data.data))
    }
}

export const getBonuses = (companyId, offset, limit) => async (dispatch) => {
    const response = await companyAPI.getBonuses(companyId, offset, limit)

    if (response.data.statusCode === 200) {
        dispatch(setBonuses(response.data.data))
    }
}

export const buyBonus = (bonusId, userId) => async (dispatch) => {
    dispatch(toggleIsFetching(true))
    await companyAPI.buyBonus(bonusId, userId)

    dispatch(toggleIsFetching(false))
}
