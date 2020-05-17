import { locales } from '../i18n'
const CHANGE_LOCALE = 'CHANGE_LOCALE'

const initialLocaleState = {
    value: localStorage.getItem('locale') === locales.RU ? locales.RU : locales.EN,
}

export const localeReducer = (state = initialLocaleState, action) => {
    switch (action.type) {
        case CHANGE_LOCALE:
            return {
                ...state,
                value: action.newLocale,
            }
        default:
            return state
    }
}

const setLocale = (newLocale) => ({
    type: CHANGE_LOCALE,
    newLocale,
})

export const toggleLocale = (locale) => (dispatch) => {
    const reverseLocale = locale === locales.EN ? locales.RU : locales.EN
    dispatch(setLocale(reverseLocale))
    localStorage.setItem('locale', reverseLocale)
}
