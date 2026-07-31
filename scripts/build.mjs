import { cp, mkdir, rm, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const source = join(root, "src");
const output = join(root, "dist");

if (!output.startsWith(root)) {
  throw new Error("배포 경로가 프로젝트 밖을 가리킵니다.");
}

await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });
await cp(source, output, { recursive: true });
await writeFile(join(output, ".nojekyll"), "");

console.log("dist에 정적 사이트를 생성했습니다.");
