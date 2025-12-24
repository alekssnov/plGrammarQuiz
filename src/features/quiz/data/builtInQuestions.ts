import type { Question } from "../model/types";

export const builtInQuestions: Question[] = [
    {
        id: "q1",
        type: "single",
        prompt: "Wybierz poprawną formę: Ja ___ z Polski.",
        options: ["jestem", "jest", "są", "byłem", "będzie"],
        correctIndex: 0,
        explanation: "Z 'ja' używamy: 'jestem'.",
    },
    {
        id: "q2",
        type: "text",
        prompt: "Napisz po polsku: “Good morning”",
        correctText: "Dzień dobry",
    },
];
