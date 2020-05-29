import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'
import { setEditMode } from '../../../redux/companyReducer'
import translate from '../../../i18n/translate'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Switch from '@material-ui/core/Switch'

const useStyles = makeStyles((theme) => ({
    root: {
        marginBottom: 20,
        display: 'flex',
        justifyContent: 'flex-end',
    },
}))

const EditMode = (props) => {
    const classes = useStyles()

    return (
        <div className={classes.root}>
            <FormControlLabel
                control={
                    <Switch
                        checked={props.editMode}
                        onChange={(event) => {
                            props.setEditMode(event.target.checked)
                        }}
                        name='editMode'
                        color='primary'
                    />
                }
                label={translate('company.editMode')}
            />
        </div>
    )
}

const mapStateToProps = (state) => ({
    editMode: state.company.editMode,
})

export default connect(mapStateToProps, { setEditMode })(EditMode)
