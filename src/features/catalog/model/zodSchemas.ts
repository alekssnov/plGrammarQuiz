import { z } from "zod";

export const SingleQuestionSchema = z.object({
    id: z.string(),
    type: z.literal("single"),
    prompt: z.string(),
    options: z.array(z.string()).min(2),
    correctIndex: z.number(),
    explanation: z.string().optional(),
});

export const TextQuestionSchema = z.object({
    id: z.string(),
    type: z.literal("text"),
    prompt: z.string(),
    correctText: z.string(),
    explanation: z.string().optional(),
});

export const QuestionSchema = z.discriminatedUnion("type", [
    SingleQuestionSchema,
    TextQuestionSchema,
]);

export const TestSchema = z.object({
    id: z.string(),
    title: z.string(),
    attempt: z.object({
        mode: z.literal("random"),
        count: z.number().min(1),
    }),
    questions: z.array(QuestionSchema).min(1),
});

export const TestMetaSchema = z.object({
    id: z.string(),
    title: z.string(),
    description: z.string().optional(),
    level: z.string().optional(),
    tags: z.array(z.string()).optional(),
    questionCount: z.number(),
    attempt: z.object({
        mode: z.literal("random"),
        count: z.number(),
    }),
});
