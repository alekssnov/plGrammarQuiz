import type { AnswerResult, Question } from "./types";

const normalize = (s: string) =>
    s.trim().toLowerCase().replace(/\s+/g, " ");

export function checkAnswer(q: Question, userAnswer: string): AnswerResult {
    if (q.type === "single") {
        const idx = Number(userAnswer);
        const correct = q.correctIndex;
        return {
            isCorrect: idx === correct,
            userAnswer: q.options[idx] ?? "",
            correctAnswer: q.options[correct] ?? "",
        };
    }

    // text
    const ok = normalize(userAnswer) === normalize(q.correctText);
    return {
        isCorrect: ok,
        userAnswer,
        correctAnswer: q.correctText,
    };
}
