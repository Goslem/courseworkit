import { createMuiTheme } from '@material-ui/core'

const lightTheme = () => createMuiTheme({
    palette: {
        type: 'light',
        primary: {
            main: '#1976D2',
        },
    },
})

export default lightTheme
