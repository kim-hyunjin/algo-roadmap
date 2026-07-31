# Algo Roadmap

대표적인 코딩 테스트 문제 유형을 빠르게 훑고, 풀이 패턴과 LeetCode 연습
문제를 확인하는 Astro 기반 정적 학습 사이트입니다.

## 특징

- 서버, 로그인, AI API가 없습니다.
- 검색과 기초/중급 필터를 지원합니다.
- 학습 완료 상태는 브라우저 `localStorage`에만 저장됩니다.
- 각 유형마다 직접 만든 대표 문제와 단계별 사고 과정을 제공합니다.
- 이전·다음 버튼으로 알고리즘 상태 변화를 시각적으로 따라갈 수 있습니다.
- Python과 JavaScript 풀이 템플릿을 제공합니다.
- 외부 문제 본문을 복제하지 않고 LeetCode 공식 링크만 제공합니다.

## 로컬 실행

```bash
npm install
npm run check
npm run build
npm run dev
```

개발 서버가 안내하는 `http://localhost:4321/algo-roadmap/`을 엽니다. 배포 결과를
확인하려면 `npm run build` 후 `npm run preview`를 사용합니다.

## GitHub Pages 배포

이 저장소는 GitHub Actions를 사용하지 않습니다. 로컬에서 검증과 빌드를
마친 뒤 `dist`의 결과물만 `gh-pages` 브랜치에 게시합니다.

```bash
npm run deploy
```

`deploy` 명령은 다음 작업을 순서대로 수행합니다.

1. Astro 및 TypeScript 타입과 콘텐츠 링크 검사
2. Astro가 `src`를 정적 배포물인 `dist`로 빌드
3. `dist`만 `gh-pages` 브랜치에 커밋하고 푸시

GitHub Pages의 배포 소스는 `gh-pages` 브랜치의 루트로 설정합니다.

## 구조

```text
algo-roadmap/
├── src/
│   ├── components/      # Astro UI 컴포넌트
│   ├── data/            # 알고리즘 설명, 대표 문제와 시각화 단계
│   ├── pages/           # Astro 페이지
│   ├── scripts/         # 브라우저 TypeScript
│   └── styles.css
├── scripts/
│   └── check.mjs        # 콘텐츠 정적 검증
├── astro.config.mjs     # 빌드 및 GitHub Pages 기본 경로
├── tsconfig.json        # 엄격한 TypeScript 설정
├── dist/                # 로컬 빌드 결과, Git 미추적
├── PLAN.md
└── package.json
```

제품 범위와 콘텐츠 원칙은 [`PLAN.md`](PLAN.md)를 참고하세요.
