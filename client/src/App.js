import React, { useState } from 'react'
import { Switch, Route } from 'react-router-dom'
import { ThemeProvider } from '@material-ui/core'
import { createMuiTheme } from '@material-ui/core/styles'
import { darkTheme } from './themes/dark'
import { lightTheme } from './themes/light'
import { IntlProvider } from 'react-intl'
import { locales, localeMessages } from './i18n'
import CssBaseline from '@material-ui/core/CssBaseline'
import Header from './components/Header'
import Login from './components/Login'

const getInitialTheme = () => {
    const savedTheme = localStorage.getItem('theme')
    const themes = ['light', 'dark']
    const initialTheme = themes.find((theme) => theme === savedTheme) || 'light'
    return initialTheme
}

const getInitialLanguage = () => {
    const savedLanguage = localStorage.getItem('locale')
    const languages = [locales.EN, locales.RU]
    const initialLanguage = languages.find((language) => language === savedLanguage) || locales.EN
    return initialLanguage
}

const getPalette = (theme) => {
    return theme === 'light' ? lightTheme : darkTheme
}

const App = () => {
    const [theme, setTheme] = useState(getPalette(getInitialTheme()))
    const [locale, setLocale] = useState(getInitialLanguage())

    const toggleTheme = React.useCallback(() => {
        const newPaletteType = theme.palette.type === 'light' ? 'dark' : 'light'
        setTheme(getPalette(newPaletteType))
        localStorage.setItem('theme', newPaletteType)
    }, [theme, setTheme])

    const toggleLocale = React.useCallback(() => {
        const language = locale === locales.EN ? locales.RU : locales.EN
        setLocale(language)
        localStorage.setItem('locale', language)
    }, [locale, setLocale])

    const muiTheme = createMuiTheme(theme)

    return (
        <ThemeProvider theme={muiTheme}>
            <IntlProvider locale={locale} messages={localeMessages[locale]}>
                <CssBaseline />
                <Header toggleTheme={toggleTheme} toggleLocale={toggleLocale} />

                <Switch>
                    <Route path='/login' exact component={Login} />
                </Switch>
            </IntlProvider>
        </ThemeProvider>
    )
}

export default App
