import React from 'react'
import GoogleLogin from 'react-google-login'
import GoogleButton from './GoogleButton'
import { connect } from 'react-redux'
import { socialLogin } from '../../../redux/authReducer'

const GoogleAuth = (props) => {
    const responseGoogle = (response) => {
        const socialId = response.profileObj.googleId
        const name = response.profileObj.givenName

        console.log('socialId', socialId)
        console.log('name', name)

        props.socialLogin(socialId, name)
    }

    const responseError = (error) => {
        console.log('Error', error)
    }

    return (
        <GoogleLogin
            clientId='527766057569-8f4bb7p9vtnj310cno38n0jogvb5fhaj.apps.googleusercontent.com'
            render={(renderProps) => <GoogleButton {...renderProps} />}
            onSuccess={responseGoogle}
            onFailure={responseError}
            cookiePolicy={'single_host_origin'}
        />
    )
}

export default connect(null, { socialLogin })(GoogleAuth)
