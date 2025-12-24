import React from "react";
import { Stack, LinearProgress, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { QuestionCard } from "../../features/quiz/components/QuestionCard";
import { builtInQuestions } from "../../features/quiz/data/builtInQuestions";
import type { AnswerResult } from "../../features/quiz/model/types";

export function TestPage() {
    const navigate = useNavigate();
    const questions = builtInQuestions;

    const [i, setI] = React.useState(0);
    const [correct, setCorrect] = React.useState(0);

    const progress = Math.round(((i) / questions.length) * 100);

    const onNext = (res: AnswerResult) => {
        if (res.isCorrect) setCorrect((c) => c + 1);

        const next = i + 1;
        if (next >= questions.length) {
            navigate("/results", { state: { total: questions.length, correct: res.isCorrect ? correct + 1 : correct } });
            return;
        }
        setI(next);
    };

    return (
        <Stack spacing={2}>
            <Stack spacing={1}>
                <Typography variant="body2" sx={{ opacity: 0.7 }}>
                    Progress
                </Typography>
                <LinearProgress variant="determinate" value={progress} />
            </Stack>

            <QuestionCard
                question={questions[i]}
                index={i}
                total={questions.length}
                onNext={onNext}
            />
        </Stack>
    );
}
