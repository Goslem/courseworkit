import { locales } from '../i18n'
const CHANGE_LOCALE = 'CHANGE_LOCALE'

const initialState = {
    value: localStorage.getItem('locale') === locales.RU ? locales.RU : locales.EN,
}

export const localeReducer = (state = initialState, action) => {
    switch (action.type) {
        case CHANGE_LOCALE:
            return {
                ...state,
                value: action.payload,
            }
        default:
            return state
    }
}

const setLocale = (payload) => ({
    type: CHANGE_LOCALE,
    payload,
})

export const toggleLocale = (locale) => (dispatch) => {
    const reverseLocale = locale === locales.EN ? locales.RU : locales.EN
    dispatch(setLocale(reverseLocale))
    localStorage.setItem('locale', reverseLocale)
}
