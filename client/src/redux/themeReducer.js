const CHANGE_THEME = 'CHANGE_THEME'

const initialThemeState = {
    title: localStorage.getItem('theme') === 'dark' ? 'dark' : 'light',
}

export const themeReducer = (state = initialThemeState, action) => {
    switch (action.type) {
        case CHANGE_THEME:
            return {
                ...state,
                title: action.newTitle,
            }
        default:
            return state
    }
}

const setTheme = (newTitle) => ({
    type: CHANGE_THEME,
    newTitle,
})

export const toggleTheme = (title) => (dispatch) => {
    const reverseTitle = title === 'light' ? 'dark' : 'light'
    dispatch(setTheme(reverseTitle))
    localStorage.setItem('theme', reverseTitle)
}
