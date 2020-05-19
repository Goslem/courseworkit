import React from 'react'
import { makeStyles, fade } from '@material-ui/core/styles'
import SearchIcon from '@material-ui/icons/Search'
import InputBase from '@material-ui/core/InputBase'
import { FormattedMessage } from 'react-intl'

const useStyles = makeStyles((theme) => ({
    search: {
        marginLeft: theme.spacing(3),
        marginRight: theme.spacing(2),
        flexGrow: 1,
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        [theme.breakpoints.down('md')]: {
            marginRight: theme.spacing(1),
        },
        [theme.breakpoints.down('xs')]: {
            marginLeft: theme.spacing(1),
        },
    },
    searchIcon: {
        height: '100%',
        padding: theme.spacing(0, 2),
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        width: '100%',
        color: 'inherit',
    },
    inputInput: {
        width: '100%',
        padding: theme.spacing(1, 1, 1, 6.1),
        transition: theme.transitions.create('width'),
    },
}))

const Search = () => {
    const classes = useStyles()

    return (
        <div className={classes.search}>
            <div className={classes.searchIcon}>
                <SearchIcon />
            </div>

            <FormattedMessage id='header.search'>
                {(text) => (
                    <InputBase
                        placeholder={text}
                        classes={{
                            root: classes.inputRoot,
                            input: classes.inputInput,
                        }}
                    />
                )}
            </FormattedMessage>
        </div>
    )
}

export default Search
