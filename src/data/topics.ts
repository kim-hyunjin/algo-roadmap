export type TopicLevel = "basic" | "intermediate";

export type ProblemDifficulty = "Easy" | "Medium" | "Hard";

export interface PracticeProblem {
  name: string;
  difficulty: ProblemDifficulty;
  url: string;
  relation: "direct" | "variant";
  note?: string;
}

export interface Topic {
  id: string;
  title: string;
  level: TopicLevel;
  summary: string;
  tags: string[];
  signals: string[];
  preconditions: string[];
  doesNotApply: string[];
  steps: string[];
  complexity: string;
  complexityNotes: string[];
  mistake: string;
  problems: PracticeProblem[];
}

export const topics = [
  {
    id: "array-hash",
    title: "배열 · 해시",
    level: "basic",
    summary: "값의 존재 여부, 빈도, 빠른 조회가 핵심일 때 가장 먼저 떠올릴 도구입니다.",
    tags: ["빈도", "중복", "평균 O(1) 조회"],
    signals: ["값의 등장 횟수를 세어야 한다", "중복 여부를 빠르게 확인한다", "두 값의 관계를 즉시 조회한다"],
    preconditions: ["키의 동등성 기준이 문제와 맞아야 합니다.", "저장할 키의 수만큼 추가 메모리를 사용할 수 있어야 합니다."],
    doesNotApply: ["정렬 순서나 값의 범위 질의가 핵심이면 정렬, 트리, 누적 구조가 더 알맞을 수 있습니다.", "해시 조회의 엄격한 최악 시간 보장이 필요한 상황에는 그대로 의존하지 않습니다."],
    steps: ["키와 값이 무엇인지 정한다.", "한 번 순회하며 빈도나 위치를 저장한다.", "두 번째 순회 또는 즉시 조회로 답을 만든다."],
    complexity: "평균 O(N), 보조 공간 O(N)",
    complexityNotes: ["해시 조회와 갱신은 평균 O(1)이며 충돌이 심한 최악의 경우는 구현에 따라 달라집니다."],
    mistake: "Python 딕셔너리 키는 hashable해야 합니다. JavaScript Map의 객체 키는 내용이 아니라 객체 동일성으로 비교됩니다.",
    problems: [
      { name: "LeetCode — Contains Duplicate", difficulty: "Easy", url: "https://leetcode.com/problems/contains-duplicate/", relation: "direct" },
      { name: "LeetCode — Valid Anagram", difficulty: "Easy", url: "https://leetcode.com/problems/valid-anagram/", relation: "direct" },
      { name: "LeetCode — Two Sum", difficulty: "Easy", url: "https://leetcode.com/problems/two-sum/", relation: "direct" },
    ],
  },
  {
    id: "stack-queue",
    title: "스택 · 큐",
    level: "basic",
    summary: "최근 작업을 되돌리거나, 들어온 순서대로 상태를 처리할 때 사용합니다.",
    tags: ["LIFO", "FIFO", "괄호"],
    signals: ["가장 최근 항목부터 제거한다", "처리 순서가 입력 순서와 같다", "짝이 맞는지 검사한다"],
    preconditions: ["어느 쪽에서 삽입하고 제거할지 먼저 정합니다.", "큐는 앞쪽 제거가 O(1)인 deque 또는 head 인덱스 방식으로 구현합니다."],
    doesNotApply: ["항상 가장 작은 값부터 처리해야 하면 우선순위 큐가 더 적합합니다.", "중간 원소를 자주 찾거나 삭제해야 하면 스택·큐만으로는 부족합니다."],
    steps: ["삽입·삭제가 어느 쪽에서 일어나는지 확인한다.", "필요한 값과 인덱스를 함께 저장한다.", "꺼낼 때 비어 있는지 먼저 검사한다."],
    complexity: "일반적인 push/pop·enqueue/dequeue O(1), 전체 O(N)",
    complexityNotes: ["두 스택으로 만든 큐의 dequeue는 한 번에 O(N)이 들 수 있지만 연속 연산 전체로는 분할상환 O(1)입니다."],
    mistake: "JavaScript에서 배열의 shift는 O(N)입니다. 큐의 앞쪽 인덱스를 따로 관리하세요.",
    problems: [
      { name: "LeetCode — Valid Parentheses", difficulty: "Easy", url: "https://leetcode.com/problems/valid-parentheses/", relation: "direct" },
      { name: "LeetCode — Implement Queue using Stacks", difficulty: "Easy", url: "https://leetcode.com/problems/implement-queue-using-stacks/", relation: "variant", note: "두 스택으로 큐를 만들고 분할상환 O(1)을 설명합니다." },
      { name: "LeetCode — Daily Temperatures", difficulty: "Medium", url: "https://leetcode.com/problems/daily-temperatures/", relation: "variant", note: "값을 단조롭게 유지하는 스택에 인덱스를 저장합니다." },
    ],
  },
  {
    id: "bruteforce",
    title: "완전 탐색 · 백트래킹",
    level: "basic",
    summary: "가능한 경우가 작고 모든 조합을 확인해야 할 때, 탐색 트리를 만들고 가지를 줄입니다.",
    tags: ["조합", "순열", "가지치기"],
    signals: ["입력 크기가 매우 작다", "모든 순서나 조합을 구한다", "조건을 만족하는 경우를 센다"],
    preconditions: ["가능한 상태 수가 제한 시간 안에 탐색 가능한지 먼저 추정합니다.", "상태, 선택지, 종료 조건과 원상 복구 대상을 정의할 수 있어야 합니다."],
    doesNotApply: ["입력이 커서 지수적 상태 수를 모두 볼 수 없으면 DP, 그리디, 가지치기 강화가 필요합니다.", "중복 값이 있으면 같은 결과를 중복 생성하지 않을 규칙을 추가해야 합니다."],
    steps: ["상태, 선택지, 종료 조건을 정의한다.", "선택하고 재귀 호출한 뒤 반드시 원상 복구한다.", "답이 될 수 없는 상태는 일찍 종료한다."],
    complexity: "상태 수에 따라 O(2ᴺ), O(N!) 등, 재귀 보조 공간 O(N)",
    complexityNotes: ["결과 자체를 모두 반환하면 복사와 출력 크기도 시간·공간 복잡도에 포함합니다."],
    mistake: "백트래킹 후 방문 표시나 변경한 값을 복구하지 않는 실수를 가장 먼저 확인하세요.",
    problems: [
      { name: "LeetCode — Subsets", difficulty: "Medium", url: "https://leetcode.com/problems/subsets/", relation: "direct" },
      { name: "LeetCode — Permutations", difficulty: "Medium", url: "https://leetcode.com/problems/permutations/", relation: "direct" },
      { name: "LeetCode — N-Queens", difficulty: "Hard", url: "https://leetcode.com/problems/n-queens/", relation: "variant", note: "열과 두 대각선의 충돌을 상태로 관리하며 강하게 가지치기합니다." },
    ],
  },
  {
    id: "greedy",
    title: "정렬 · 그리디",
    level: "basic",
    summary: "매 순간의 최선이 전체 최선으로 이어지는 근거를 찾고, 선택 기준대로 정렬합니다.",
    tags: ["선택 기준", "정렬", "증명"],
    signals: ["최소 횟수나 최대 개수를 구한다", "앞의 선택이 뒤의 선택 범위를 결정한다", "구간을 가능한 많이 고른다"],
    preconditions: ["국소 선택이 전체 최적해를 해치지 않는다는 교환 논법이나 불변식을 설명할 수 있어야 합니다.", "회의 예시는 [start, end) 구간으로 보며 end와 다음 start가 같으면 겹치지 않습니다."],
    doesNotApply: ["현재 최선 선택이 미래 선택지를 망치는 반례가 있으면 DP나 탐색을 검토합니다.", "정렬 기준을 바꿨을 때 결과가 달라지면 그 기준의 정당성을 먼저 증명해야 합니다."],
    steps: ["후보를 비교할 한 가지 기준을 찾는다.", "교환 논법으로 그 선택이 손해가 아님을 설명한다.", "정렬 후 한 번 순회하며 선택한다."],
    complexity: "정렬이 지배하면 O(N log N)",
    complexityNotes: ["제자리 정렬은 입력 순서를 바꾸므로 원본이 필요하면 복사본을 정렬합니다."],
    mistake: "예제에서 잘 된다는 이유만으로 그리디를 확정하지 말고, 반례 또는 교환 논법을 확인하세요.",
    problems: [
      { name: "LeetCode — Best Time to Buy and Sell Stock", difficulty: "Easy", url: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/", relation: "variant", note: "지금까지의 최소 가격을 유지하는 불변식을 사용합니다." },
      { name: "LeetCode — Jump Game", difficulty: "Medium", url: "https://leetcode.com/problems/jump-game/", relation: "variant", note: "도달 가능한 가장 먼 위치를 유지하는 그리디입니다." },
      { name: "LeetCode — Non-overlapping Intervals", difficulty: "Medium", url: "https://leetcode.com/problems/non-overlapping-intervals/", relation: "direct" },
    ],
  },
  {
    id: "binary-search",
    title: "이분 탐색",
    level: "intermediate",
    summary: "정렬된 값의 위치를 찾거나, 가능한 답의 경계를 빠르게 좁힙니다.",
    tags: ["정렬", "경계", "매개변수 탐색"],
    signals: ["정렬된 데이터에서 값을 찾는다", "최댓값의 최솟값을 구한다", "어떤 값 이상부터 조건이 계속 참이다"],
    preconditions: ["값 배열은 정렬되어 있거나 판정 함수의 결과가 한 방향으로만 바뀌어야 합니다.", "반열린 구간 [left, right)을 끝까지 일관되게 사용합니다."],
    doesNotApply: ["판정 결과가 거짓→참→거짓처럼 여러 번 바뀌면 경계를 이분 탐색할 수 없습니다.", "정렬 비용이 한 번의 선형 탐색보다 큰 일회성 작업인지 확인합니다."],
    steps: ["탐색 구간과 판정 함수를 정의한다.", "판정 결과가 한 방향으로만 바뀌는지 확인한다.", "반복이 끝난 뒤 left와 right 중 무엇이 답인지 검증한다."],
    complexity: "값 조회 O(log N), 답 탐색 O(C · log R)",
    complexityNotes: ["C는 판정 함수 한 번의 비용, R은 가능한 답의 범위입니다. 조건을 만족하는 값이 없으면 lower bound는 len(values)를 반환합니다."],
    mistake: "구간의 포함 여부와 mid 갱신 규칙을 섞지 말고 하나의 템플릿을 일관되게 사용하세요.",
    problems: [
      { name: "LeetCode — Binary Search", difficulty: "Easy", url: "https://leetcode.com/problems/binary-search/", relation: "direct" },
      { name: "LeetCode — Search Insert Position", difficulty: "Easy", url: "https://leetcode.com/problems/search-insert-position/", relation: "direct" },
      { name: "LeetCode — Capacity To Ship Packages Within D Days", difficulty: "Medium", url: "https://leetcode.com/problems/capacity-to-ship-packages-within-d-days/", relation: "variant", note: "배송 가능 여부를 판정 함수로 만든 뒤 용량의 최솟값을 탐색합니다." },
    ],
  },
  {
    id: "two-pointer",
    title: "투 포인터 · 슬라이딩 윈도우",
    level: "intermediate",
    summary: "연속 구간이나 정렬된 배열에서 두 경계를 움직여 중복 계산을 없앱니다.",
    tags: ["연속 구간", "구간 합", "두 경계"],
    signals: ["연속된 부분 구간을 구한다", "두 수의 합이 목표에 가까워야 한다", "구간을 늘리고 줄이며 조건을 맞춘다"],
    preconditions: ["슬라이딩 윈도우는 창을 확장·축소할 때 판정 조건이 단조롭게 변해야 합니다.", "현재 합 템플릿은 모든 원소가 양수인 연속 구간에 사용합니다."],
    doesNotApply: ["음수가 섞인 합 문제는 왼쪽을 줄여도 합이 한 방향으로 변하지 않아 현재 템플릿이 실패할 수 있습니다.", "정렬하면 원래 순서의 연속성이 깨지는 문제에서는 정렬 기반 투 포인터를 사용하지 않습니다."],
    steps: ["왼쪽과 오른쪽 포인터의 의미를 정한다.", "어떤 조건에서 어느 포인터가 움직이는지 결정한다.", "포인터가 움직일 때 합이나 빈도를 증분 갱신한다."],
    complexity: "두 포인터가 각각 최대 N번 이동하면 O(N), 보조 공간 O(1) 또는 빈도표 크기",
    complexityNotes: ["정렬된 배열의 양끝 포인터와 원래 순서의 슬라이딩 윈도우는 서로 다른 전제 조건을 사용합니다."],
    mistake: "정렬이 필요한 문제인지, 원래 순서의 연속 구간을 다루는 문제인지 구분하세요.",
    problems: [
      { name: "LeetCode — Valid Palindrome", difficulty: "Easy", url: "https://leetcode.com/problems/valid-palindrome/", relation: "direct" },
      { name: "LeetCode — Two Sum II", difficulty: "Medium", url: "https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/", relation: "direct" },
      { name: "LeetCode — Minimum Size Subarray Sum", difficulty: "Medium", url: "https://leetcode.com/problems/minimum-size-subarray-sum/", relation: "direct" },
    ],
  },
  {
    id: "graph-search",
    title: "DFS · BFS",
    level: "basic",
    summary: "연결 관계를 따라가며 모든 상태를 방문하거나, 간선 비용이 같을 때 최단 단계를 찾습니다.",
    tags: ["그래프", "격자", "최단 단계"],
    signals: ["서로 연결된 영역을 센다", "상하좌우로 이동한다", "최소 이동 횟수를 구하고 모든 이동 비용이 같다"],
    preconditions: ["노드와 간선, 그래프의 방향성, 방문 상태를 명확히 정의합니다.", "BFS 최단 거리는 모든 이동 비용이 같을 때 적용합니다."],
    doesNotApply: ["간선 비용이 다르면 일반 BFS 대신 다익스트라 등 가중치 알고리즘을 검토합니다.", "상태에 열쇠 수나 남은 기회가 포함되면 위치만 방문 표시하지 말고 전체 상태를 기록합니다."],
    steps: ["노드와 간선이 무엇인지 정의한다.", "방문 시점을 큐나 스택에 넣는 순간으로 정한다.", "인접 상태가 범위 안이고 미방문인지 확인한다."],
    complexity: "O(V + E), 격자는 O(행 × 열)",
    complexityNotes: ["방문 배열·집합과 큐/스택에 O(V), 격자에서는 O(행 × 열) 보조 공간이 들 수 있습니다."],
    mistake: "BFS에서 큐에서 꺼낼 때 방문 처리하면 같은 노드가 여러 번 들어갈 수 있습니다.",
    problems: [
      { name: "LeetCode — Flood Fill", difficulty: "Easy", url: "https://leetcode.com/problems/flood-fill/", relation: "direct" },
      { name: "LeetCode — Number of Islands", difficulty: "Medium", url: "https://leetcode.com/problems/number-of-islands/", relation: "direct" },
      { name: "LeetCode — Shortest Path in Binary Matrix", difficulty: "Medium", url: "https://leetcode.com/problems/shortest-path-in-binary-matrix/", relation: "direct" },
    ],
  },
  {
    id: "dynamic-programming",
    title: "동적 계획법",
    level: "intermediate",
    summary: "겹치는 작은 문제의 답을 저장해 같은 계산을 반복하지 않습니다.",
    tags: ["상태", "점화식", "메모이제이션"],
    signals: ["경우의 수, 최댓값, 최솟값을 구한다", "현재 답이 이전 상태의 답으로 표현된다", "재귀 호출에 같은 인자가 반복된다"],
    preconditions: ["같은 부분 문제가 반복되고 큰 문제의 답을 작은 문제의 답으로 구성할 수 있어야 합니다.", "상태가 답을 결정하는 데 필요한 정보를 빠짐없이 담아야 합니다."],
    doesNotApply: ["최댓값·최솟값을 묻는다는 이유만으로 DP를 확정하지 않습니다.", "상태 수가 너무 크면 상태 압축, 다른 관찰, 그리디 가능성을 검토합니다."],
    steps: ["dp 상태가 의미하는 문장을 먼저 쓴다.", "이전 상태에서 현재 상태로 오는 점화식을 만든다.", "초깃값과 계산 순서를 정한다."],
    complexity: "상태 수 × 상태당 전이 수",
    complexityNotes: ["표 전체가 필요하지 않으면 이전 상태만 보존해 보조 공간을 줄일 수 있습니다."],
    mistake: "점화식보다 먼저 배열부터 만들지 말고, dp[i]가 정확히 무엇인지 한 문장으로 정의하세요.",
    problems: [
      { name: "LeetCode — Climbing Stairs", difficulty: "Easy", url: "https://leetcode.com/problems/climbing-stairs/", relation: "direct" },
      { name: "LeetCode — House Robber", difficulty: "Medium", url: "https://leetcode.com/problems/house-robber/", relation: "direct" },
      { name: "LeetCode — Longest Increasing Subsequence", difficulty: "Medium", url: "https://leetcode.com/problems/longest-increasing-subsequence/", relation: "variant", note: "O(N²) DP로 시작하고, 별도의 tails 배열과 이분 탐색으로 O(N log N)까지 개선할 수 있습니다." },
    ],
  },
  {
    id: "shortest-path",
    title: "최단 경로",
    level: "intermediate",
    summary: "가중치가 있는 그래프에서 시작점부터 각 노드까지의 최소 비용을 갱신합니다.",
    tags: ["다익스트라", "가중치", "우선순위 큐"],
    signals: ["도로마다 비용이 다르다", "한 지점에서 다른 지점까지 최소 비용을 구한다", "음수가 아닌 가중치가 주어진다"],
    preconditions: ["다익스트라는 모든 간선 가중치가 0 이상이어야 합니다.", "모든 노드는 인접 간선이 없어도 graph의 키로 존재하고, 우선순위 큐는 최소 비용 항목을 먼저 꺼내야 합니다."],
    doesNotApply: ["가중치가 모두 같으면 BFS가 더 단순하고, 음수 간선이 있으면 Bellman–Ford나 DAG 최단 경로를 검토합니다.", "모든 쌍의 거리나 경유 횟수 제한이 있으면 상태와 알고리즘을 별도로 설계합니다."],
    steps: ["간선 가중치가 음수가 아닌지 확인한다.", "가장 가까운 미확정 노드를 우선순위 큐에서 꺼낸다.", "이미 더 짧은 거리로 처리한 항목은 건너뛴다."],
    complexity: "인접 리스트 + 이진 최소 힙 기준 O((V + E) log V), 공간 O(V + E)",
    complexityNotes: ["heap은 push([비용, 노드]), popMin(), isEmpty() 계약을 제공해야 합니다."],
    mistake: "우선순위 큐에 같은 노드가 여러 번 들어갈 수 있으므로 꺼낸 거리와 최신 거리를 비교하세요.",
    problems: [
      { name: "LeetCode — Network Delay Time", difficulty: "Medium", url: "https://leetcode.com/problems/network-delay-time/", relation: "direct" },
      { name: "LeetCode — Cheapest Flights Within K Stops", difficulty: "Medium", url: "https://leetcode.com/problems/cheapest-flights-within-k-stops/", relation: "variant", note: "노드와 사용한 간선 수를 함께 상태로 두거나 Bellman–Ford식 DP를 사용합니다." },
      { name: "LeetCode — Path With Minimum Effort", difficulty: "Medium", url: "https://leetcode.com/problems/path-with-minimum-effort/", relation: "variant", note: "거리 합 대신 경로에서 가장 큰 간선 비용을 완화하는 minimax 다익스트라입니다." },
    ],
  },
  {
    id: "union-find-mst",
    title: "유니온 파인드 · MST",
    level: "intermediate",
    summary: "집합의 연결 여부를 빠르게 관리하고, 모든 노드를 잇는 최소 비용 구조를 만듭니다.",
    tags: ["집합", "사이클", "크루스칼"],
    signals: ["두 노드가 같은 그룹인지 묻는다", "간선을 추가하며 사이클을 검사한다", "모든 지점을 최소 비용으로 연결한다"],
    preconditions: ["MST는 가중치가 있는 무방향 연결 그래프를 대상으로 합니다.", "유니온 파인드는 미리 알고 있는 원소 집합을 parent와 size로 초기화합니다."],
    doesNotApply: ["그래프가 연결되지 않으면 MST가 아니라 각 연결 요소의 최소 신장 포리스트만 얻습니다.", "간선 삭제까지 온라인으로 처리해야 하는 동적 연결성 문제에는 기본 유니온 파인드만으로 부족합니다."],
    steps: ["각 노드의 대표를 자기 자신으로 초기화한다.", "find에 경로 압축을 적용한다.", "MST는 간선을 비용순으로 보며 다른 집합일 때만 합친다."],
    complexity: "경로 압축 + 크기 기준 union은 연산당 분할상환 O(α(N)), 크루스칼 O(E log E)",
    complexityNotes: ["α(N)은 역 아커만 함수로 현실적인 입력에서 매우 작습니다. 제자리 간선 정렬은 입력 순서를 바꿉니다."],
    mistake: "union에서 노드 자체가 아니라 각 노드의 대표 루트를 연결해야 합니다.",
    problems: [
      { name: "LeetCode — Number of Provinces", difficulty: "Medium", url: "https://leetcode.com/problems/number-of-provinces/", relation: "direct" },
      { name: "LeetCode — Redundant Connection", difficulty: "Medium", url: "https://leetcode.com/problems/redundant-connection/", relation: "direct" },
      { name: "LeetCode — Min Cost to Connect All Points", difficulty: "Medium", url: "https://leetcode.com/problems/min-cost-to-connect-all-points/", relation: "variant", note: "완전 그래프라 모든 간선을 만들면 O(N²) 공간이 들 수 있으며 Prim 풀이도 자주 사용합니다." },
    ],
  },
] satisfies Topic[];
