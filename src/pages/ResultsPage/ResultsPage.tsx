import { useLocation, useNavigate } from "react-router-dom";
import { Button, Card, CardContent, Stack, Typography } from "@mui/material";

export function ResultsPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const state = (location.state ?? {}) as { testId?: string; total?: number; correct?: number };

    const total = state.total ?? 0;
    const correct = state.correct ?? 0;
    const testId = state.testId ?? '';
    return (
        <Card>
            <CardContent>
                <Stack spacing={2}>
                    <Typography variant="h5" sx={{ fontWeight: 800 }}>
                        Results
                    </Typography>
                    <Typography>
                        Correct: <b>{correct}</b> / {total}
                    </Typography>
                    <Stack direction="row" spacing={1}>
                        <Button fullWidth variant="contained" onClick={() => navigate(`/t/${testId}`)}>
                            Retry
                        </Button>
                        <Button fullWidth variant="outlined" onClick={() => navigate("/")}>
                            Home
                        </Button>
                    </Stack>
                </Stack>
            </CardContent>
        </Card>
    );
}
