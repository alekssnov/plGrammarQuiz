export type QuestionBase = {
    id: string;
    prompt: string;
    explanation?: string;
};

export type SingleChoiceQuestion = QuestionBase & {
    type: "single";
    options: string[]; // 5 вариантов
    correctIndex: number;
};

export type TextQuestion = QuestionBase & {
    type: "text";
    correctText: string; // ожидаемый ответ
    // можно позже добавить accept[] / regex / normalizer rules
};

export type Question = SingleChoiceQuestion | TextQuestion;

export type AnswerResult = {
    isCorrect: boolean;
    userAnswer: string;
    correctAnswer: string;
};
