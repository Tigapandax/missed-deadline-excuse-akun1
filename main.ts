import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const line = readFileSync(new URL("./one-line.txt", import.meta.url), "utf8").replace(/\n$/, "");
if (line.length === 0) { console.error("FAIL: empty line"); process.exit(1); }
if (line.length > 200) { console.error(`FAIL: ${line.length}/200 characters`); process.exit(1); }
if (line.includes("\n") || line.includes("\r")) { console.error("FAIL: not a single line"); process.exit(1); }
if (/ $/.test(line)) { console.error("FAIL: trailing space"); process.exit(1); }
if (/^ /.test(line)) { console.error("FAIL: leading space"); process.exit(1); }
if (!/[.!?]$/.test(line)) { console.error("FAIL: line must end with terminal punctuation"); process.exit(1); }
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), line, "utf8");
console.log(line);
console.log(`OK: ${line.length}/200 characters, single line, wrote entry.txt.`);
