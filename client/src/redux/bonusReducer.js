import { bonusAPI } from '../api/api'
import { stopSubmit } from 'redux-form'

const SET_COMPANIES_ID = 'SET_COMPANIES_ID'
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING'

const initialState = {
    companiesId: [],
    isFetching: false,
}

export const bonusReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_COMPANIES_ID:
            return {
                ...state,
                companiesId: [...action.companiesId],
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

const setCompaniesId = (companiesId) => ({ type: SET_COMPANIES_ID, companiesId })
const toggleIsFetching = (isFetching) => ({ type: TOGGLE_IS_FETCHING, isFetching })

export const getCompaniesId = (userId) => async (dispatch) => {
    const response = await bonusAPI.getCompaniesId(userId)

    if (response.data.statusCode === 200) {
        dispatch(setCompaniesId(response.data.data))
    }
}

export const createBonus = (data) => async (dispatch) => {
    dispatch(toggleIsFetching(true))
    const { title, amount, description, companyId } = data

    bonusAPI.createBonus(title, amount, description, companyId).then((response) => {
        dispatch(toggleIsFetching(false))

        if (response.data.statusCode === 200) {
            dispatch(stopSubmit('bonus', { _error: 200 }))
        } else {
            dispatch(stopSubmit('bonus', { _error: 204 }))
        }
    })
}
