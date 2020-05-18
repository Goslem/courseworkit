const CHANGE_THEME = 'CHANGE_THEME'

const initialState = {
    title: localStorage.getItem('theme') === 'dark' ? 'dark' : 'light',
}

export const themeReducer = (state = initialState, action) => {
    switch (action.type) {
        case CHANGE_THEME:
            return {
                ...state,
                title: action.payload,
            }
        default:
            return state
    }
}

const setTheme = (payload) => ({
    type: CHANGE_THEME,
    payload,
})

export const toggleTheme = (title) => (dispatch) => {
    const reverseTitle = title === 'light' ? 'dark' : 'light'
    dispatch(setTheme(reverseTitle))
    localStorage.setItem('theme', reverseTitle)
}
