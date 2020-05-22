import { adminAPI } from '../api/api'

const SET_OFFSET = 'SET_OFFSET'
const SET_USERS = 'SET_USERS'
const EDIT_USERS_STATUS = 'EDIT_USERS_STATUS'
const EDIT_ADMINS_STATUS = 'EDIT_ADMINS_STATUS'
const DELETE_USERS = 'DELETE_USERS'
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING'

const initialState = {
    offset: 0,
    users: [],
    isFetching: false,
}

export const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_OFFSET:
            return {
                ...state,
                offset: action.offset,
            }
        case SET_USERS:
            return {
                ...state,
                users: [...state.users].concat(action.users),
            }
        case EDIT_USERS_STATUS:
            return {
                ...state,
                users: state.users.map((user) => {
                    if (action.usersId.some((id) => id === user.id)) {
                        return {
                            ...user,
                            isBlocked: action.isBlocked,
                        }
                    }
                    return user
                }),
            }
        case EDIT_ADMINS_STATUS:
            return {
                ...state,
                users: state.users.map((user) => {
                    if (action.usersId.some((id) => id === user.id)) {
                        return {
                            ...user,
                            isAdmin: action.isAdmin,
                        }
                    }
                    return user
                }),
            }
        case DELETE_USERS:
            return {
                ...state,
                users: state.users.filter((user) => {
                    if (action.usersId.some((id) => id === user.id)) {
                        return false
                    }
                    return true
                }),
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

const setOffset = (offset) => ({ type: SET_OFFSET, offset })
const setUsers = (users) => ({ type: SET_USERS, users })
const setUsersStatus = (usersId, isBlocked) => ({ type: EDIT_USERS_STATUS, usersId, isBlocked })
const setAdminsStatus = (usersId, isAdmin) => ({ type: EDIT_ADMINS_STATUS, usersId, isAdmin })
const setDeletedUsers = (usersId) => ({ type: DELETE_USERS, usersId })
const toggleIsFetching = (isFetching) => ({ type: TOGGLE_IS_FETCHING, isFetching })

export const getUsersCount = () => (dispatch) => {
    dispatch(toggleIsFetching(true))
    adminAPI
        .getUsersCount()
        .then((response) => {
            dispatch(toggleIsFetching(false))
            if (response.data.statusCode === 200) {
                dispatch(setOffset(response.data.data))
            }
        })
        .catch((error) => console.log(error))
}

export const getUsers = (offset) => (dispatch) => {
    dispatch(toggleIsFetching(true))
    adminAPI
        .getUsers(offset)
        .then((response) => {
            dispatch(toggleIsFetching(false))
            if (response.data.statusCode === 200) {
                dispatch(setUsers(response.data.data))
            }
        })
        .catch((error) => console.log(error))
}

export const setAdmins = (ids) => (dispatch) => {
    dispatch(toggleIsFetching(true))
    adminAPI
        .setAdmins(ids)
        .then((response) => {
            dispatch(toggleIsFetching(false))
            if (response.data.statusCode === 200) {
                dispatch(setAdminsStatus(ids, true))
            }
        })
        .catch((error) => console.log(error))
}

export const deleteAdmins = (ids) => (dispatch) => {
    dispatch(toggleIsFetching(true))
    adminAPI
        .deleteAdmins(ids)
        .then((response) => {
            dispatch(toggleIsFetching(false))
            if (response.data.statusCode === 200) {
                dispatch(setAdminsStatus(ids, false))
            }
        })
        .catch((error) => console.log(error))
}

export const blockUsers = (ids) => (dispatch) => {
    dispatch(toggleIsFetching(true))
    adminAPI
        .blockUsers(ids)
        .then((response) => {
            dispatch(toggleIsFetching(false))
            if (response.data.statusCode === 200) {
                dispatch(setUsersStatus(ids, true))
            }
        })
        .catch((error) => console.log(error))
}

export const unblockUsers = (ids) => (dispatch) => {
    dispatch(toggleIsFetching(true))
    adminAPI
        .unblockUsers(ids)
        .then((response) => {
            dispatch(toggleIsFetching(false))
            if (response.data.statusCode === 200) {
                dispatch(setUsersStatus(ids, false))
            }
        })
        .catch((error) => console.log(error))
}

export const deleteUsers = (ids) => (dispatch) => {
    dispatch(toggleIsFetching(true))
    adminAPI
        .deleteUsers(ids)
        .then((response) => {
            dispatch(toggleIsFetching(false))
            if (response.data.statusCode === 200) {
                dispatch(setDeletedUsers(ids))
            }
        })
        .catch((error) => console.log(error))
}
