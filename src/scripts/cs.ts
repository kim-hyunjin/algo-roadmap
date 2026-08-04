const storageKey = "algo-roadmap-cs-completed";

const checkboxes = Array.from(
  document.querySelectorAll<HTMLInputElement>("[data-cs-check]"),
);
const progressCount = document.querySelector<HTMLElement>("#cs-progress-count");
const progressBar = document.querySelector<HTMLElement>("#cs-progress-bar");
const progressTrack = document.querySelector<HTMLElement>("#cs-progress-track");
const progressCopy = document.querySelector<HTMLElement>("#cs-progress-copy");
const resetButton = document.querySelector<HTMLButtonElement>("#cs-reset");

function readCompleted(): Set<string> {
  try {
    const parsed: unknown = JSON.parse(localStorage.getItem(storageKey) ?? "[]");
    return new Set(
      Array.isArray(parsed)
        ? parsed.filter((value): value is string => typeof value === "string")
        : [],
    );
  } catch {
    return new Set();
  }
}

let completed = readCompleted();
const validIds = new Set(checkboxes.map((item) => item.dataset.csCheck).filter(Boolean));
completed = new Set([...completed].filter((id) => validIds.has(id)));

function save(): void {
  try {
    localStorage.setItem(storageKey, JSON.stringify([...completed]));
  } catch {
    // 로컬 저장소가 막혀도 현재 화면의 진행 표시는 유지합니다.
  }
}

function render(): void {
  const total = checkboxes.length;
  const count = completed.size;
  const percent = total === 0 ? 0 : Math.round((count / total) * 100);

  if (progressCount) progressCount.textContent = `${count} / ${total}`;
  if (progressBar) progressBar.style.width = `${percent}%`;
  if (progressTrack) progressTrack.setAttribute("aria-valuenow", String(count));
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

for (const checkbox of checkboxes) {
  const id = checkbox.dataset.csCheck;
  if (!id) continue;

  checkbox.checked = completed.has(id);
  checkbox.closest(".cs-concept")?.classList.toggle("is-complete", checkbox.checked);

  checkbox.addEventListener("change", () => {
    if (checkbox.checked) completed.add(id);
    else completed.delete(id);
    checkbox.closest(".cs-concept")?.classList.toggle("is-complete", checkbox.checked);
    save();
    render();
  });
}

resetButton?.addEventListener("click", () => {
  if (completed.size === 0 || !window.confirm("CS 학습 진도를 모두 초기화할까요?")) return;
  completed.clear();
  save();
  for (const checkbox of checkboxes) {
    checkbox.checked = false;
    checkbox.closest(".cs-concept")?.classList.remove("is-complete");
  }
  render();
});

render();
