import React from 'react'
import { FormattedMessage } from 'react-intl'

const translate = (id, string = '') => {
    return <FormattedMessage id={id}>{(text) => text + string}</FormattedMessage>
}

export default translate
