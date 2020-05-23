import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({}))

const InformationBlock = (props) => {
    const classes = useStyles()

    return <div className={classes.about}>Описание человека</div>
}

export default InformationBlock
