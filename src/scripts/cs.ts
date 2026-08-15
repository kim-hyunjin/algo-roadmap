type CheckboxChangeDetail = { checked: boolean };

const storageKey = "algo-roadmap-cs-completed";
const checkboxRoots = Array.from(document.querySelectorAll<HTMLElement>("[data-cs-check]"));
const progressCount = document.querySelector<HTMLElement>("#cs-progress-count");
const progressTrack = document.querySelector<HTMLElement>("#cs-progress-track");
const progressCopy = document.querySelector<HTMLElement>("#cs-progress-copy");
const resetButton = document.querySelector<HTMLButtonElement>("#cs-reset");

function readCompleted(): Set<string> {
  try {
    const parsed: unknown = JSON.parse(localStorage.getItem(storageKey) ?? "[]");
    return new Set(Array.isArray(parsed) ? parsed.filter((value): value is string => typeof value === "string") : []);
  } catch {
    return new Set();
  }
}

let completed = readCompleted();
const validIds = new Set(checkboxRoots.map((item) => item.dataset.csCheck).filter(Boolean));
completed = new Set([...completed].filter((id) => validIds.has(id)));

function save(): void {
  try {
    localStorage.setItem(storageKey, JSON.stringify([...completed]));
  } catch {
    // 저장소가 차단되어도 현재 세션의 진행 표시는 유지합니다.
  }
}

function setCheckboxState(root: HTMLElement, checked: boolean): void {
  const input = root.querySelector<HTMLInputElement>("[data-sw-checkbox-input]");
  if (!input || (input.checked === checked && root.getAttribute("aria-checked") === String(checked))) return;
  input.checked = checked;
  input.dispatchEvent(new Event("change", { bubbles: true }));
}

function updateConceptState(root: HTMLElement, checked: boolean): void {
  const concept = root.closest<HTMLElement>("[data-cs-concept]");
  if (concept) concept.dataset.completed = String(checked);
}

function updateProgressElement(value: number, total: number): void {
  if (!progressTrack) return;
  const percent = total === 0 ? 0 : (value / total) * 100;
  progressTrack.dataset.value = String(value);
  progressTrack.setAttribute("aria-valuenow", String(value));
  const indicator = progressTrack.querySelector<HTMLElement>('[data-slot="progress-indicator"]');
  if (indicator) indicator.style.transform = `translateX(-${100 - percent}%)`;
}

function render(): void {
  const total = checkboxRoots.length;
  const count = completed.size;
  if (progressCount) progressCount.textContent = `${count} / ${total}`;
  updateProgressElement(count, total);
  if (progressCopy) {
    progressCopy.textContent =
      count === total
        ? "기초 지도를 완주했습니다. 이제 프로젝트에서 빈틈을 다시 찾아보세요."
        : count >= total / 2
          ? "절반을 넘었습니다. 개념을 실제 장애와 연결해보세요."
          : count > 0
            ? "좋은 출발입니다. 체크보다 설명할 수 있는지가 더 중요합니다."
            : "한 번에 하나씩, 직접 설명할 수 있을 때 체크하세요.";
  }
}

for (const root of checkboxRoots) {
  const id = root.dataset.csCheck;
  if (!id) continue;
  const initialChecked = completed.has(id);
  setCheckboxState(root, initialChecked);
  updateConceptState(root, initialChecked);

  root.addEventListener("starwind:checked-change", (event) => {
    const checked = (event as CustomEvent<CheckboxChangeDetail>).detail.checked;
    if (checked) completed.add(id);
    else completed.delete(id);
    updateConceptState(root, checked);
    save();
    render();
  });
}

resetButton?.addEventListener("click", () => {
  if (completed.size === 0 || !window.confirm("CS 학습 진도를 모두 초기화할까요?")) return;
  completed.clear();
  for (const root of checkboxRoots) {
    setCheckboxState(root, false);
    updateConceptState(root, false);
  }
  save();
  render();
});

render();
