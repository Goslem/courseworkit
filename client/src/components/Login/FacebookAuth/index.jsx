import React from 'react'
import { connect } from 'react-redux'
import { socialLogin } from '../../../redux/authReducer'
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import FacebookButton from './FacebookButton'

const FacebookAuth = (props) => {
    const responseFacebook = (response) => {
        const socialId = response.id
        const name = response.name
        props.socialLogin(socialId, name)
    }

    return (
        <FacebookLogin
            appId='271109940744192'
            fields='name'
            callback={responseFacebook}
            render={(renderProps) => <FacebookButton {...renderProps} />}
        />
    )
}

export default connect(null, { socialLogin })(FacebookAuth)
