import { bonusAPI } from '../api/api'

const SET_COMPANIES_ID = 'SET_COMPANIES_ID'

const initialState = {
    companiesId: [],
}

export const bonusReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_COMPANIES_ID:
            return {
                ...state,
                companiesId: [...action.companiesId],
            }
        default:
            return state
    }
}

const setCompaniesId = (companiesId) => ({ type: SET_COMPANIES_ID, companiesId })

export const getCompaniesId = (userId) => async (dispatch) => {
    const response = await bonusAPI.getCompaniesId(userId)

    if (response.data.statusCode === 200) {
        dispatch(setCompaniesId(response.data.data))
    }
}

export const createBonus = (data) => async (dispatch) => {
    const { title, amount, description, companyId } = data
    await bonusAPI.createBonus(title, amount, description, companyId)
}
