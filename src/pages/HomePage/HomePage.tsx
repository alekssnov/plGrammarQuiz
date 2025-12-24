import { Button, Card, CardContent, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export function HomePage() {
    const navigate = useNavigate();
    return (
        <Card>
            <CardContent>
                <Stack spacing={2}>
                    <Typography variant="h5" sx={{ fontWeight: 800 }}>
                        Polish Grammar Quiz
                    </Typography>
                    <Typography sx={{ opacity: 0.8 }}>
                        Short daily practice: questions + options or typed answers.
                    </Typography>
                    <Button variant="contained" fullWidth onClick={() => navigate("/test")}>
                        Start
                    </Button>
                </Stack>
            </CardContent>
        </Card>
    );
}
