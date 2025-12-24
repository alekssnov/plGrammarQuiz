import { createTheme } from "@mui/material/styles";
import { lightBlue, purple } from "@mui/material/colors";

export const theme = createTheme({
    shape: { borderRadius: 6 },
    typography: {
        fontFamily: `"Inter", system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif`,
    },
    components: {
        MuiButton: {
            defaultProps: { disableElevation: true },
        },
        MuiCard: {
            styleOverrides: { root: { borderRadius: 12 } },
        },
    },
    palette: {
        primary: lightBlue,
        secondary: purple,
        mode: 'dark',
    },
});
