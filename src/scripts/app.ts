import type { TopicLevel } from "../data/topics";

type ActiveLevel = TopicLevel | "all";
type CheckboxChangeDetail = { checked: boolean };

const storageKey = "algo-roadmap-completed";

function requireElement<T extends Element>(selector: string, parent: ParentNode = document): T {
  const element = parent.querySelector<T>(selector);
  if (!element) throw new Error(`필수 화면 요소를 찾을 수 없습니다: ${selector}`);
  return element;
}

const cards = Array.from(document.querySelectorAll<HTMLElement>("[data-topic-card]"));
const searchInput = requireElement<HTMLInputElement>("#search-input");
const filters = Array.from(document.querySelectorAll<HTMLButtonElement>("[data-level-filter]"));
const resultSummary = requireElement<HTMLElement>("#result-summary");
const emptyState = requireElement<HTMLElement>("#empty-state");
const progressCount = requireElement<HTMLElement>("#progress-count");
const progressTrack = requireElement<HTMLElement>("#progress-track");
const resetButton = requireElement<HTMLButtonElement>("#reset-progress");
const progressMessage = requireElement<HTMLElement>("#progress-message");

let activeLevel: ActiveLevel = "all";
let completed = readCompleted();

function readCompleted(): Set<string> {
  try {
    const value: unknown = JSON.parse(localStorage.getItem(storageKey) ?? "[]");
    return new Set(Array.isArray(value) ? value.filter((item): item is string => typeof item === "string") : []);
  } catch {
    return new Set();
  }
}

function saveCompleted(): void {
  try {
    localStorage.setItem(storageKey, JSON.stringify([...completed]));
  } catch {
    // 저장소가 차단되어도 현재 세션은 계속 동작합니다.
  }
}

function setCheckboxState(root: HTMLElement, checked: boolean): void {
  const input = requireElement<HTMLInputElement>("[data-sw-checkbox-input]", root);
  if (input.checked === checked && root.getAttribute("aria-checked") === String(checked)) return;
  input.checked = checked;
  input.dispatchEvent(new Event("change", { bubbles: true }));
}

function updateCardState(card: HTMLElement, checked: boolean): void {
  card.dataset.completed = String(checked);
}

function updateProgressElement(value: number): void {
  const percent = cards.length === 0 ? 0 : (value / cards.length) * 100;
  progressTrack.dataset.value = String(value);
  progressTrack.setAttribute("aria-valuenow", String(value));
  const indicator = progressTrack.querySelector<HTMLElement>('[data-slot="progress-indicator"]');
  if (indicator) indicator.style.transform = `translateX(-${100 - percent}%)`;
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

  progressCount.textContent = `${count} / ${cards.length}`;
  updateProgressElement(count);
  progressMessage.textContent =
    count === cards.length
      ? "모든 유형을 훑었습니다. 이제 약한 유형을 다시 풀어보세요."
      : count >= Math.ceil(cards.length / 2)
        ? "절반을 넘었습니다. 중급 유형도 차근차근 연결해보세요."
        : count > 0
          ? "좋은 시작입니다. 다음 유형에서도 판별 신호를 먼저 찾아보세요."
          : "가장 익숙한 유형부터 하나씩 시작해보세요.";
}

for (const card of cards) {
  const id = card.dataset.id;
  const checkboxRoot = requireElement<HTMLElement>("[data-topic-complete]", card);
  if (!id) continue;

  const initialChecked = completed.has(id);
  setCheckboxState(checkboxRoot, initialChecked);
  updateCardState(card, initialChecked);

  checkboxRoot.addEventListener("starwind:checked-change", (event) => {
    const checked = (event as CustomEvent<CheckboxChangeDetail>).detail.checked;
    if (checked) completed.add(id);
    else completed.delete(id);
    updateCardState(card, checked);
    saveCompleted();
    updateProgress();
  });
}

searchInput.addEventListener("input", render);

for (const filter of filters) {
  filter.addEventListener("click", () => {
    const level = filter.dataset.level;
    if (level !== "all" && level !== "basic" && level !== "intermediate") return;
    activeLevel = level;
    for (const item of filters) {
      const isActive = item === filter;
      item.dataset.active = String(isActive);
      item.setAttribute("aria-pressed", String(isActive));
    }
    render();
  });
}

resetButton.addEventListener("click", () => {
  if (!completed.size || !window.confirm("저장된 학습 진도를 모두 초기화할까요?")) return;
  completed.clear();
  for (const card of cards) {
    setCheckboxState(requireElement<HTMLElement>("[data-topic-complete]", card), false);
    updateCardState(card, false);
  }
  saveCompleted();
  updateProgress();
});

updateProgress();
render();
