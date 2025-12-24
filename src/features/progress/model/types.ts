export type AttemptAnswer = {
    questionId: string;
    userAnswer: string;
    isCorrect: boolean;
};

export type Attempt = {
    id: string;          // uuid
    testId: string;
    startedAt: number;   // Date.now()
    finishedAt: number;
    correct: number;
    total: number;
    answers: AttemptAnswer[];
};

export type TestProgress = {
    testId: string;
    totalAttempts: number;
    bestCorrect: number;
    lastCorrect: number;
    lastFinishedAt: number;
};
