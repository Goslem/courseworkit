import { makeStyles, fade } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
    grow: {
        flexGrow: 1,
    },
    toolbar: {
        flexWrap: 'wrap',
        minHeight: 128,
        [theme.breakpoints.up('md')]: {
            minHeight: 64,
        },
    },
    title: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    logoLink: {
        color: 'white',
        textDecoration: 'none',
        textTransform: 'uppercase',
        fontWeight: 'normal',
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(1),
        marginLeft: 0,
        flexGrow: 1,
        [theme.breakpoints.up('md')]: {
            marginRight: theme.spacing(2),
        },
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
        width: '100%',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
    },
    sectionDesktop: {
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        justifyContent: 'flex-end',
        [theme.breakpoints.up('md')]: {
            width: 'auto',
        },
    },
}))

export default useStyles
