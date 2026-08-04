import { access, readFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const topics = await readFile(join(root, "src", "data", "topics.ts"), "utf8");
const examples = await readFile(join(root, "src", "data", "examples.ts"), "utf8");
const page = await readFile(join(root, "src", "pages", "index.astro"), "utf8");
const csModules = await readFile(join(root, "src", "data", "csModules.ts"), "utf8");
const csPage = await readFile(join(root, "src", "pages", "cs.astro"), "utf8");

const leetcodeLinks = topics.match(/https:\/\/leetcode\.com\/problems\/[^"/]+\//g) ?? [];
const legacyReferences = /백준|acmicpc\.net/.test(topics + page);
const topicIds = [...topics.matchAll(/^\s+id: "([^"]+)",$/gm)].map((match) => match[1]);
const exampleIds = [...examples.matchAll(/^  "([^"]+)": \{$/gm)].map((match) => match[1]);
const csModuleIds = [...csModules.matchAll(/^    id: "([^"]+)",$/gm)].map((match) => match[1]);
const csConceptIds = [...csModules.matchAll(/^        id: "([^"]+)",$/gm)].map((match) => match[1]);

if (leetcodeLinks.length !== 30) {
  throw new Error(`LeetCode 링크가 30개여야 하지만 ${leetcodeLinks.length}개입니다.`);
}

if (legacyReferences) {
  throw new Error("종료된 문제 사이트 참조가 남아 있습니다.");
}

if (topicIds.length !== 10 || exampleIds.length !== 10) {
  throw new Error(`유형과 대표 문제는 각각 10개여야 합니다: ${topicIds.length}, ${exampleIds.length}`);
}

if (csModuleIds.length !== 6 || csConceptIds.length !== 18) {
  throw new Error(`CS 커리큘럼은 6개 모듈과 18개 개념이어야 합니다: ${csModuleIds.length}, ${csConceptIds.length}`);
}

if (!csPage.includes('id="curriculum"') || !page.includes("AI 시대 CS 기본기")) {
  throw new Error("홈과 CS 기본기 페이지의 연결을 확인할 수 없습니다.");
}

for (const topicId of topicIds) {
  if (!exampleIds.includes(topicId)) {
    throw new Error(`${topicId} 유형의 대표 문제를 찾을 수 없습니다.`);
  }
}

for (const relativePath of [
  ["src", "pages", "index.astro"],
  ["src", "components", "TopicCard.astro"],
  ["src", "components", "ExampleWalkthrough.astro"],
  ["src", "data", "examples.ts"],
  ["src", "data", "topics.ts"],
  ["src", "scripts", "app.ts"],
  ["src", "pages", "cs.astro"],
  ["src", "data", "csModules.ts"],
  ["src", "scripts", "cs.ts"],
]) {
  await access(join(root, ...relativePath));
}

if (!page.includes("<TopicCard {topic} {index} />")) {
  throw new Error("홈 페이지에서 TopicCard 컴포넌트를 렌더링하지 않습니다.");
}

console.log("Astro 콘텐츠 검증을 통과했습니다.");
