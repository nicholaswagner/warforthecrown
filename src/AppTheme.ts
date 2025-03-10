import { createTheme } from "@mui/material";
import { deepmerge } from "@mui/utils";
import type { } from "@mui/x-tree-view/themeAugmentation";





export const baseTheme = createTheme({
    palette: {
        common: {
            black: '#000',
            white: '#fff',
        },
    },
    typography: {
        fontFamily: ['Gentium Book Plus', 'serif'].join(','),
        fontWeightLight: 400,
        fontWeightRegular: 400,
        fontWeightBold: 700,
        fontWeightMedium: 400,
    },
    components: {
        MuiTypography: {
            styleOverrides: {
                root: {
                    fontSize: '1rem',
                },
            },
        },
        MuiButtonBase: {
            defaultProps: {
                disableRipple: true,
            },
        },
        MuiTable: {
            styleOverrides: {
                root: {
                    padding: 2,
                },
            },
        },
        MuiRichTreeView: {
            styleOverrides: {
                root: {},
            },
        },
    },
});


export const lightTheme = createTheme(deepmerge(baseTheme, {
    palette: {
        mode: 'light',
        primary: {
            main: 'rgb(130, 16, 88)',
        },
        secondary: {
            main: 'rgb(190,137,160)',
        },
        background: {
            default: `rgba(247,247,247,1)`,
            // default: `#e6e6e6`,
            paper: `rgb(240, 235, 238)`,
        },
        divider: 'rgba(130, 16, 88, 0.4)',
        text: {
            primary: `rgb(51,51,51)`,
            secondary: 'rgb(142 142 142)',
        },
        info: {
            main: `rgb(174, 169, 172)`,
            light: `rgb(218, 201, 212)`,
        },
        action: {
            visited: `rgb(42, 40, 40)`,
            active: `rgb(130, 16, 88)`,
            hover: `rgb(130, 16, 88)`,
            selected: `rgb(130, 16, 88)`,
            disabled: `rgb(103, 103, 103)`,
            disabledBackground: `rgb(130, 16, 88)`,
        }
    },
    cssVariables: {
        cssVarPrefix: '', // Optional: You can set a prefix if needed
        colorSchemeSelector: 'class', // Use class-based color scheme toggle
    },
}));

export const darkTheme = createTheme(deepmerge(baseTheme, {
    palette: {
        mode: 'dark',
        primary: {
            // main: '#ac1457',
            main: 'rgb(232,233,248)',
            // main: '#880E4F',
            // main: 'rgb(130, 16, 88)',
            // main: '#3b3b48',
            // main: '#14333c',
            // main: '#e8e9f8',
            contrastText: 'rgb(23,22,28)',
        },
        secondary: {
            // main: '#be89a0',
            // main: '#a5231c',
            // main: '#14333c',
            // main: '#c0dae2',
            main: 'rgb(160,38,98)',
        },
        background: {
            // default: `rgb(26,27,38)`,
            // default: `rgb(50,27,38)`,
            // default: `rgb(50,32,41)`,
            // default: `rgb(55 19 33)`,
            // default: `rgb(61 20 32)`,
            // default: `rgb(33 18 31)`,
            // default: `#14333c`,
            default: `rgb(23,22,28)`,
            // paper: `rgb(78,83,117)`,
            // paper: `rgb(118 94 117)`,
            // paper: `rgb(101 80 95)`,
            // paper: `#be404d`,
            // paper: `#ebe0e8`,
            // paper: `#3b3b48`,
            // paper: `#b5b5c4`,
            paper: `rgb(37,40,49)`,
        },
        divider: 'rgba(84,89,126,1)',
        // divider: 'rgba(130, 16, 88, 0.4)',
        text: {
            // primary: `rgb(237, 237, 237)`,
            // secondary: 'rgb(182, 168, 168)',
            primary: `#f1f1ff`,
            secondary: '#6d6d7b',
            contrastText: 'rgb(23 22 29)',
        },
        info: {
            main: `rgb(36, 18, 28)`,
            light: `rgb(36, 31, 64)`,
        },

    },
    cssVariables: {
        cssVarPrefix: '', // Optional: You can set a prefix if needed
        colorSchemeSelector: 'class', // Use class-based color scheme toggle
    },
}));
