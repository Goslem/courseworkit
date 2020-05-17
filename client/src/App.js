import React from 'react'
import { connect } from 'react-redux'
import { Switch, Route } from 'react-router-dom'
import { ThemeProvider } from '@material-ui/core'
import { createMuiTheme } from '@material-ui/core/styles'
import { darkTheme } from './themes/dark'
import { lightTheme } from './themes/light'
import { IntlProvider } from 'react-intl'
import { localeMessages } from './i18n'
import CssBaseline from '@material-ui/core/CssBaseline'
import Header from './components/Header'
import Login from './components/Login'

const getTheme = (title) => {
    return title === 'light' ? lightTheme : darkTheme
}

const App = (props) => {
    const theme = getTheme(props.theme.title)
    const muiTheme = createMuiTheme(theme)
    const locale = props.locale.value

    return (
        <ThemeProvider theme={muiTheme}>
            <IntlProvider locale={locale} messages={localeMessages[locale]}>
                <CssBaseline />
                <Header />

                <Switch>
                    <Route path='/login' exact component={Login} />
                </Switch>
            </IntlProvider>
        </ThemeProvider>
    )
}

let mapStateToProps = (state) => ({
    theme: state.theme,
    locale: state.locale,
})

export default connect(mapStateToProps)(App)
