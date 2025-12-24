import React from "react";
import { getCatalog } from "../../features/catalog/repo/testsRepo";
import { Card, CardContent, Stack, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export function CatalogPage() {
    const nav = useNavigate();
    const [tests, setTests] = React.useState<any[]>([]);

    React.useEffect(() => {
        getCatalog().then(setTests);
    }, []);

    return (
        <Stack spacing={2}>
            {tests.map(t => (
                <Card key={t.id}>
                    <CardContent>
                        <Typography sx={{ fontWeight: 800 }}>{t.title}</Typography>
                        <Typography variant="body2">
                            {t.questionCount} questions → {t.attempt.count} per attempt
                        </Typography>
                        <Button onClick={() => nav(`/t/${t.id}`)}>Open</Button>
                    </CardContent>
                </Card>
            ))}
        </Stack>
    );
}
