import React, { useState } from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'
import Header from './components/Header/Header'
import { IntlProvider } from 'react-intl'
import { ThemeProvider } from '@material-ui/core'
import { createMuiTheme } from '@material-ui/core/styles'
import { theme, toggleTheme } from './theme'
import { locales, localeMessages } from './i18n'

function App() {
    const muiTheme = createMuiTheme(theme)

    const [locale, setLocale] = useState(locales.EN)

    const toggleLocale = React.useCallback(() => {
        setLocale(locale === locales.EN ? locales.RU : locales.EN)
    }, [locale, locales, setLocale])

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
