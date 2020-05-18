import React, { useEffect } from 'react'
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
import Registration from './components/Registration'
import Profile from './components/Profile'
import { initializeApp } from './redux/appReducer'
import LinearProgress from '@material-ui/core/LinearProgress'

const getTheme = (title) => {
    return title === 'light' ? lightTheme : darkTheme
}

// class App extends React.Component {
//     componentDidMount() {
//         this.theme = getTheme(this.props.theme.title)
//         this.locale = this.props.locale.value
//         this.props.initializeApp()
//     }

//     render() {
//         if (!this.props.initialized) {
//             return (
//                 <>
//                     <CssBaseline />
//                     <LinearProgress />
//                     <div style={{ height: '100vh', backgroundColor: '#eee' }}></div>
//                 </>
//             )
//         }

//         return (
//             <ThemeProvider theme={createMuiTheme(this.theme)}>
//                 <IntlProvider locale={this.locale} messages={localeMessages[this.locale]}>
//                     <CssBaseline />
//                     <Header />

//                     <Switch>
//                         <Route path='/login' exact component={Login} />
//                         <Route path='/registration' exact component={Registration} />

//                         <Route path='/profile' exact component={Profile} />
//                     </Switch>
//                 </IntlProvider>
//             </ThemeProvider>
//         )
//     }
// }

const App = (props) => {
    const theme = getTheme(props.theme.title)
    const locale = props.locale.value

    useEffect(() => {
        // props.initializeApp()
        console.log('client')
    })

    // if (!props.initialized) {
    //     return <div>Loading...</div>
    // }

    return (
        <ThemeProvider theme={createMuiTheme(theme)}>
            <IntlProvider locale={locale} messages={localeMessages[locale]}>
                <CssBaseline />
                <Header />

                <Switch>
                    <Route path='/login' exact component={Login} />
                    <Route path='/registration' exact component={Registration} />

                    <Route path='/profile' exact component={Profile} />
                </Switch>
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
