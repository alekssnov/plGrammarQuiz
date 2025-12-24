import type { Question } from "../../quiz/model/types";

export type Test = {
    id: string;
    title: string;
    description?: string;
    tags?: string[];
    level?: "A1" | "A2" | "B1" | "B2" | "C1" | "C2";

    // банк вопросов
    questions: Question[];

    // настройки попытки
    attempt: {
        mode: "random";
        count: number; // например 10
        // later: allowRepeat?: boolean, tagFilter?: string[], difficultyMix etc.
    };
};
