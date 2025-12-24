// Mulberry32: быстрый детерминированный RNG
export function mulberry32(seed: number) {
    return function () {
        let t = (seed += 0x6D2B79F5);
        t = Math.imul(t ^ (t >>> 15), t | 1);
        t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
}

export function sampleUnique<T>(arr: T[], count: number, seed: number): T[] {
    const rng = mulberry32(seed);
    const copy = arr.slice();
    // Fisher–Yates shuffle
    for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(rng() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy.slice(0, Math.min(count, copy.length));
}
