import { readFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const app = await readFile(join(root, "src", "app.js"), "utf8");
const html = await readFile(join(root, "src", "index.html"), "utf8");

const leetcodeLinks = app.match(/https:\/\/leetcode\.com\/problems\/[^"/]+\//g) ?? [];
const legacyReferences = /백준|acmicpc\.net/.test(app + html);

if (leetcodeLinks.length !== 30) {
  throw new Error(`LeetCode 링크가 30개여야 하지만 ${leetcodeLinks.length}개입니다.`);
}

if (legacyReferences) {
  throw new Error("종료된 문제 사이트 참조가 남아 있습니다.");
}

for (const asset of ["./styles.css", "./app.js"]) {
  if (!html.includes(asset)) {
    throw new Error(`index.html에서 ${asset}을 찾을 수 없습니다.`);
  }
}

console.log("정적 사이트 검증을 통과했습니다.");
