import { adminAPI } from '../api/api'

const SET_USERS_COUNT = 'SET_USERS_COUNT'
const REDUCE_USERS_COUNT = 'DECREMENT_USERS_COUNT'
const SET_USERS = 'SET_USERS'
const EDIT_USERS_STATUS = 'EDIT_USERS_STATUS'
const EDIT_ADMINS_STATUS = 'EDIT_ADMINS_STATUS'
const DELETE_USERS = 'DELETE_USERS'
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING'
const TOGGLE_ERROR = 'ERROR'

const initialState = {
    usersCount: 0,
    users: [],
    isFetching: false,
    isError: false,
}

export const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USERS_COUNT:
            return {
                ...state,
                usersCount: action.usersCount,
            }
        case REDUCE_USERS_COUNT:
            return {
                ...state,
                usersCount: state.usersCount - action.value,
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
        case TOGGLE_ERROR:
            return {
                ...state,
                isError: action.isError,
            }
        default:
            return state
    }
}

const setUsersCount = (usersCount) => ({ type: SET_USERS_COUNT, usersCount })
const reduceUsersCount = (value) => ({ type: REDUCE_USERS_COUNT, value })
const setUsers = (users) => ({ type: SET_USERS, users })
const setUsersStatus = (usersId, isBlocked) => ({ type: EDIT_USERS_STATUS, usersId, isBlocked })
const setAdminsStatus = (usersId, isAdmin) => ({ type: EDIT_ADMINS_STATUS, usersId, isAdmin })
const setDeletedUsers = (usersId) => ({ type: DELETE_USERS, usersId })
const toggleIsFetching = (isFetching) => ({ type: TOGGLE_IS_FETCHING, isFetching })
const setError = (isError) => ({ type: TOGGLE_ERROR, isError })

export const getUsersCount = () => (dispatch) => {
    dispatch(toggleIsFetching(true))
    adminAPI
        .getUsersCount()
        .then((response) => {
            dispatch(toggleIsFetching(false))
            if (response.data.statusCode === 200) {
                dispatch(setUsersCount(response.data.data))
            } else {
                window.location.reload()
            }
        })
        .catch((error) => console.log(error))
}

export const getUsers = (offset, limit) => (dispatch) => {
    dispatch(toggleIsFetching(true))
    adminAPI
        .getUsers(offset, limit)
        .then((response) => {
            dispatch(toggleIsFetching(false))
            if (response.data.statusCode === 200) {
                dispatch(setUsers(response.data.data))
            } else {
                window.location.reload()
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
                if (response.data.data !== ids.length) {
                    dispatch(setError(true))
                }
                dispatch(setAdminsStatus(ids, true))
            } else {
                window.location.reload()
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
                if (response.data.data !== ids.length) {
                    dispatch(setError(true))
                }
                dispatch(setAdminsStatus(ids, false))
            } else {
                window.location.reload()
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
                if (response.data.data !== ids.length) {
                    dispatch(setError(true))
                }
                dispatch(setUsersStatus(ids, true))
            } else {
                window.location.reload()
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
                if (response.data.data !== ids.length) {
                    dispatch(setError(true))
                }
                dispatch(setUsersStatus(ids, false))
            } else {
                window.location.reload()
            }
        })
        .catch((error) => console.log(error))
}

export const deleteUsers = (ids, usersLength, usersCount) => (dispatch) => {
    dispatch(toggleIsFetching(true))
    adminAPI
        .deleteUsers(ids)
        .then((response) => {
            dispatch(toggleIsFetching(false))
            if (response.data.statusCode === 200) {
                dispatch(reduceUsersCount(ids.length))
                dispatch(setDeletedUsers(ids))

                if (usersLength !== usersCount) {
                    const lastDownloadPage = usersLength / 10 - 1
                    const offset = lastDownloadPage * 10 + 10 - ids.length
                    const limit = offset === 0 ? 10 : 10 - (offset % 10)
                    dispatch(getUsers(offset, limit))
                }
            } else {
                window.window.location.reload()
            }
        })
        .catch((error) => console.log(error))
}

export const toggleError = () => (dispatch) => {
    dispatch(setError(false))
}
