import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Stack, LinearProgress, Typography } from "@mui/material";
import { getTestById } from "../../features/catalog/repo/testsRepo";
import { QuestionCard } from "../../features/quiz/components/QuestionCard";
import type { AnswerResult } from "../../features/quiz/model/types";
import { useSessionStore } from "../../features/quiz/store/sessionStore";

export function TestRunnerPage() {
    const nav = useNavigate();
    const { testId } = useParams();

    const session = useSessionStore((s) => s.session);
    const answer = useSessionStore((s) => s.answer);
    const next = useSessionStore((s) => s.next);

    const [test, setTest] = React.useState<any | null>(null);
    const [err, setErr] = React.useState<string | null>(null);

    React.useEffect(() => {
        if (!testId) return;
        getTestById(testId).then(setTest).catch((e) => setErr(String(e)));
    }, [testId]);

    if (!testId) return <Typography>Missing testId</Typography>;
    if (err) return <Typography>Error: {err}</Typography>;
    if (!test) return <Typography>Loading…</Typography>;

    if (!session || session.testId !== test.id) {
        return <Typography>Session not started. Go back and press Start.</Typography>;
    }

    const ids: string[] = session.selectedQuestionIds;
    const total = ids.length;

    const currentId = ids[session.index];
    const question = test.questions.find((q: any) => q.id === currentId);
    if (!question) return <Typography>Question not found</Typography>;

    const progress = Math.round((session.index / total) * 100);

    const onNext = (res: AnswerResult) => {
        answer({ questionId: question.id, userAnswer: res.userAnswer, isCorrect: res.isCorrect });

        const isLast = session.index + 1 >= total;
        if (isLast) {
            nav(`/t/${test.id}/results`, {
                state: { testId: test.id, total, correct: session.correct + (res.isCorrect ? 1 : 0) },
            });
            return;
        }
        next();
    };

    return (
        <Stack spacing={2}>
            <Stack spacing={1}>
                <Typography variant="body2" sx={{ opacity: 0.7 }}>
                    {test.title} — {total} random questions
                </Typography>
                <LinearProgress variant="determinate" value={progress} />
            </Stack>

            <QuestionCard
                question={question}
                index={session.index}
                total={total}
                onNext={onNext}
            />
        </Stack>
    );
}
