import React, {useState} from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'
import Header from './components/Header/Header'
import { I18nProviders, LOCALES } from './i18n'

function App() {
    const [locale, setLocale] = useState(LOCALES.ENGLISH)

    return (
        <I18nProviders locale={locale}>
            <CssBaseline />
            <Header setLocale={setLocale} locales={LOCALES} />
        </I18nProviders>
    )
}

export default App
