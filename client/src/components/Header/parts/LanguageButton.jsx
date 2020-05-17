import React from 'react'
import { connect } from 'react-redux'
import { toggleLocale } from '../../../redux/localeReducer'
import Button from '@material-ui/core/Button'
import TranslateIcon from '@material-ui/icons/Translate'
import translate from '../../../i18n/translate'

const LanguageButton = (props) => {
    const onLocaleChanged = () => {
        props.toggleLocale(props.locale.value)
    }

    return (
        <Button color='inherit' size='large' startIcon={<TranslateIcon />} onClick={onLocaleChanged}>
            {translate('header.language')}
        </Button>
    )
}

let mapStateToProps = (state) => ({
    locale: state.locale,
})

export default connect(mapStateToProps, { toggleLocale })(LanguageButton)
