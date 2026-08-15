import * as monaco from "monaco-editor/esm/vs/editor/editor.api";
import EditorWorker from "monaco-editor/esm/vs/editor/editor.worker?worker";
import "monaco-editor/esm/vs/basic-languages/python/python.contribution";
import "monaco-editor/esm/vs/basic-languages/javascript/javascript.contribution";
import "monaco-editor/esm/vs/basic-languages/cpp/cpp.contribution";

window.MonacoEnvironment = {
  getWorker: () => new EditorWorker(),
};

function requireElement<T extends Element>(selector: string, parent: ParentNode): T {
  const element = parent.querySelector<T>(selector);

  if (!element) {
    throw new Error(`필수 화면 요소를 찾을 수 없습니다: ${selector}`);
  }

  return element;
}

function initializeCodeTabs(scope: HTMLElement): void {
  const codeBlocks = Array.from(scope.querySelectorAll<HTMLElement>("[data-code-fallback]"));
  const editorHost = requireElement<HTMLElement>("[data-code-editor]", scope);
  const copyButton = requireElement<HTMLButtonElement>("[data-copy-code]", scope);
  const copyLabel = requireElement<HTMLElement>("span", copyButton);
  const copyStatus = requireElement<HTMLElement>("[data-copy-status]", scope);
  const languageLabels: Record<string, string> = {
    python: "Python",
    javascript: "JavaScript",
    cpp: "C++",
  };
  const models = new Map<string, monaco.editor.ITextModel>();

  for (const block of codeBlocks) {
    const language = block.getAttribute("data-value");
    if (!language) continue;

    const value = block.textContent ?? "";
    models.set(language, monaco.editor.createModel(value, language));
  }

  const initialLanguage = scope.getAttribute("data-value") ?? "python";
  const initialModel = models.get(initialLanguage);
  const compactEditorMedia = window.matchMedia("(max-width: 699px)");

  if (!initialModel) return;

  const editor = monaco.editor.create(editorHost, {
    model: initialModel,
    readOnly: true,
    domReadOnly: true,
    automaticLayout: true,
    theme: "vs-dark",
    fontFamily: '"SFMono-Regular", Consolas, "Liberation Mono", monospace',
    fontSize: 13,
    lineHeight: 21,
    lineNumbersMinChars: 3,
    minimap: {
      enabled: !compactEditorMedia.matches,
      scale: 0.8,
      showSlider: "mouseover",
    },
    padding: { top: 14, bottom: 14 },
    renderLineHighlight: "line",
    roundedSelection: false,
    scrollBeyondLastLine: false,
    scrollbar: { verticalScrollbarSize: 10, horizontalScrollbarSize: 10 },
    smoothScrolling: true,
    tabSize: 4,
    wordWrap: compactEditorMedia.matches ? "on" : "off",
  });

  scope.classList.add("is-monaco-ready");

  const updateEditorHeight = (model: monaco.editor.ITextModel): void => {
    const lineHeight = 21;
    const desiredHeight = model.getLineCount() * lineHeight + 32;
    editorHost.style.height = `${Math.max(280, Math.min(desiredHeight, 620))}px`;
    editor.layout();
  };

  const updateResponsiveOptions = (): void => {
    editor.updateOptions({
      lineNumbersMinChars: compactEditorMedia.matches ? 2 : 3,
      minimap: { enabled: !compactEditorMedia.matches },
      wordWrap: compactEditorMedia.matches ? "on" : "off",
    });
  };

  compactEditorMedia.addEventListener("change", updateResponsiveOptions);

  const selectLanguage = (language: string): void => {
    const model = models.get(language);
    if (!model) return;

    editor.setModel(model);
    editor.setScrollPosition({ scrollTop: 0, scrollLeft: 0 });
    updateEditorHeight(model);
    editorHost.setAttribute("aria-label", `${languageLabels[language] ?? language} 풀이 코드`);

  };

  scope.addEventListener("starwind:value-change", (event) => {
    const value = (event as CustomEvent<{ value: string | null }>).detail.value;
    if (value) selectLanguage(value);
  });

  copyButton.addEventListener("click", async () => {
    const code = editor.getModel()?.getValue() ?? "";

    try {
      await navigator.clipboard.writeText(code);
      copyLabel.textContent = "복사됨";
      copyStatus.textContent = "현재 풀이 코드가 클립보드에 복사되었습니다.";
      window.setTimeout(() => {
        copyLabel.textContent = "코드 복사";
      }, 1600);
    } catch {
      copyStatus.textContent = "코드를 복사하지 못했습니다. 코드 영역에서 직접 선택해 주세요.";
    }
  });

  updateEditorHeight(initialModel);
  selectLanguage(initialLanguage);

  window.addEventListener(
    "pagehide",
    () => {
      compactEditorMedia.removeEventListener("change", updateResponsiveOptions);
      editor.dispose();
      for (const model of models.values()) model.dispose();
    },
    { once: true },
  );
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
