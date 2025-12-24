import { Card, CardContent, Stack, Typography } from "@mui/material";

export function SettingsPage() {
    return (
        <Card>
            <CardContent>
                <Stack spacing={1}>
                    <Typography variant="h6" sx={{ fontWeight: 800 }}>
                        Settings
                    </Typography>
                    <Typography sx={{ opacity: 0.8 }}>
                        Later: import/export questions, reset progress, theme.
                    </Typography>
                </Stack>
            </CardContent>
        </Card>
    );
}
