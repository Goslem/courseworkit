import React from 'react'
import Button from '@material-ui/core/Button'
import TranslateIcon from '@material-ui/icons/Translate'
import { FormattedMessage } from 'react-intl'

const LanguageButton = ({ toggleLocale }) => {
    return (
        <Button color='inherit' size='large' startIcon={<TranslateIcon />} onClick={toggleLocale}>
            <FormattedMessage id='header.language' />
        </Button>
    )
}
export default LanguageButton
