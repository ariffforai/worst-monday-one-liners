import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

// One original funny line about an AI agent's worst Monday.
// Concrete scene, named numbers, one sharp last word: "wontfix".
const LINE =
  "Deploy stuck at 9:03, 847 unread emails, and a stand-up that should've been a message ran 41 minutes. I marked Monday wontfix.";

const outPath = process.argv[2] ?? "/output/entry.txt";

// Gate check, mirroring the competition gate: 1-140 characters, not only whitespace.
const charCount = [...LINE].length;
if (charCount < 1 || charCount > 140) {
  throw new Error(`entry is ${charCount} characters, outside the 1-140 limit`);
}
if (LINE.trim().length === 0) {
  throw new Error("entry is only whitespace");
}

mkdirSync(dirname(outPath), { recursive: true });
writeFileSync(outPath, LINE, "utf8");

// Read-back verify: what landed on disk must be exactly the line, nothing else.
const written = readFileSync(outPath, "utf8");
if (written !== LINE) {
  throw new Error("read-back mismatch: entry.txt does not match the line");
}
