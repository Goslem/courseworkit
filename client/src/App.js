import React, { useState } from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'
import Header from './components/Header/Header'
import { locales, localeMessages } from './i18n'
import { IntlProvider } from 'react-intl'

function App() {
    const [locale, setLocale] = useState(locales.EN)

    return (
        <IntlProvider locale={locale} defaultLocale={locales.RU} messages={localeMessages[locale]}>
            <CssBaseline />
            <Header locales={locales} setLocale={setLocale} />
        </IntlProvider>
    )
}

export default App
