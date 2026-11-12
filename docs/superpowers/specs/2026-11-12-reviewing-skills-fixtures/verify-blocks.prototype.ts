import { mkdtempSync, writeFileSync, readFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { spawnSync } from "node:child_process";

type Block = { file: string; line: number; lang: "python" | "typescript"; code: string };

function extract(file: string): Block[] {
  const lines = readFileSync(file, "utf8").split("\n");
  const out: Block[] = [];
  for (let i = 0; i < lines.length; i++) {
    const m = lines[i].match(/^```(python|typescript)\s*$/);
    if (!m) continue;
    const start = i + 1;
    const body: string[] = [];
    for (i = start; i < lines.length && !lines[i].startsWith("```"); i++) body.push(lines[i]);
    if (/^\s*(#|\/\/)\s*fragment\b/.test(body[0] ?? "")) continue;
    out.push({ file, line: start, lang: m[1] as Block["lang"], code: body.join("\n") + "\n" });
  }
  return out;
}

const files = process.argv.slice(2);
if (!files.length) { console.error("usage: verify-blocks.ts <file...>"); process.exit(2); }
const blocks = files.flatMap(extract);
const dir = mkdtempSync(join(tmpdir(), "verify-blocks-"));
writeFileSync(join(dir, "tsconfig.json"), JSON.stringify({
  compilerOptions: { strict: true, target: "ES2022", module: "ES2022", moduleResolution: "bundler", lib: ["ES2022", "DOM"], noEmit: true, skipLibCheck: true, types: ["node"] },
  include: ["*.ts"],
}));
writeFileSync(join(dir, "pyrightconfig.json"), JSON.stringify({ pythonVersion: "3.12", typeCheckingMode: "strict", include: ["*.py"] }));

if (blocks.some((b) => b.lang === "typescript")) { writeFileSync(join(dir, "package.json"), "{}"); const r = spawnSync("bun", ["add", "-d", "@types/node"], { cwd: dir, encoding: "utf8" }); if (r.status !== 0) { console.error(r.stderr); process.exit(2); } }
const names = new Map<string, Block>();
blocks.forEach((b, n) => {
  const name = `b${n}.${b.lang === "python" ? "py" : "ts"}`;
  names.set(name, b);
  writeFileSync(join(dir, name), b.code + (b.lang === "typescript" ? "export {};\n" : ""));
});

const bad = new Set<Block>();
function run(cmd: string[], re: RegExp) {
  const r = spawnSync(cmd[0], cmd.slice(1), { cwd: dir, encoding: "utf8" });
  const text = (r.stdout ?? "") + (r.stderr ?? "");
  for (const l of text.split("\n")) {
    const m = l.match(re);
    if (m && names.has(m[1])) { bad.add(names.get(m[1])!); console.error(l.replace(m[1], `${names.get(m[1])!.file}:${names.get(m[1])!.line}`)); }
  }
  if (r.status !== 0 && !bad.size) { console.error(text); bad.add({ file: "(tool)", line: 0, lang: "python", code: "" }); }
}
if (blocks.some((b) => b.lang === "python")) run(["bunx", "pyright"], /(b\d+\.py)(?=:\d+:\d+ - error)/);
if (blocks.some((b) => b.lang === "typescript")) run(["bunx", "tsc", "--noEmit", "-p", "."], /^(b\d+\.ts)(?=\(\d+,\d+\): error)/);

if (bad.size) { console.error(`FAIL: ${[...bad].map((b) => `${b.file}:${b.line}`).join(", ")}`); process.exit(1); }
console.log(`ok: ${blocks.length} blocks`);
