import React from 'react'
import FacebookLogin from 'react-facebook-login'

const FacebookAuth = (props) => {
    const responseFacebook = (response) => {
        console.log(response)
    }

    return (
        <FacebookLogin
            appId='271109940744192'
            autoLoad={false}
            fields='name,email'
            onClick={responseFacebook}
            callback={responseFacebook}
            render={(renderProps) => (
                <button onClick={renderProps.onClick}>This is my custom FB button</button>
            )}
        />
    )
}

export default FacebookAuth
