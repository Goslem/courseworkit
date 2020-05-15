import React, { useState } from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'
import Header from './components/Header/Header'
import { locales, localeMessages } from './i18n'
import { IntlProvider } from 'react-intl'
import { ThemeProvider } from '@material-ui/core'
import { createMuiTheme } from '@material-ui/core/styles'
import { theme, toggleTheme } from './theme'

function App() {
    const muiTheme = createMuiTheme(theme)

    const [locale, setLocale] = useState(locales.EN)

    return (
        <ThemeProvider theme={muiTheme}>
            <IntlProvider locale={locale} messages={localeMessages[locale]}>
                <CssBaseline />
                <Header locale={locale} setLocale={setLocale} toggleTheme={toggleTheme} />
            </IntlProvider>
        </ThemeProvider>
    )
}

export default App
