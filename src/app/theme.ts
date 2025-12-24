import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
    shape: { borderRadius: 16 },
    typography: {
        fontFamily: `"Inter", system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif`,
    },
    components: {
        MuiButton: {
            defaultProps: { disableElevation: true },
        },
        MuiCard: {
            styleOverrides: { root: { borderRadius: 20 } },
        },
    },
});
