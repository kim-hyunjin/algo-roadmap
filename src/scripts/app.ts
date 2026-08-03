import type { TopicLevel } from "../data/topics";

type ActiveLevel = TopicLevel | "all";

const storageKey = "algo-roadmap-completed";

function requireElement<T extends Element>(selector: string, parent: ParentNode = document): T {
  const element = parent.querySelector<T>(selector);

  if (!element) {
    throw new Error(`필수 화면 요소를 찾을 수 없습니다: ${selector}`);
  }

  return element;
}

const cards = Array.from(document.querySelectorAll<HTMLElement>("[data-topic-card]"));
const searchInput = requireElement<HTMLInputElement>("#search-input");
const filters = Array.from(document.querySelectorAll<HTMLButtonElement>(".filter"));
const resultSummary = requireElement<HTMLElement>("#result-summary");
const emptyState = requireElement<HTMLElement>("#empty-state");
const progressCount = requireElement<HTMLElement>("#progress-count");
const progressBar = requireElement<HTMLElement>("#progress-bar");
const progressTrack = requireElement<HTMLElement>(".progress-track");
const progressMessage = requireElement<HTMLElement>("#progress-message");
const resetButton = requireElement<HTMLButtonElement>("#reset-progress");

let activeLevel: ActiveLevel = "all";
let completed = readCompleted();

function readCompleted(): Set<string> {
  try {
    const value: unknown = JSON.parse(localStorage.getItem(storageKey) ?? "[]");
    const ids = Array.isArray(value)
      ? value.filter((item): item is string => typeof item === "string")
      : [];

    return new Set(ids);
  } catch {
    return new Set();
  }
}

function saveCompleted(): void {
  try {
    localStorage.setItem(storageKey, JSON.stringify([...completed]));
  } catch {
    // 저장소 접근이 차단되어도 현재 세션의 UI는 계속 동작합니다.
  }
}

function render(): void {
  const query = searchInput.value.trim().toLocaleLowerCase("ko");
  let visibleCount = 0;

  for (const card of cards) {
    const matchesLevel = activeLevel === "all" || card.dataset.level === activeLevel;
    const matchesQuery = (card.dataset.search ?? "").includes(query);
    const isVisible = matchesLevel && matchesQuery;

    card.hidden = !isVisible;
    if (isVisible) visibleCount += 1;
  }

  resultSummary.textContent = `총 ${cards.length}개 중 ${visibleCount}개 유형`;
  emptyState.hidden = visibleCount !== 0;
}

function updateProgress(): void {
  const validIds = new Set(cards.map((card) => card.dataset.id).filter(Boolean));
  completed = new Set([...completed].filter((id) => validIds.has(id)));

  const count = completed.size;
  const percentage = cards.length === 0 ? 0 : (count / cards.length) * 100;

  progressCount.textContent = `${count} / ${cards.length}`;
  progressBar.style.width = `${percentage}%`;
  progressTrack.setAttribute("aria-valuenow", String(count));

  if (count === cards.length) {
    progressMessage.textContent = "모든 유형을 훑었습니다. 이제 약한 유형을 다시 풀어보세요.";
  } else if (count >= Math.ceil(cards.length / 2)) {
    progressMessage.textContent = "절반을 넘었습니다. 중급 유형도 차근차근 연결해보세요.";
  } else if (count > 0) {
    progressMessage.textContent = "좋은 시작입니다. 다음 유형에서도 판별 신호를 먼저 찾아보세요.";
  } else {
    progressMessage.textContent = "가장 익숙한 유형부터 하나씩 시작해보세요.";
  }
}

function initializeCard(card: HTMLElement): void {
  const id = card.dataset.id;
  const checkbox = requireElement<HTMLInputElement>('input[type="checkbox"]', card);

  if (!id) return;

  checkbox.checked = completed.has(id);
  card.classList.toggle("completed", checkbox.checked);

  checkbox.addEventListener("change", () => {
    if (checkbox.checked) completed.add(id);
    else completed.delete(id);

    card.classList.toggle("completed", checkbox.checked);
    saveCompleted();
    updateProgress();
  });

}

for (const card of cards) initializeCard(card);

searchInput.addEventListener("input", render);

for (const filter of filters) {
  filter.addEventListener("click", () => {
    const level = filter.dataset.level;
    if (level !== "all" && level !== "basic" && level !== "intermediate") return;

    activeLevel = level;
    for (const item of filters) item.classList.toggle("active", item === filter);
    render();
  });
}

resetButton.addEventListener("click", () => {
  if (!completed.size || !window.confirm("저장된 학습 진도를 모두 초기화할까요?")) {
    return;
  }

  completed = new Set();
  saveCompleted();

  for (const card of cards) {
    const checkbox = requireElement<HTMLInputElement>('input[type="checkbox"]', card);
    checkbox.checked = false;
    card.classList.remove("completed");
  }

  updateProgress();
});

updateProgress();
render();
