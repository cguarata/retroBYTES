import { createTheme } from "@material-ui/core";


const theme = createTheme({
    typography: {
      fontFamily:[
    '-apple-system',
    'Segoe UI',
    'KatahdinRound-Bold'
      ].join(','),
    },
    palette: {
        primary: {
            main: '#e76f51',
        }
    },
    secondary: {
        main: '#264653'
    },
    error: {
        main: '#23134b',
    },
    components: {
        MuiCssOverrides: `
        @font-face {
            font-family: 'KatahdinRound-Bold';
            font-display: swap;
            src: url('./fonts/KatahdinRound-Bold.ttf'), url('./fonts/KatahdinRound-Bold.woff'), url('./fonts/KatahdinRound-Bold.woff2');
        }
        
        `,
        MuiCardContent: {
            root: {
                fontSize: '2rem',
            }
        }
    },
    
});

export default theme;