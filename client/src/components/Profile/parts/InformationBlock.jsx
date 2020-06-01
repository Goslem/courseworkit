import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'
import {
    getUserInfo,
    setUserName,
    setUserSurname,
    setUserCountry,
    setUserCity,
} from '../../../redux/profileReducer'
import translate from '../../../i18n/translate'
import Paper from '@material-ui/core/Paper'
import Toolbar from '@material-ui/core/Toolbar'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        marginBottom: 30,
    },
    userInfo: {
        padding: '0 20px 10px',
        [theme.breakpoints.down('xs')]: {
            padding: '0 14px 2px',
        },
    },
    card: {
        color: theme.palette.text.secondary,
    },
    title: {
        fontSize: 14,
    },
    userName: {
        marginBottom: 12,
    },
}))

const InformationBlock = (props) => {
    const classes = useStyles()

    useEffect(() => {
        props.getUserInfo(props.userId)
    }, [])

    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')
    const [country, setCountry] = useState('')
    const [city, setCity] = useState('')

    const onNameChange = (event) => {
        setName(event.target.value)
    }

    const onSurnameChange = (event) => {
        setSurname(event.target.value)
    }

    const onCountryChange = (event) => {
        setCountry(event.target.value)
    }

    const onCityChange = (event) => {
        setCity(event.target.value)
    }

    const [isEditing, setEditing] = useState({
        name: false,
        surname: false,
        country: false,
        city: false,
    })

    const activateEditMode = (event) => {
        if (!props.editMode) return

        setEditing({
            ...isEditing,
            [event.target.dataset.type]: true,
        })
    }

    const deactivateEditMode = () => {
        if (!props.editMode) return

        setEditing({
            name: false,
            surname: false,
            country: false,
            city: false,
        })
    }

    const onUserInputCompletion = (event) => {
        deactivateEditMode()

        switch (event.target.name) {
            case 'name':
                props.setUserName(props.userId, event.target.value)
                break
            case 'surname':
                props.setUserSurname(props.userId, event.target.value)
                break
            case 'country':
                props.setUserCountry(props.userId, event.target.value)
                break
            case 'city':
                props.setUserCity(props.userId, event.target.value)
                break
        }
    }

    return (
        <Paper className={classes.root}>
            <Toolbar>
                <Typography variant='h6' component='div'>
                    {translate('profile.informationBlock.userInfo')}
                </Typography>
            </Toolbar>

            <Grid container spacing={3} className={classes.userInfo}>
                <Grid item md={3} sm={6} xs={12}>
                    <Card className={classes.card} variant='outlined'>
                        <CardContent>
                            <Typography className={classes.userName}>
                                {translate('profile.informationBlock.name')}
                            </Typography>

                            {props.editMode && isEditing.name ? (
                                <TextField
                                    name='name'
                                    value={name}
                                    autoComplete='off'
                                    variant='outlined'
                                    autoFocus
                                    onChange={onNameChange}
                                    onBlur={onUserInputCompletion}
                                />
                            ) : (
                                <Typography
                                    variant='body2'
                                    component='p'
                                    onDoubleClick={activateEditMode}
                                    data-type='name'
                                >
                                    {props.name || 'unknown'}
                                </Typography>
                            )}
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item md={3} sm={6} xs={12}>
                    <Card className={classes.card} variant='outlined'>
                        <CardContent>
                            <Typography className={classes.userName}>
                                {translate('profile.informationBlock.surname')}
                            </Typography>

                            {props.editMode && isEditing.surname ? (
                                <TextField
                                    name='surname'
                                    value={surname}
                                    autoComplete='off'
                                    variant='outlined'
                                    autoFocus
                                    onChange={onSurnameChange}
                                    onBlur={onUserInputCompletion}
                                />
                            ) : (
                                <Typography
                                    variant='body2'
                                    component='p'
                                    onDoubleClick={activateEditMode}
                                    data-type='surname'
                                >
                                    {props.surname || 'unknown'}
                                </Typography>
                            )}
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item md={3} sm={6} xs={12}>
                    <Card className={classes.card} variant='outlined'>
                        <CardContent>
                            <Typography className={classes.userName}>
                                {translate('profile.informationBlock.country')}
                            </Typography>

                            {props.editMode && isEditing.country ? (
                                <TextField
                                    name='country'
                                    value={country}
                                    autoComplete='off'
                                    variant='outlined'
                                    autoFocus
                                    onChange={onCountryChange}
                                    onBlur={onUserInputCompletion}
                                />
                            ) : (
                                <Typography
                                    variant='body2'
                                    component='p'
                                    onDoubleClick={activateEditMode}
                                    data-type='country'
                                >
                                    {props.country || 'unknown'}
                                </Typography>
                            )}
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item md={3} sm={6} xs={12}>
                    <Card className={classes.card} variant='outlined'>
                        <CardContent>
                            <Typography className={classes.userName}>
                                {translate('profile.informationBlock.city')}
                            </Typography>

                            {props.editMode && isEditing.city ? (
                                <TextField
                                    name='city'
                                    value={city}
                                    autoComplete='off'
                                    variant='outlined'
                                    autoFocus
                                    onChange={onCityChange}
                                    onBlur={onUserInputCompletion}
                                />
                            ) : (
                                <Typography
                                    variant='body2'
                                    component='p'
                                    onDoubleClick={activateEditMode}
                                    data-type='city'
                                >
                                    {props.city || 'unknown'}
                                </Typography>
                            )}
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Paper>
    )
}

const mapStateToProps = (state) => ({
    name: state.profile.userInfo.name,
    surname: state.profile.userInfo.surname,
    country: state.profile.userInfo.country,
    city: state.profile.userInfo.city,
    editMode: state.profile.editMode,
})

export default connect(mapStateToProps, {
    getUserInfo,
    setUserName,
    setUserSurname,
    setUserCountry,
    setUserCity,
})(InformationBlock)
