import React, { useState } from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'
import Header from './components/Header/Header'
import { ThemeProvider } from '@material-ui/core'
import { createMuiTheme } from '@material-ui/core/styles'
import { IntlProvider } from 'react-intl'
import { locales, localeMessages } from './i18n'

function App() {
    const [theme, setTheme] = useState({
        palette: {
            type: 'light',
        },
    })

    const toggleTheme = React.useCallback(() => {
        let newPaletteType = theme.palette.type === 'light' ? 'dark' : 'light'
        setTheme({
            palette: {
                type: newPaletteType,
            },
        })
    }, [theme, setTheme])

    const muiTheme = createMuiTheme(theme)


    const [locale, setLocale] = useState(locales.EN)

    const toggleLocale = React.useCallback(() => {
        setLocale(locale === locales.EN ? locales.RU : locales.EN)
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
