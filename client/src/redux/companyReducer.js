import { companyAPI } from '../api/api'

const SET_USER_COMPANIES = '/company/SET_USER_COMPANIES'
const SET_COMPANY = '/company/SET_COMPANY'
const SET_BONUSES_COUNT = '/company/SET_BONUSES_COUNT'
const INITIAL_BONUSES = '/company/INITIAL_BONUSES'
const SET_BONUSES = '/company/SET_BONUSES'
const TOGGLE_IS_FETCHING = '/company/TOGGLE_IS_FETCHING'
const TOGGLE_STATUS = '/company/TOGGLE_STATUS'
const TOGGLE_EDIT_MODE = '/profile/TOGGLE_EDIT_MODE'

const initialState = {
    userCompanies: [],
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
    statusCode: 0,
    editMode: false,
}

export const companyReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_COMPANIES:
            return {
                ...state,
                userCompanies: [...action.userCompanies],
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
                bonuses: [...action.bonuses],
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
        case TOGGLE_STATUS:
            return {
                ...state,
                statusCode: action.statusCode,
            }
        case TOGGLE_EDIT_MODE:
            return {
                ...state,
                editMode: action.editMode,
            }
        default:
            return state
    }
}

const setUserCompanies = (userCompanies) => ({ type: SET_USER_COMPANIES, userCompanies })
const setCompany = (company) => ({ type: SET_COMPANY, company })
const setBonusesCount = (bonusesCount) => ({ type: SET_BONUSES_COUNT, bonusesCount })
const setInitialBonuses = (bonuses) => ({ type: INITIAL_BONUSES, bonuses })
const setBonuses = (bonuses) => ({ type: SET_BONUSES, bonuses })
const toggleIsFetching = (isFetching) => ({ type: TOGGLE_IS_FETCHING, isFetching })
const setStatusCode = (statusCode) => ({ type: TOGGLE_STATUS, statusCode })
const toggleEditMode = (editMode) => ({ type: TOGGLE_EDIT_MODE, editMode })

export const getUserCompanies = (userId) => async (dispatch) => {
    const response = await companyAPI.getUserCompanies(userId)

    if (response.data.statusCode === 200) {
        dispatch(setUserCompanies(response.data.data))
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

export const buyBonus = (bonusId, userId, companyId, bonusAmount) => async (dispatch) => {
    dispatch(toggleIsFetching(true))
    await companyAPI.buyBonus(bonusId, userId, companyId, bonusAmount)

    dispatch(toggleIsFetching(false))
}

export const createCompany = (data) => async (dispatch) => {
    dispatch(toggleIsFetching(true))
    const { userId, title, description, videoLink, targetAmount, expirationDate } = data

    const response = await companyAPI.createCompany(
        userId,
        title,
        description,
        videoLink,
        targetAmount,
        expirationDate
    )

    dispatch(toggleIsFetching(false))

    if (response.data.statusCode === 200) {
        dispatch(setStatusCode(200))
    } else {
        dispatch(setStatusCode(204))
    }
}

export const toggleStatus = () => (dispatch) => {
    dispatch(setStatusCode(0))
}

export const setEditMode = (editMode) => (dispatch) => {
    dispatch(toggleEditMode(editMode))
}