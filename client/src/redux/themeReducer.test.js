import { themeReducer } from './themeReducer'

const state = {
    title: localStorage.getItem('theme') === 'dark' ? 'dark' : 'light',
}
const setTheme = (payload) => ({ type: 'CHANGE_THEME', payload })

it('Theme changed to dark', () => {
    // 1. Test data
    let action = setTheme('dark')

    // 2. Action
    let newState = themeReducer(state, action)

    // 3. Expectation
    expect(newState.title).toBe('dark')
})

it('Theme changed to light', () => {
    // 1. Test data
    let action = setTheme('light')

    // 2. Action
    let newState = themeReducer(state, action)

    // 3. Expectation
    expect(newState.title).toBe('light')
})
