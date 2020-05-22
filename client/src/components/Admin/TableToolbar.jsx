import React from 'react'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import translate from '../../i18n/translate'
import { connect } from 'react-redux'
import {
    setAdmins,
    deleteAdmins,
    blockUsers,
    unblockUsers,
    deleteUsers,
} from '../../redux/usersReducer'

import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'
import LaunchIcon from '@material-ui/icons/Launch'
import LockIcon from '@material-ui/icons/Lock'
import LockOpenIcon from '@material-ui/icons/LockOpen'
import PersonAddIcon from '@material-ui/icons/PersonAdd'
import PersonAddDisabledIcon from '@material-ui/icons/PersonAddDisabled'

const useStyles = makeStyles((theme) => ({
    root: {
        minWidth: 650,
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(1),
    },
    highlight:
        theme.palette.type === 'light'
            ? {
                  color: '#E0004E',
                  backgroundColor: theme.palette.secondary.light,
              }
            : {
                  color: theme.palette.text.primary,
                  backgroundColor: theme.palette.secondary.dark,
              },
    title: {
        flexGrow: 1,
    },
}))

const TableToolbarUsers = (props) => {
    const classes = useStyles()
    const { numSelected } = props

    const onFollowing = () => {
        if (props.selected.length === 0) return
        window.open('profile/' + props.selected[0], '_blank')
    }

    const onAdminsAdd = () => {
        if (props.selected.length === 0) return
        props.setAdmins(props.selected)
    }

    const onAdminsDelete = () => {
        if (props.selected.length === 0) return
        props.deleteAdmins(props.selected)
    }

    const onUsersBlock = () => {
        if (props.selected.length === 0) return
        props.blockUsers(props.selected)
    }

    const onUsersUnblock = () => {
        if (props.selected.length === 0) return
        props.unblockUsers(props.selected)
    }

    const onUsersDelete = () => {
        if (props.selected.length === 0) return
        props.deleteUsers(props.selected)
    }

    return (
        <Toolbar className={clsx(classes.root, { [classes.highlight]: numSelected > 0 })}>
            {numSelected > 0 ? (
                <Typography
                    className={classes.title}
                    color='inherit'
                    variant='subtitle1'
                    component='div'
                >
                    {numSelected} {translate('admin.selected')}
                </Typography>
            ) : (
                <Typography className={classes.title} variant='h6' id='tableTitle' component='div'>
                    {translate('admin.tableLogo')}
                </Typography>
            )}

            <IconButton onClick={onFollowing} disabled={props.isFetching}>
                <LaunchIcon />
            </IconButton>
            <IconButton onClick={onAdminsAdd} disabled={props.isFetching}>
                <PersonAddIcon />
            </IconButton>
            <IconButton onClick={onAdminsDelete} disabled={props.isFetching}>
                <PersonAddDisabledIcon />
            </IconButton>
            <IconButton onClick={onUsersBlock} disabled={props.isFetching}>
                <LockIcon />
            </IconButton>
            <IconButton onClick={onUsersUnblock} disabled={props.isFetching}>
                <LockOpenIcon />
            </IconButton>
            <IconButton onClick={onUsersDelete} disabled={props.isFetching}>
                <DeleteIcon />
            </IconButton>
        </Toolbar>
    )
}

const mapStateToProps = (state) => ({
    isFetching: state.users.isFetching,
})

export default connect(mapStateToProps, {
    setAdmins,
    deleteAdmins,
    blockUsers,
    unblockUsers,
    deleteUsers,
})(TableToolbarUsers)
