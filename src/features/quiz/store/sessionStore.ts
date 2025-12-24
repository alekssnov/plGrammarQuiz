import { create } from "zustand";

export type QuizSession = {
    testId: string;
    selectedQuestionIds: string[];
    index: number;
    correct: number;
    answers: Record<string, { userAnswer: string; isCorrect: boolean }>;
};

type SessionState = {
    session: QuizSession | null;
    start: (args: { testId: string; selectedQuestionIds: string[] }) => void;
    answer: (args: { questionId: string; userAnswer: string; isCorrect: boolean }) => void;
    next: () => void;
    reset: () => void;
};

export const useSessionStore = create<SessionState>((set) => ({
    session: null,

    start: ({ testId, selectedQuestionIds }) =>
        set({
            session: {
                testId,
                selectedQuestionIds,
                index: 0,
                correct: 0,
                answers: {},
            },
        }),

    answer: ({ questionId, userAnswer, isCorrect }) =>
        set((st) => {
            const s = st.session;
            if (!s) return st;

            const already = s.answers[questionId];
            // чтобы не пересчитывать корректность при повторном нажатии
            const correctDelta = already ? 0 : isCorrect ? 1 : 0;

            return {
                session: {
                    ...s,
                    correct: s.correct + correctDelta,
                    answers: { ...s.answers, [questionId]: { userAnswer, isCorrect } },
                },
            };
        }),

    next: () =>
        set((st) => {
            const s = st.session;
            if (!s) return st;
            return { session: { ...s, index: s.index + 1 } };
        }),

    reset: () => set({ session: null }),
}));
