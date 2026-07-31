const topics = [
  {
    id: "array-hash",
    title: "배열 · 해시",
    level: "basic",
    summary: "값의 존재 여부, 빈도, 빠른 조회가 핵심일 때 가장 먼저 떠올릴 도구입니다.",
    tags: ["빈도", "중복", "O(1) 조회"],
    signals: ["값의 등장 횟수를 세어야 한다", "중복 여부를 빠르게 확인한다", "두 값의 관계를 즉시 조회한다"],
    steps: ["키와 값이 무엇인지 정한다.", "한 번 순회하며 빈도나 위치를 저장한다.", "두 번째 순회 또는 즉시 조회로 답을 만든다."],
    complexity: "보통 O(N), 공간 O(N)",
    mistake: "객체 키가 문자열로 변환되는 언어 특성과 존재하지 않는 키의 기본값을 확인하세요.",
    python: `count = {}
for value in values:
    count[value] = count.get(value, 0) + 1`,
    javascript: `const count = new Map();
for (const value of values) {
  count.set(value, (count.get(value) ?? 0) + 1);
}`,
    problems: [
      ["LeetCode — Contains Duplicate", "Easy", "https://leetcode.com/problems/contains-duplicate/"],
      ["LeetCode — Valid Anagram", "Easy", "https://leetcode.com/problems/valid-anagram/"],
      ["LeetCode — Two Sum", "Easy", "https://leetcode.com/problems/two-sum/"],
    ],
  },
  {
    id: "stack-queue",
    title: "스택 · 큐",
    level: "basic",
    summary: "최근 작업을 되돌리거나, 들어온 순서대로 상태를 처리할 때 사용합니다.",
    tags: ["LIFO", "FIFO", "괄호"],
    signals: ["가장 최근 항목부터 제거한다", "처리 순서가 입력 순서와 같다", "짝이 맞는지 검사한다"],
    steps: ["삽입·삭제가 어느 쪽에서 일어나는지 확인한다.", "필요한 값과 인덱스를 함께 저장한다.", "꺼낼 때 비어 있는지 먼저 검사한다."],
    complexity: "각 연산 O(1), 전체 O(N)",
    mistake: "JavaScript에서 배열의 shift는 O(N)입니다. 큐의 앞쪽 인덱스를 따로 관리하세요.",
    python: `from collections import deque

queue = deque([start])
while queue:
    current = queue.popleft()`,
    javascript: `const queue = [start];
let head = 0;
while (head < queue.length) {
  const current = queue[head++];
}`,
    problems: [
      ["LeetCode — Valid Parentheses", "Easy", "https://leetcode.com/problems/valid-parentheses/"],
      ["LeetCode — Implement Queue using Stacks", "Easy", "https://leetcode.com/problems/implement-queue-using-stacks/"],
      ["LeetCode — Daily Temperatures", "Medium", "https://leetcode.com/problems/daily-temperatures/"],
    ],
  },
  {
    id: "bruteforce",
    title: "완전 탐색 · 백트래킹",
    level: "basic",
    summary: "가능한 경우가 작고 모든 조합을 확인해야 할 때, 탐색 트리를 만들고 가지를 줄입니다.",
    tags: ["조합", "순열", "가지치기"],
    signals: ["입력 크기가 매우 작다", "모든 순서나 조합을 구한다", "조건을 만족하는 경우를 센다"],
    steps: ["상태, 선택지, 종료 조건을 정의한다.", "선택하고 재귀 호출한 뒤 반드시 원상 복구한다.", "답이 될 수 없는 상태는 일찍 종료한다."],
    complexity: "문제에 따라 O(2ᴺ), O(N!)",
    mistake: "백트래킹 후 방문 표시나 변경한 값을 복구하지 않는 실수를 가장 먼저 확인하세요.",
    python: `def search(depth):
    if depth == target:
        record()
        return
    for choice in choices:
        if used[choice]:
            continue
        used[choice] = True
        search(depth + 1)
        used[choice] = False`,
    javascript: `function search(depth) {
  if (depth === target) return record();
  for (const choice of choices) {
    if (used[choice]) continue;
    used[choice] = true;
    search(depth + 1);
    used[choice] = false;
  }
}`,
    problems: [
      ["LeetCode — Subsets", "Medium", "https://leetcode.com/problems/subsets/"],
      ["LeetCode — Permutations", "Medium", "https://leetcode.com/problems/permutations/"],
      ["LeetCode — N-Queens", "Hard", "https://leetcode.com/problems/n-queens/"],
    ],
  },
  {
    id: "greedy",
    title: "정렬 · 그리디",
    level: "basic",
    summary: "매 순간의 최선이 전체 최선으로 이어지는 근거를 찾고, 선택 기준대로 정렬합니다.",
    tags: ["선택 기준", "정렬", "증명"],
    signals: ["최소 횟수나 최대 개수를 구한다", "앞의 선택이 뒤의 선택 범위를 결정한다", "구간을 가능한 많이 고른다"],
    steps: ["후보를 비교할 한 가지 기준을 찾는다.", "교환 논법으로 그 선택이 손해가 아님을 설명한다.", "정렬 후 한 번 순회하며 선택한다."],
    complexity: "정렬이 지배하면 O(N log N)",
    mistake: "예제에서 잘 된다는 이유만으로 그리디를 확정하지 말고, 반례 또는 교환 논법을 확인하세요.",
    python: `items.sort(key=lambda item: (item.end, item.start))
last_end = -1
for item in items:
    if item.start >= last_end:
        choose(item)
        last_end = item.end`,
    javascript: `items.sort((a, b) => a.end - b.end || a.start - b.start);
let lastEnd = -1;
for (const item of items) {
  if (item.start >= lastEnd) {
    choose(item);
    lastEnd = item.end;
  }
}`,
    problems: [
      ["LeetCode — Best Time to Buy and Sell Stock", "Easy", "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/"],
      ["LeetCode — Jump Game", "Medium", "https://leetcode.com/problems/jump-game/"],
      ["LeetCode — Non-overlapping Intervals", "Medium", "https://leetcode.com/problems/non-overlapping-intervals/"],
    ],
  },
  {
    id: "binary-search",
    title: "이분 탐색",
    level: "intermediate",
    summary: "정렬된 값의 위치를 찾거나, 가능한 답의 경계를 빠르게 좁힙니다.",
    tags: ["정렬", "경계", "매개변수 탐색"],
    signals: ["정렬된 데이터에서 값을 찾는다", "최댓값의 최솟값을 구한다", "어떤 값 이상부터 조건이 계속 참이다"],
    steps: ["탐색 구간과 판정 함수를 정의한다.", "판정 결과가 한 방향으로만 바뀌는지 확인한다.", "반복이 끝난 뒤 left와 right 중 무엇이 답인지 검증한다."],
    complexity: "O(log N), 판정 포함 시 O(check × log range)",
    mistake: "구간의 포함 여부와 mid 갱신 규칙을 섞지 말고 하나의 템플릿을 일관되게 사용하세요.",
    python: `left, right = 0, len(values)
while left < right:
    mid = (left + right) // 2
    if values[mid] < target:
        left = mid + 1
    else:
        right = mid`,
    javascript: `let left = 0;
let right = values.length;
while (left < right) {
  const mid = Math.floor((left + right) / 2);
  if (values[mid] < target) left = mid + 1;
  else right = mid;
}`,
    problems: [
      ["LeetCode — Binary Search", "Easy", "https://leetcode.com/problems/binary-search/"],
      ["LeetCode — Search Insert Position", "Easy", "https://leetcode.com/problems/search-insert-position/"],
      ["LeetCode — Capacity To Ship Packages Within D Days", "Medium", "https://leetcode.com/problems/capacity-to-ship-packages-within-d-days/"],
    ],
  },
  {
    id: "two-pointer",
    title: "투 포인터 · 슬라이딩 윈도우",
    level: "intermediate",
    summary: "연속 구간이나 정렬된 배열에서 두 경계를 움직여 중복 계산을 없앱니다.",
    tags: ["연속 구간", "구간 합", "두 경계"],
    signals: ["연속된 부분 구간을 구한다", "두 수의 합이 목표에 가까워야 한다", "구간을 늘리고 줄이며 조건을 맞춘다"],
    steps: ["왼쪽과 오른쪽 포인터의 의미를 정한다.", "어떤 조건에서 어느 포인터가 움직이는지 결정한다.", "포인터가 움직일 때 합이나 빈도를 증분 갱신한다."],
    complexity: "두 포인터가 각 1회 이동하면 O(N)",
    mistake: "정렬이 필요한 문제인지, 원래 순서의 연속 구간을 다루는 문제인지 구분하세요.",
    python: `left = 0
current = 0
for right, value in enumerate(values):
    current += value
    while should_shrink(current):
        current -= values[left]
        left += 1`,
    javascript: `let left = 0;
let current = 0;
for (let right = 0; right < values.length; right++) {
  current += values[right];
  while (shouldShrink(current)) current -= values[left++];
}`,
    problems: [
      ["LeetCode — Valid Palindrome", "Easy", "https://leetcode.com/problems/valid-palindrome/"],
      ["LeetCode — Two Sum II", "Medium", "https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/"],
      ["LeetCode — Minimum Size Subarray Sum", "Medium", "https://leetcode.com/problems/minimum-size-subarray-sum/"],
    ],
  },
  {
    id: "graph-search",
    title: "DFS · BFS",
    level: "basic",
    summary: "연결 관계를 따라가며 모든 상태를 방문하거나, 간선 비용이 같을 때 최단 단계를 찾습니다.",
    tags: ["그래프", "격자", "최단 단계"],
    signals: ["서로 연결된 영역을 센다", "상하좌우로 이동한다", "최소 이동 횟수를 구하고 모든 이동 비용이 같다"],
    steps: ["노드와 간선이 무엇인지 정의한다.", "방문 시점을 큐나 스택에 넣는 순간으로 정한다.", "인접 상태가 범위 안이고 미방문인지 확인한다."],
    complexity: "O(V + E), 격자는 O(행 × 열)",
    mistake: "BFS에서 큐에서 꺼낼 때 방문 처리하면 같은 노드가 여러 번 들어갈 수 있습니다.",
    python: `from collections import deque

queue = deque([start])
visited[start] = True
while queue:
    current = queue.popleft()
    for nxt in graph[current]:
        if not visited[nxt]:
            visited[nxt] = True
            queue.append(nxt)`,
    javascript: `const queue = [start];
let head = 0;
visited[start] = true;
while (head < queue.length) {
  const current = queue[head++];
  for (const next of graph[current]) {
    if (!visited[next]) {
      visited[next] = true;
      queue.push(next);
    }
  }
}`,
    problems: [
      ["LeetCode — Flood Fill", "Easy", "https://leetcode.com/problems/flood-fill/"],
      ["LeetCode — Number of Islands", "Medium", "https://leetcode.com/problems/number-of-islands/"],
      ["LeetCode — Shortest Path in Binary Matrix", "Medium", "https://leetcode.com/problems/shortest-path-in-binary-matrix/"],
    ],
  },
  {
    id: "dynamic-programming",
    title: "동적 계획법",
    level: "intermediate",
    summary: "겹치는 작은 문제의 답을 저장해 같은 계산을 반복하지 않습니다.",
    tags: ["상태", "점화식", "메모이제이션"],
    signals: ["경우의 수, 최댓값, 최솟값을 구한다", "현재 답이 이전 상태의 답으로 표현된다", "재귀 호출에 같은 인자가 반복된다"],
    steps: ["dp 상태가 의미하는 문장을 먼저 쓴다.", "이전 상태에서 현재 상태로 오는 점화식을 만든다.", "초깃값과 계산 순서를 정한다."],
    complexity: "상태 수 × 상태당 전이 수",
    mistake: "점화식보다 먼저 배열부터 만들지 말고, dp[i]가 정확히 무엇인지 한 문장으로 정의하세요.",
    python: `dp = [0] * (n + 1)
dp[0] = base
for i in range(1, n + 1):
    dp[i] = transition(dp, i)`,
    javascript: `const dp = Array(n + 1).fill(0);
dp[0] = base;
for (let i = 1; i <= n; i++) {
  dp[i] = transition(dp, i);
}`,
    problems: [
      ["LeetCode — Climbing Stairs", "Easy", "https://leetcode.com/problems/climbing-stairs/"],
      ["LeetCode — House Robber", "Medium", "https://leetcode.com/problems/house-robber/"],
      ["LeetCode — Longest Increasing Subsequence", "Medium", "https://leetcode.com/problems/longest-increasing-subsequence/"],
    ],
  },
  {
    id: "shortest-path",
    title: "최단 경로",
    level: "intermediate",
    summary: "가중치가 있는 그래프에서 시작점부터 각 노드까지의 최소 비용을 갱신합니다.",
    tags: ["다익스트라", "가중치", "우선순위 큐"],
    signals: ["도로마다 비용이 다르다", "한 지점에서 다른 지점까지 최소 비용을 구한다", "음수가 아닌 가중치가 주어진다"],
    steps: ["간선 가중치가 음수가 아닌지 확인한다.", "가장 가까운 미확정 노드를 우선순위 큐에서 꺼낸다.", "이미 더 짧은 거리로 처리한 항목은 건너뛴다."],
    complexity: "다익스트라 O((V + E) log V)",
    mistake: "우선순위 큐에 같은 노드가 여러 번 들어갈 수 있으므로 꺼낸 거리와 최신 거리를 비교하세요.",
    python: `import heapq

dist[start] = 0
heap = [(0, start)]
while heap:
    cost, node = heapq.heappop(heap)
    if cost != dist[node]:
        continue
    for nxt, weight in graph[node]:
        new_cost = cost + weight
        if new_cost < dist[nxt]:
            dist[nxt] = new_cost
            heapq.heappush(heap, (new_cost, nxt))`,
    javascript: `// 우선순위 큐 구현체를 준비합니다.
dist[start] = 0;
heap.push([0, start]);
while (!heap.isEmpty()) {
  const [cost, node] = heap.pop();
  if (cost !== dist[node]) continue;
  for (const [next, weight] of graph[node]) {
    const nextCost = cost + weight;
    if (nextCost < dist[next]) {
      dist[next] = nextCost;
      heap.push([nextCost, next]);
    }
  }
}`,
    problems: [
      ["LeetCode — Network Delay Time", "Medium", "https://leetcode.com/problems/network-delay-time/"],
      ["LeetCode — Cheapest Flights Within K Stops", "Medium", "https://leetcode.com/problems/cheapest-flights-within-k-stops/"],
      ["LeetCode — Path With Minimum Effort", "Medium", "https://leetcode.com/problems/path-with-minimum-effort/"],
    ],
  },
  {
    id: "union-find-mst",
    title: "유니온 파인드 · MST",
    level: "intermediate",
    summary: "집합의 연결 여부를 빠르게 관리하고, 모든 노드를 잇는 최소 비용 구조를 만듭니다.",
    tags: ["집합", "사이클", "크루스칼"],
    signals: ["두 노드가 같은 그룹인지 묻는다", "간선을 추가하며 사이클을 검사한다", "모든 지점을 최소 비용으로 연결한다"],
    steps: ["각 노드의 대표를 자기 자신으로 초기화한다.", "find에 경로 압축을 적용한다.", "MST는 간선을 비용순으로 보며 다른 집합일 때만 합친다."],
    complexity: "유니온 파인드 거의 O(1), 크루스칼 O(E log E)",
    mistake: "union에서 노드 자체가 아니라 각 노드의 대표 루트를 연결해야 합니다.",
    python: `def find(x):
    if parent[x] != x:
        parent[x] = find(parent[x])
    return parent[x]

def union(a, b):
    a, b = find(a), find(b)
    if a != b:
        parent[b] = a`,
    javascript: `function find(x) {
  if (parent[x] !== x) parent[x] = find(parent[x]);
  return parent[x];
}

function union(a, b) {
  a = find(a);
  b = find(b);
  if (a !== b) parent[b] = a;
}`,
    problems: [
      ["LeetCode — Number of Provinces", "Medium", "https://leetcode.com/problems/number-of-provinces/"],
      ["LeetCode — Redundant Connection", "Medium", "https://leetcode.com/problems/redundant-connection/"],
      ["LeetCode — Min Cost to Connect All Points", "Medium", "https://leetcode.com/problems/min-cost-to-connect-all-points/"],
    ],
  },
];

const storageKey = "algo-roadmap-completed";
const grid = document.querySelector("#topic-grid");
const template = document.querySelector("#topic-template");
const searchInput = document.querySelector("#search-input");
const filters = [...document.querySelectorAll(".filter")];
const resultSummary = document.querySelector("#result-summary");
const emptyState = document.querySelector("#empty-state");
const progressCount = document.querySelector("#progress-count");
const progressBar = document.querySelector("#progress-bar");
const progressTrack = document.querySelector(".progress-track");
const progressMessage = document.querySelector("#progress-message");
const resetButton = document.querySelector("#reset-progress");

let activeLevel = "all";
let completed = readCompleted();

function readCompleted() {
  try {
    return new Set(JSON.parse(localStorage.getItem(storageKey) ?? "[]"));
  } catch {
    return new Set();
  }
}

function saveCompleted() {
  localStorage.setItem(storageKey, JSON.stringify([...completed]));
}

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function createDetail(topic) {
  const problemItems = topic.problems
    .map(
      ([name, level, url]) => `
        <li>
          <a href="${url}" target="_blank" rel="noopener noreferrer">
            <span>${name}</span><small>${level} ↗</small>
          </a>
        </li>`,
    )
    .join("");

  return `
    <div class="detail-block">
      <h4>이 신호를 찾으세요</h4>
      <ul>${topic.signals.map((item) => `<li>${item}</li>`).join("")}</ul>
    </div>
    <div class="detail-block">
      <h4>풀이 순서</h4>
      <ol>${topic.steps.map((item) => `<li>${item}</li>`).join("")}</ol>
    </div>
    <div class="detail-block">
      <h4>복잡도</h4>
      <span class="complexity">${topic.complexity}</span>
    </div>
    <div class="detail-block">
      <h4>자주 하는 실수</h4>
      <p>${topic.mistake}</p>
    </div>
    <div class="detail-block">
      <h4>기본 템플릿</h4>
      <div class="code-tabs">
        <button class="code-tab active" type="button" data-language="python">Python</button>
        <button class="code-tab" type="button" data-language="javascript">JavaScript</button>
      </div>
      <pre><code>${escapeHtml(topic.python)}</code></pre>
    </div>
    <div class="detail-block">
      <h4>연습 문제</h4>
      <ul class="problem-list">${problemItems}</ul>
    </div>`;
}

function render() {
  const query = searchInput.value.trim().toLocaleLowerCase("ko");
  const visible = topics.filter((topic) => {
    const matchesLevel = activeLevel === "all" || topic.level === activeLevel;
    const haystack = [topic.title, topic.summary, ...topic.tags, ...topic.signals]
      .join(" ")
      .toLocaleLowerCase("ko");
    return matchesLevel && haystack.includes(query);
  });

  grid.replaceChildren();

  visible.forEach((topic) => {
    const fragment = template.content.cloneNode(true);
    const card = fragment.querySelector(".topic-card");
    const checkbox = fragment.querySelector('input[type="checkbox"]');
    const openButton = fragment.querySelector(".open-topic");
    const detail = fragment.querySelector(".topic-detail");
    const icon = openButton.lastElementChild;

    card.dataset.id = topic.id;
    card.classList.toggle("completed", completed.has(topic.id));
    fragment.querySelector(".topic-number").textContent = String(
      topics.indexOf(topic) + 1,
    ).padStart(2, "0");
    fragment.querySelector(".level-badge").textContent =
      topic.level === "basic" ? "기초" : "중급";
    fragment.querySelector("h3").textContent = topic.title;
    fragment.querySelector(".topic-summary").textContent = topic.summary;
    fragment.querySelector(".topic-tags").innerHTML = topic.tags
      .map((tag) => `<span>${tag}</span>`)
      .join("");
    detail.innerHTML = createDetail(topic);
    checkbox.checked = completed.has(topic.id);
    checkbox.setAttribute("aria-label", `${topic.title} 학습 완료`);

    checkbox.addEventListener("change", () => {
      if (checkbox.checked) completed.add(topic.id);
      else completed.delete(topic.id);
      card.classList.toggle("completed", checkbox.checked);
      saveCompleted();
      updateProgress();
    });

    openButton.addEventListener("click", () => {
      const isOpen = openButton.getAttribute("aria-expanded") === "true";
      openButton.setAttribute("aria-expanded", String(!isOpen));
      openButton.firstElementChild.textContent = isOpen ? "핵심 해법 보기" : "해법 접기";
      icon.textContent = isOpen ? "＋" : "−";
      detail.hidden = isOpen;
    });

    detail.querySelectorAll(".code-tab").forEach((tab) => {
      tab.addEventListener("click", () => {
        detail.querySelectorAll(".code-tab").forEach((item) => {
          item.classList.toggle("active", item === tab);
        });
        const code = topic[tab.dataset.language];
        detail.querySelector("code").textContent = code;
      });
    });

    grid.append(fragment);
  });

  resultSummary.textContent = `총 ${topics.length}개 중 ${visible.length}개 유형`;
  emptyState.hidden = visible.length !== 0;
}

function updateProgress() {
  const count = completed.size;
  const percentage = (count / topics.length) * 100;
  progressCount.textContent = `${count} / ${topics.length}`;
  progressBar.style.width = `${percentage}%`;
  progressTrack.setAttribute("aria-valuenow", String(count));

  if (count === topics.length) {
    progressMessage.textContent = "모든 유형을 훑었습니다. 이제 약한 유형을 다시 풀어보세요.";
  } else if (count >= 5) {
    progressMessage.textContent = "절반을 넘었습니다. 중급 유형도 차근차근 연결해보세요.";
  } else if (count > 0) {
    progressMessage.textContent = "좋은 시작입니다. 다음 유형에서도 판별 신호를 먼저 찾아보세요.";
  } else {
    progressMessage.textContent = "가장 익숙한 유형부터 하나씩 시작해보세요.";
  }
}

searchInput.addEventListener("input", render);

filters.forEach((filter) => {
  filter.addEventListener("click", () => {
    activeLevel = filter.dataset.level;
    filters.forEach((item) => {
      item.classList.toggle("active", item === filter);
    });
    render();
  });
});

resetButton.addEventListener("click", () => {
  if (!completed.size || !window.confirm("저장된 학습 진도를 모두 초기화할까요?")) {
    return;
  }
  completed = new Set();
  saveCompleted();
  updateProgress();
  render();
});

updateProgress();
render();
