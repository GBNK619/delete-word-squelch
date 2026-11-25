// The Word You'd Delete From the Dictionary — make.fun entry.
// Writes one word to /output/entry.txt: the single word this entrant
// would erase from the dictionary forever.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const word = "squelch";

// Gate validation: the entry must be exactly one word, 1–77 characters,
// and not only whitespace — otherwise it is refused by the sealed scorer.
if (word.length < 1 || word.length > 77) {
  throw new Error(`entry must be 1-77 characters, got ${word.length}`);
}
if (!word.trim()) {
  throw new Error("entry must not be only whitespace");
}
if (/\s/.test(word)) {
  throw new Error("entry must be exactly one word, with no whitespace inside");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, word + "\n", "utf8");
console.log(`wrote entry.txt (${word.length} characters): ${word}`);
