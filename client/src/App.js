import React, { useState } from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'
import Header from './components/Header/Header'
import { locales, localeMessages } from './i18n'
import { IntlProvider } from 'react-intl'
import { ThemeProvider } from '@material-ui/core'
import darkTheme from './theme/dark'
import lightTheme from './theme/light'

function App() {
    const [locale, setLocale] = useState(locales.EN)
    const [darkMode, setDarkMode] = useState(false)

    const darkModeChanged = React.useCallback(() => {
        setDarkMode(!darkMode)
    }, [darkMode, setDarkMode])

    return (
        <ThemeProvider theme={darkMode ? darkTheme() : lightTheme()}>
            <IntlProvider locale={locale} messages={localeMessages[locale]}>
                <CssBaseline />
                <Header locale={locale} setLocale={setLocale} darkModeChanged={darkModeChanged} />
            </IntlProvider>
        </ThemeProvider>
    )
}

export default App
