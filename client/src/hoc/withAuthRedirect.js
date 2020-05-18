import React from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

const mapStateToPropsForRedirect = (state) => ({
    isAuth: state.auth.isAuth,
})

export const withLogoutRedirect = (Component) => {
    const RedirectComponent = (props) => {
        if (!props.isAuth) {
            return <Redirect to='/login' />
        }

        return <Component {...props} />
    }

    return connect(mapStateToPropsForRedirect)(RedirectComponent)
}

export const withLoginRedirect = (Component) => {
    const RedirectComponent = (props) => {
        if (props.isAuth) {
            return <Redirect to='/profile' />
        }

        return <Component {...props} />
    }

    return connect(mapStateToPropsForRedirect)(RedirectComponent)
}
