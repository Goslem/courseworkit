import React, { useState } from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'
import Header from './components/Header'
import { ThemeProvider } from '@material-ui/core'
import { createMuiTheme } from '@material-ui/core/styles'
import { IntlProvider } from 'react-intl'
import { locales, localeMessages } from './i18n'

const getInitialTheme = () => {
    const savedTheme = localStorage.getItem('theme')
    return ['light', 'dark'].find((theme) => theme === savedTheme) || 'light'
}

const getInitialLanguage = () => {
    const savedLanguage = localStorage.getItem('locale')
    return [locales.EN, locales.RU].find((language) => language === savedLanguage) || locales.EN
}

const getPalette = (value) => ({
    palette: {
        type: value,
    },
})

const App = () => {
    const [theme, setTheme] = useState(getPalette(getInitialTheme()))

    const toggleTheme = React.useCallback(() => {
        let newPaletteType = theme.palette.type === 'light' ? 'dark' : 'light'
        setTheme(getPalette(newPaletteType))
        localStorage.setItem('theme', newPaletteType)
    }, [theme, setTheme])

    const muiTheme = createMuiTheme(theme)

    const [locale, setLocale] = useState(getInitialLanguage())

    const toggleLocale = React.useCallback(() => {
        const language = locale === locales.EN ? locales.RU : locales.EN
        setLocale(language)
        localStorage.setItem('locale', language)
    }, [locale, setLocale])

    return (
        <ThemeProvider theme={muiTheme}>
            <IntlProvider locale={locale} messages={localeMessages[locale]}>
                <CssBaseline />
                <Header toggleTheme={toggleTheme} toggleLocale={toggleLocale} />
            </IntlProvider>
        </ThemeProvider>
    )
}

export default App
