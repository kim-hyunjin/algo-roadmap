function requireElement<T extends Element>(selector: string, parent: ParentNode): T {
  const element = parent.querySelector<T>(selector);

  if (!element) {
    throw new Error(`필수 화면 요소를 찾을 수 없습니다: ${selector}`);
  }

  return element;
}

function initializeCodeTabs(scope: HTMLElement): void {
  const tabs = Array.from(scope.querySelectorAll<HTMLButtonElement>(".code-tab"));
  const codeBlocks = Array.from(scope.querySelectorAll<HTMLElement>("[data-code-language]"));

  for (const tab of tabs) {
    tab.addEventListener("click", () => {
      const language = tab.dataset.language;

      for (const item of tabs) {
        const isActive = item === tab;
        item.classList.toggle("active", isActive);
        item.setAttribute("aria-selected", String(isActive));
      }

      for (const block of codeBlocks) {
        block.hidden = block.dataset.codeLanguage !== language;
      }
    });
  }
}

function initializeWalkthrough(walkthrough: HTMLElement): void {
  const frames = Array.from(walkthrough.querySelectorAll<HTMLElement>("[data-visual-frame]"));
  const previousButton = requireElement<HTMLButtonElement>("[data-step-previous]", walkthrough);
  const nextButton = requireElement<HTMLButtonElement>("[data-step-next]", walkthrough);
  const currentLabel = requireElement<HTMLElement>("[data-step-current]", walkthrough);
  let currentIndex = 0;

  const showFrame = (nextIndex: number): void => {
    currentIndex = Math.max(0, Math.min(nextIndex, frames.length - 1));

    for (const [index, frame] of frames.entries()) {
      frame.hidden = index !== currentIndex;
    }

    currentLabel.textContent = String(currentIndex + 1);
    previousButton.disabled = currentIndex === 0;
    nextButton.disabled = currentIndex === frames.length - 1;
  };

  previousButton.addEventListener("click", () => showFrame(currentIndex - 1));
  nextButton.addEventListener("click", () => showFrame(currentIndex + 1));
  showFrame(0);
}

for (const group of document.querySelectorAll<HTMLElement>("[data-code-tabs]")) {
  initializeCodeTabs(group);
}

for (const walkthrough of document.querySelectorAll<HTMLElement>("[data-walkthrough]")) {
  initializeWalkthrough(walkthrough);
}
