import { Button, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export function NotFoundPage() {
    const navigate = useNavigate();
    return (
        <Stack spacing={2} sx={{ py: 4, textAlign: "center" }}>
            <Typography variant="h6" sx={{ fontWeight: 800 }}>
                Page not found
            </Typography>
            <Button variant="contained" onClick={() => navigate("/")}>
                Go home
            </Button>
        </Stack>
    );
}
