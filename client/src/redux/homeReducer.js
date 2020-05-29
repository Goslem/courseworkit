import { homeAPI } from '../api/api'

const SET_HOME_COMPANY = '/home/SET_HOME_COMPANY'

const initialState = {
    lastCompany: [],
}

export const homeReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_HOME_COMPANY:
            return {
                ...state,
                lastCompany: [...action.company],
            }
        default:
            return state
    }
}

const setCompany = (company) => ({ type: SET_HOME_COMPANY, company })

export const getCompany = () => async (dispatch) => {
    const response = await homeAPI.getCompany()

    if (response.data.statusCode === 200) {
        dispatch(setCompany(response.data.data))
    }
}
