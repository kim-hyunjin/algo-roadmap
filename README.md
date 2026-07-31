# Algo Roadmap

대표적인 코딩 테스트 문제 유형을 빠르게 훑고, 풀이 패턴과 LeetCode 연습
문제를 확인하는 정적 학습 사이트입니다.

## 특징

- 서버, 로그인, AI API가 없습니다.
- 검색과 기초/중급 필터를 지원합니다.
- 학습 완료 상태는 브라우저 `localStorage`에만 저장됩니다.
- Python과 JavaScript 풀이 템플릿을 제공합니다.
- 외부 문제 본문을 복제하지 않고 LeetCode 공식 링크만 제공합니다.

## 로컬 실행

```bash
npm install
npm run check
npm run build
python -m http.server 8000 -d dist
```

브라우저에서 `http://localhost:8000`을 엽니다.

## GitHub Pages 배포

이 저장소는 GitHub Actions를 사용하지 않습니다. 로컬에서 검증과 빌드를
마친 뒤 `dist`의 결과물만 `gh-pages` 브랜치에 게시합니다.

```bash
npm run deploy
```

`deploy` 명령은 다음 작업을 순서대로 수행합니다.

1. JavaScript 문법과 콘텐츠 링크 검사
2. `src`를 정적 배포물인 `dist`로 빌드
3. `dist`만 `gh-pages` 브랜치에 커밋하고 푸시

GitHub Pages의 배포 소스는 `gh-pages` 브랜치의 루트로 설정합니다.

## 구조

```text
algo-roadmap/
├── src/                 # 사이트 원본
│   ├── index.html
│   ├── styles.css
│   └── app.js
├── scripts/
│   ├── build.mjs        # dist 생성
│   └── check.mjs        # 정적 검증
├── dist/                # 로컬 빌드 결과, Git 미추적
├── PLAN.md
└── package.json
```

제품 범위와 콘텐츠 원칙은 [`PLAN.md`](PLAN.md)를 참고하세요.
