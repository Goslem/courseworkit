import React, { useEffect } from 'react'
import { ThemeProvider } from '@material-ui/core'
import { createMuiTheme } from '@material-ui/core/styles'
import { lightTheme } from './themes/light'
import { darkTheme } from './themes/dark'
import { IntlProvider } from 'react-intl'
import { localeMessages } from './i18n'
import { connect } from 'react-redux'
import { initializeApp } from './redux/appReducer'
import { Switch, Route } from 'react-router-dom'
import CssBaseline from '@material-ui/core/CssBaseline'
import LinearProgress from '@material-ui/core/LinearProgress'
import Header from './components/Header'
import Login from './components/Login'
import Registration from './components/Registration'
import Home from './components/Home'
import CreateCompany from './components/CreateCompany'
import CreateBonus from './components/CreateBonus'
import Company from './components/Company'
import Profile from './components/Profile'
import Admin from './components/Admin'
import ErrorPage from './components/404'

const getTheme = (title) => {
    return title === 'light' ? lightTheme : darkTheme
}

const App = (props) => {
    const theme = getTheme(props.theme.title)
    const locale = props.locale.value

    useEffect(() => {
        props.initializeApp()
    }, [])

    return (
        <ThemeProvider theme={createMuiTheme(theme)}>
            <IntlProvider locale={locale} messages={localeMessages[locale]}>
                <CssBaseline />
                {props.initialized ? (
                    <>
                        <Header />
                        <Switch>
                            <Route path='/login' exact component={Login} />
                            <Route path='/registration' exact component={Registration} />

                            <Route path='/' exact component={Home} />
                            <Route path='/company/create' exact component={CreateCompany} />
                            <Route path='/bonus/create' exact component={CreateBonus} />
                            <Route path='/company/:companyId' exact component={Company} />
                            <Route path='/profile/:userId?' exact component={Profile} />
                            <Route path='/admin' exact component={Admin} />
                            <Route component={ErrorPage} />
                        </Switch>
                    </>
                ) : (
                    <LinearProgress />
                )}
            </IntlProvider>
        </ThemeProvider>
    )
}

let mapStateToProps = (state) => ({
    initialized: state.app.initialized,
    theme: state.theme,
    locale: state.locale,
})

export default connect(mapStateToProps, { initializeApp })(App)
