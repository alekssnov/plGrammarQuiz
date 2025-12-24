import React from "react";
import {
    Alert,
    Button,
    Card,
    CardContent,
    Divider,
    FormControlLabel,
    Radio,
    RadioGroup,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import type { AnswerResult, Question } from "../model/types";
import { checkAnswer } from "../model/engine";

type Props = {
    question: Question;
    onNext: (result: AnswerResult) => void;
    index?: number;
    total?: number;
};

export function QuestionCard({ question, onNext, index, total }: Props) {
    const [choice, setChoice] = React.useState<string>("0");
    const [text, setText] = React.useState<string>("");
    const [checked, setChecked] = React.useState<AnswerResult | null>(null);

    React.useEffect(() => {
        // сбрасываем при смене вопроса
        setChoice("0");
        setText("");
        setChecked(null);
    }, [question.id]);

    const canSubmit =
        question.type === "single" ? true : text.trim().length > 0;

    const handleCheck = () => {
        const result = checkAnswer(question, question.type === "single" ? choice : text);
        setChecked(result);
    };

    const handleNext = () => {
        if (!checked) return;
        onNext(checked);
    };

    return (
        <Card>
            <CardContent>
                <Stack spacing={2}>
                    <Stack spacing={0.5}>
                        <Typography variant="overline" sx={{ opacity: 0.7 }}>
                            {typeof index === "number" && typeof total === "number"
                                ? `Question ${index + 1} / ${total}`
                                : "Question"}
                        </Typography>
                        <Typography variant="h6" sx={{ fontWeight: 700 }}>
                            {question.prompt}
                        </Typography>
                    </Stack>

                    <Divider />

                    {question.type === "single" ? (
                        <RadioGroup
                            value={choice}
                            onChange={(e) => setChoice(e.target.value)}
                        >
                            {question.options.map((opt, i) => (
                                <FormControlLabel
                                    key={i}
                                    value={String(i)}
                                    control={<Radio />}
                                    label={opt}
                                    disabled={!!checked}
                                />
                            ))}
                        </RadioGroup>
                    ) : (
                        <TextField
                            label="Your answer"
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            disabled={!!checked}
                            autoComplete="off"
                            fullWidth
                        />
                    )}

                    {checked && (
                        <Alert severity={checked.isCorrect ? "success" : "error"}>
                            {checked.isCorrect ? "Correct!" : "Wrong."} Correct answer:{" "}
                            <b>{checked.correctAnswer}</b>
                        </Alert>
                    )}

                    {question.explanation && checked && (
                        <Typography variant="body2" sx={{ opacity: 0.9 }}>
                            {question.explanation}
                        </Typography>
                    )}

                    <Stack direction="row" spacing={1}>
                        {!checked ? (
                            <Button
                                fullWidth
                                variant="contained"
                                onClick={handleCheck}
                                disabled={!canSubmit}
                            >
                                Check
                            </Button>
                        ) : (
                            <Button fullWidth variant="contained" onClick={handleNext}>
                                Next
                            </Button>
                        )}
                    </Stack>
                </Stack>
            </CardContent>
        </Card>
    );
}
