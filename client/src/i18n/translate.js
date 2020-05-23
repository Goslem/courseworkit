import React from 'react'
import { FormattedMessage } from 'react-intl'

const translate = (id, value = '') => {
    return <FormattedMessage id={id}>{(text) => text + value}</FormattedMessage>
}

export default translate
