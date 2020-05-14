import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
    header: {
        backgroundColor: '#F8F9FA',
        boxShadow: '0 .125rem .25rem rgba(0,0,0,.075)',
    },
    title: {
        flexGrow: 1,
        color: '#8C1819',
        fontWeight: 'normal',
    },
    login: {
        color: '#8C1819',
        textDecoration: 'none',
        fontSize: 14
    },
    avatar: {
        color: '#8C1819',
    },
}))

export default useStyles
