import React from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

const mapStateToProps = (state) => ({
    isAdmin: state.auth.isAdmin,
})

export const withAdminRedirect = (Component) => {
    const RedirectComponent = (props) => {
        if (!props.isAdmin) {
            return <Redirect to='/' />
        }

        return <Component {...props} />
    }

    return connect(mapStateToProps)(RedirectComponent)
}
