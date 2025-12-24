import { TestSchema, TestMetaSchema } from "../model/zodSchemas";

const TESTS_BASE = "/tests";

export async function getCatalog() {
    const res = await fetch(`${TESTS_BASE}/index.json`);
    const json = await res.json();
    return TestMetaSchema.array().parse(json);
}

const cache = new Map<string, any>();

export async function getTestById(testId: string) {
    if (cache.has(testId)) return cache.get(testId);

    const res = await fetch(`${TESTS_BASE}/${testId}.json`);
    if (!res.ok) throw new Error("Test not found");

    const json = await res.json();
    const parsed = TestSchema.parse(json);

    cache.set(testId, parsed);
    return parsed;
}
