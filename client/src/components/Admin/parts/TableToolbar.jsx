import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import translate from '../../../i18n/translate'
import { connect } from 'react-redux'
import {
    blockUsers,
    unblockUsers,
    setAdmins,
    deleteAdmins,
    deleteUsers,
} from '../../../redux/adminReducer'
import clsx from 'clsx'
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
    highlight: {
        backgroundColor: theme.palette.secondary.light,
    },
    title: {
        flexGrow: 1,
    },
}))

const TableToolbarComponent = (props) => {
    const classes = useStyles()

    const onFollowing = () => {
        window.open('profile/' + props.selected[0], '_blank')
    }

    const onUsersBlock = () => {
        props.blockUsers(props.selected)
    }

    const onUsersUnblock = () => {
        props.unblockUsers(props.selected)
    }

    const onAdminsAdd = () => {
        props.setAdmins(props.selected)
    }

    const onAdminsDelete = () => {
        props.deleteAdmins(props.selected)
    }

    const onUsersDelete = () => {
        if (props.selected.length > 10) {
            props.setPage(0)
        }
        props.deleteUsers(props.selected, props.users.length, props.usersCount)
        props.setSelected([])
    }

    return (
        <Toolbar className={clsx(classes.root, { [classes.highlight]: props.selected.length > 0 })}>
            {props.selected.length > 0 ? (
                <Typography
                    className={classes.title}
                    color='inherit'
                    variant='subtitle1'
                    component='div'
                >
                    {props.selected.length} {translate('admin.selected')}
                </Typography>
            ) : (
                <Typography className={classes.title} variant='h6' component='div'>
                    {translate('admin.tableLogo')}
                </Typography>
            )}

            <IconButton
                onClick={onFollowing}
                disabled={props.isFetching || props.selected.length === 0}
            >
                <LaunchIcon />
            </IconButton>

            <IconButton
                onClick={onUsersBlock}
                disabled={props.isFetching || props.selected.length === 0}
            >
                <LockIcon />
            </IconButton>

            <IconButton
                onClick={onUsersUnblock}
                disabled={props.isFetching || props.selected.length === 0}
            >
                <LockOpenIcon />
            </IconButton>

            <IconButton
                onClick={onAdminsAdd}
                disabled={props.isFetching || props.selected.length === 0}
            >
                <PersonAddIcon />
            </IconButton>

            <IconButton
                onClick={onAdminsDelete}
                disabled={props.isFetching || props.selected.length === 0}
            >
                <PersonAddDisabledIcon />
            </IconButton>

            <IconButton
                onClick={onUsersDelete}
                disabled={props.isFetching || props.selected.length === 0}
            >
                <DeleteIcon />
            </IconButton>
        </Toolbar>
    )
}

const mapStateToProps = (state) => ({
    isFetching: state.admin.isFetching,
})

export default connect(mapStateToProps, {
    blockUsers,
    unblockUsers,
    setAdmins,
    deleteAdmins,
    deleteUsers,
})(TableToolbarComponent)
