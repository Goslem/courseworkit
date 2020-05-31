import { createCompanyAPI } from '../api/api'

const SET_COMPANY_IMAGES = '/createCompany/SET_CREATE_COMPANY_IMAGES'
const TOGGLE_IS_FETCHING = '/createCompany/TOGGLE_IS_FETCHING'
const TOGGLE_STATUS = '/createCompany/TOGGLE_STATUS'

const initialState = {
    images: [],
    isFetching: false,
    statusCode: 0,
}

export const createCompanyReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_COMPANY_IMAGES:
            return {
                ...state,
                images: [...state.images].concat(action.image),
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
        default:
            return state
    }
}

const setImage = (image) => ({ type: SET_COMPANY_IMAGES, image })
const toggleIsFetching = (isFetching) => ({ type: TOGGLE_IS_FETCHING, isFetching })
const setStatusCode = (statusCode) => ({ type: TOGGLE_STATUS, statusCode })

export const uploadImage = (image) => async (dispatch) => {
    dispatch(toggleIsFetching(true))
    const response = await createCompanyAPI.uploadImage(image)

    dispatch(toggleIsFetching(false))
    if (response.status === 200) {
        dispatch(setImage(response.data.secure_url))
        return response.data.secure_url
    }
}

export const createCompany = (data) => async (dispatch) => {
    dispatch(toggleIsFetching(true))
    const { userId, title, description, videoLink, targetAmount, expirationDate, images } = data

    const response = await createCompanyAPI.createCompany(
        userId,
        title,
        description,
        videoLink,
        targetAmount,
        expirationDate
    )

    dispatch(toggleIsFetching(false))

    if (response.data.statusCode === 200) {
        if (images.length > 0) {
            await createCompanyAPI.createCompanyImages(response.data.data.id, images)
        }

        dispatch(setStatusCode(200))
    } else {
        dispatch(setStatusCode(204))
    }
}

export const nullifyStatus = () => (dispatch) => {
    dispatch(setStatusCode(0))
}
