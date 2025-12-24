// src/pages/TestIntroPage/TestIntroPage.tsx
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
    Alert,
    Button,
    Card,
    CardContent,
    Chip,
    Skeleton,
    Stack,
    Typography,
} from "@mui/material";

import { getTestById } from "../../features/catalog/repo/testsRepo";
import { sampleUnique } from "../../shared/lib/random";
import { useSessionStore } from "../../features/quiz/store/sessionStore";

export function TestIntroPage() {
    const nav = useNavigate();
    const { testId } = useParams();

    const start = useSessionStore((s) => s.start);
    const reset = useSessionStore((s) => s.reset);

    const [test, setTest] = React.useState<any | null>(null);
    const [loading, setLoading] = React.useState(true);
    const [err, setErr] = React.useState<string | null>(null);

    React.useEffect(() => {
        let mounted = true;

        (async () => {
            try {
                setLoading(true);
                setErr(null);

                if (!testId) {
                    throw new Error("Missing testId");
                }

                const t = await getTestById(testId);
                if (!mounted) return;
                setTest(t);
            } catch (e: any) {
                if (!mounted) return;
                setErr(e?.message ?? String(e));
                setTest(null);
            } finally {
                if (!mounted) return;
                setLoading(false);
            }
        })();

        return () => {
            mounted = false;
        };
    }, [testId]);

    const handleStart = async () => {
        if (!testId) return;

        try {
            // на всякий случай сбрасываем прошлую сессию
            reset();

            // гарантируем, что test загружен (если юзер нажал очень быстро)
            const t = test ?? (await getTestById(testId));

            // seed можно сохранять, если потом захочешь воспроизводимость попытки
            const seed = Date.now();

            const pickedIds = sampleUnique(
                t.questions.map((q: any) => q.id),
                t.attempt?.count ?? 10,
                seed
            ).map((idOrObj: any) => (typeof idOrObj === "string" ? idOrObj : idOrObj.id));

            start({ testId: t.id, selectedQuestionIds: pickedIds });

            nav(`/t/${t.id}/run`, { state: { seed } });
        } catch (e: any) {
            setErr(e?.message ?? String(e));
        }
    };

    if (loading) {
        return (
            <Card>
                <CardContent>
                    <Stack spacing={2}>
                        <Skeleton variant="text" height={40} />
                        <Skeleton variant="text" height={24} />
                        <Skeleton variant="rounded" height={120} />
                        <Skeleton variant="rounded" height={44} />
                    </Stack>
                </CardContent>
            </Card>
        );
    }

    if (err) {
        return (
            <Card>
                <CardContent>
                    <Stack spacing={2}>
                        <Alert severity="error">{err}</Alert>
                        <Button variant="contained" onClick={() => nav("/")}>
                            Back to catalog
                        </Button>
                    </Stack>
                </CardContent>
            </Card>
        );
    }

    if (!test) {
        return (
            <Card>
                <CardContent>
                    <Stack spacing={2}>
                        <Typography>Test not found</Typography>
                        <Button variant="contained" onClick={() => nav("/")}>
                            Back to catalog
                        </Button>
                    </Stack>
                </CardContent>
            </Card>
        );
    }

    const bankSize = test.questions?.length ?? 0;
    const perAttempt = test.attempt?.count ?? 10;

    return (
        <Card>
            <CardContent>
                <Stack spacing={2}>
                    <Typography variant="h5" sx={{ fontWeight: 900 }}>
                        {test.title}
                    </Typography>

                    {test.description && (
                        <Typography sx={{ opacity: 0.8 }}>{test.description}</Typography>
                    )}

                    <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap" }}>
                        {test.level && <Chip label={test.level} />}
                        <Chip label={`${bankSize} in bank`} />
                        <Chip label={`${perAttempt} per attempt`} />
                        {(test.tags ?? []).slice(0, 4).map((tag: string) => (
                            <Chip key={tag} label={tag} variant="outlined" />
                        ))}
                    </Stack>

                    <Button variant="contained" fullWidth onClick={handleStart}>
                        Start (random {perAttempt})
                    </Button>

                    <Button variant="outlined" fullWidth onClick={() => nav("/")}>
                        Back to catalog
                    </Button>
                </Stack>
            </CardContent>
        </Card>
    );
}
