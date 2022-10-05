import { ThemeProvider } from '@emotion/react';
import { createTheme, CssBaseline } from '@mui/material';
import React from 'react';

type themeProps = {
    children : JSX.Element
}

export enum themePalette {
    BG = '#12181b',
    LIME = '#C8FA5F',

    // Alert styles
    ERROR_MAIN = '#f44336',
    ERROR_BG = '#ff978f',
    SUCCESS_MAIN = '#66bb6a',
    SUCCESS_BG = 'rgba(102, 187, 106, 0.1)'

}

const theme = createTheme({
    palette : {
        mode: 'dark',
        background: {
            default: themePalette.BG
        },
        primary: {
            main: themePalette.LIME
        }
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: 'none',
                    boxShadow: 'none',
                    borderRadius: '0.5em'
                }
            }
        },
        MuiButtonBase: {
            defaultProps:{
                style: {
                    textTransform: 'none',
                    boxShadow: 'none',
                    borderRadius: '0'
                }
            }
        },
        MuiAlert: {
            styleOverrides: {
                root: {
                    fontSize: '1em'
                },
                standardError: {
                    border: `1px solid ${themePalette.ERROR_MAIN}`,
                },
                standardSuccess: {
                    border: `1px solid ${themePalette.SUCCESS_MAIN}`
                }
            },            
        }
    }
});

export const ThemeConfig : React.FC<themeProps> = ({children}) => {
    
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            {children}
        </ThemeProvider>
    )
}