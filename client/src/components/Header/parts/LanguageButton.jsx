import React from 'react'
import Button from '@material-ui/core/Button'
import TranslateIcon from '@material-ui/icons/Translate'
import translate from '../../../i18n/translate'

const LanguageButton = ({ toggleLocale }) => {
    return (
        <Button color='inherit' size='large' startIcon={<TranslateIcon />} onClick={toggleLocale}>
            {translate('header.language')}
        </Button>
    )
}
export default LanguageButton
