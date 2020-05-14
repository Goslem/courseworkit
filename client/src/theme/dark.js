import { createMuiTheme } from '@material-ui/core'

const darkTheme = () => createMuiTheme({
    palette: {
        type: 'dark',
        primary: {
            main: '#333333',
        },
    },
})

export default darkTheme
