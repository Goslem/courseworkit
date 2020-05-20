import { adminAPI } from '../api/api'

const SET_USERS = 'SET_USERS'

const initialState = {
    users: [],
}

export const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USERS:
            return {
                ...state,
                users: action.users,
            }
        default:
            return state
    }
}

export const setUsers = (users) => ({ type: SET_USERS, users })

export const getUsers = () => (dispatch) => {
    adminAPI
        .getUsers()
        .then((users) => {
            dispatch(setUsers(users.data))
        })
        .catch((error) => console.log(error))
}
