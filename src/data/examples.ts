export type VisualState =
  | "normal"
  | "active"
  | "visited"
  | "candidate"
  | "success"
  | "muted"
  | "blocked";

export type VisualCell =
  | string
  | {
      value: string;
      state?: VisualState;
    };

export interface VisualRow {
  label: string;
  cells: VisualCell[];
}

export interface VisualFrame {
  title: string;
  description: string;
  rows: VisualRow[];
}

export interface RepresentativeExample {
  title: string;
  prompt: string;
  input: string;
  output: string;
  inputContract: string;
  timeComplexity: string;
  spaceComplexity: string;
  keyIdea: string;
  reasoning: Array<{
    title: string;
    description: string;
  }>;
  python: string;
  javascript: string;
  cpp: string;
  visualizationLabel: string;
  frames: VisualFrame[];
}

export const examples: Record<string, RepresentativeExample> = {
  "array-hash": {
    title: "두 수의 합",
    prompt: "정수 배열에서 합이 target이 되는 서로 다른 두 원소의 인덱스를 찾으세요.",
    input: "nums = [2, 7, 11, 15], target = 9",
    output: "[0, 1]",
    inputContract: "정수 배열에서 서로 다른 두 인덱스를 사용합니다. 답이 없으면 빈 배열을 반환합니다.",
    timeComplexity: "평균 O(N)",
    spaceComplexity: "O(N)",
    keyIdea:
      "현재 값 x를 볼 때 필요한 값 target - x가 앞에서 등장했는지만 해시에서 찾습니다. 모든 쌍을 다시 비교하지 않아도 됩니다.",
    reasoning: [
      { title: "필요한 값 계산", description: "x와 더해 target이 될 값인 target - x를 계산합니다." },
      { title: "먼저 조회", description: "필요한 값이 해시에 있으면 이전 인덱스와 현재 인덱스가 정답입니다." },
      { title: "나중에 저장", description: "정답이 아니라면 현재 값과 인덱스를 저장하고 다음 원소로 갑니다." },
    ],
    python: `def two_sum(nums, target):
    seen = {}
    for index, value in enumerate(nums):
        need = target - value
        if need in seen:
            return [seen[need], index]
        seen[value] = index
    return []`,
    javascript: `function twoSum(nums, target) {
  const seen = new Map();
  for (let index = 0; index < nums.length; index++) {
    const need = target - nums[index];
    if (seen.has(need)) return [seen.get(need), index];
    seen.set(nums[index], index);
  }
  return [];
}`,
    cpp: `#include <unordered_map>
#include <vector>

std::vector<int> twoSum(const std::vector<int>& nums, int target) {
  std::unordered_map<int, int> seen;
  for (int index = 0; index < static_cast<int>(nums.size()); ++index) {
    int need = target - nums[index];
    auto found = seen.find(need);
    if (found != seen.end()) return {found->second, index};
    seen[nums[index]] = index;
  }
  return {};
}`,
    visualizationLabel: "해시를 이용해 두 수의 합을 찾는 과정",
    frames: [
      {
        title: "2를 확인합니다",
        description: "9 - 2 = 7이 필요하지만 해시가 비어 있습니다. 2의 인덱스 0을 저장합니다.",
        rows: [
          { label: "nums", cells: [{ value: "2", state: "active" }, "7", "11", "15"] },
          { label: "seen", cells: [{ value: "2 → 0", state: "visited" }] },
          { label: "need", cells: [{ value: "7 없음", state: "muted" }] },
        ],
      },
      {
        title: "7을 확인합니다",
        description: "9 - 7 = 2이고, 2는 해시에 있습니다. 저장된 인덱스 0과 현재 인덱스 1을 반환합니다.",
        rows: [
          { label: "nums", cells: [{ value: "2", state: "success" }, { value: "7", state: "active" }, "11", "15"] },
          { label: "seen", cells: [{ value: "2 → 0", state: "success" }] },
          { label: "answer", cells: [{ value: "[0, 1]", state: "success" }] },
        ],
      },
    ],
  },
  "stack-queue": {
    title: "올바른 괄호",
    prompt: "문자열의 모든 괄호가 올바른 순서로 열리고 닫히는지 판별하세요.",
    input: "s = \"({[]})\"",
    output: "true",
    inputContract: "입력은 여섯 괄호 문자 (), {}, []로만 구성됩니다.",
    timeComplexity: "O(N)",
    spaceComplexity: "최악 O(N)",
    keyIdea:
      "여는 괄호는 스택에 쌓고, 닫는 괄호를 만나면 스택 맨 위와 짝이 맞는지 확인합니다. 가장 최근에 열린 괄호가 먼저 닫혀야 합니다.",
    reasoning: [
      { title: "여는 괄호 저장", description: "(, {, [를 만나면 스택의 맨 뒤에 넣습니다." },
      { title: "닫는 괄호 비교", description: "닫는 괄호의 짝이 스택 맨 위인지 확인한 뒤 꺼냅니다." },
      { title: "빈 스택 확인", description: "끝났을 때 스택이 비어 있어야 모든 괄호가 닫힌 것입니다." },
    ],
    python: `def is_valid(s):
    pairs = {")": "(", "}": "{", "]": "["}
    stack = []
    for char in s:
        if char not in pairs:
            stack.append(char)
        elif not stack or stack.pop() != pairs[char]:
            return False
    return not stack`,
    javascript: `function isValid(s) {
  const pairs = new Map([[")", "("], ["}", "{"], ["]", "["]]);
  const stack = [];
  for (const char of s) {
    if (!pairs.has(char)) stack.push(char);
    else if (stack.pop() !== pairs.get(char)) return false;
  }
  return stack.length === 0;
}`,
    cpp: `#include <stack>
#include <string>
#include <unordered_map>

bool isValid(const std::string& s) {
  const std::unordered_map<char, char> pairs = {
    {')', '('}, {'}', '{'}, {']', '['}
  };
  std::stack<char> stack;
  for (char ch : s) {
    auto found = pairs.find(ch);
    if (found == pairs.end()) {
      stack.push(ch);
    } else {
      if (stack.empty() || stack.top() != found->second) return false;
      stack.pop();
    }
  }
  return stack.empty();
}`,
    visualizationLabel: "스택에 괄호를 넣고 빼는 과정",
    frames: [
      { title: "여는 괄호를 쌓습니다", description: "(, {, [가 차례로 들어오므로 스택 위에 계속 쌓습니다.", rows: [{ label: "입력", cells: [{ value: "(", state: "visited" }, { value: "{", state: "visited" }, { value: "[", state: "active" }, "]", "}", ")"] }, { label: "stack", cells: ["(", "{", { value: "[ ← top", state: "active" }] }] },
      { title: "]가 [를 닫습니다", description: "스택 맨 위 [와 짝이 맞으므로 [를 꺼냅니다.", rows: [{ label: "입력", cells: ["(", "{", "[", { value: "]", state: "active" }, "}", ")"] }, { label: "stack", cells: ["(", { value: "{ ← top", state: "visited" }] }] },
      { title: "}가 {를 닫습니다", description: "다시 맨 위 {와 짝이 맞아 꺼냅니다.", rows: [{ label: "입력", cells: ["(", "{", "[", "]", { value: "}", state: "active" }, ")"] }, { label: "stack", cells: [{ value: "( ← top", state: "visited" }] }] },
      { title: "모두 닫혔습니다", description: ")가 (를 닫고 스택이 비었습니다. 따라서 올바른 괄호입니다.", rows: [{ label: "입력", cells: ["(", "{", "[", "]", "}", { value: ")", state: "success" }] }, { label: "stack", cells: [{ value: "비어 있음", state: "success" }] }] },
    ],
  },
  "bruteforce": {
    title: "모든 부분집합",
    prompt: "서로 다른 숫자 배열의 모든 부분집합을 만드세요.",
    input: "nums = [1, 2, 3]",
    output: "[1,2,3], [1,2], [1,3], [1], [2,3], [2], [3], [] (순서는 무관)",
    inputContract: "nums의 값은 서로 다릅니다. 부분집합의 나열 순서는 정답에 영향을 주지 않습니다.",
    timeComplexity: "O(N · 2ᴺ) — 각 결과 복사 비용 포함",
    spaceComplexity: "출력 O(N · 2ᴺ), 재귀 보조 공간 O(N)",
    keyIdea:
      "각 숫자마다 ‘고른다’와 ‘고르지 않는다’ 두 갈래를 모두 탐색합니다. 선택한 뒤 재귀 호출하고, 돌아오면 선택을 취소해야 다른 갈래를 탐색할 수 있습니다.",
    reasoning: [
      { title: "상태 정의", description: "index는 결정할 숫자 위치, path는 지금까지 고른 숫자입니다." },
      { title: "두 갈래 탐색", description: "현재 숫자를 포함하는 재귀와 포함하지 않는 재귀를 모두 호출합니다." },
      { title: "원상 복구", description: "포함한 갈래가 끝나면 pop으로 선택을 취소한 뒤 제외 갈래로 이동합니다." },
    ],
    python: `def subsets(nums):
    answer, path = [], []
    def search(index):
        if index == len(nums):
            answer.append(path[:])
            return
        path.append(nums[index])
        search(index + 1)
        path.pop()
        search(index + 1)
    search(0)
    return answer`,
    javascript: `function subsets(nums) {
  const answer = [], path = [];
  function search(index) {
    if (index === nums.length) return answer.push([...path]);
    path.push(nums[index]);
    search(index + 1);
    path.pop();
    search(index + 1);
  }
  search(0);
  return answer;
}`,
    cpp: `#include <vector>

std::vector<std::vector<int>> subsets(const std::vector<int>& nums) {
  std::vector<std::vector<int>> answer;
  std::vector<int> path;

  auto search = [&](auto&& self, int index) -> void {
    if (index == static_cast<int>(nums.size())) {
      answer.push_back(path);
      return;
    }
    path.push_back(nums[index]);
    self(self, index + 1);
    path.pop_back();
    self(self, index + 1);
  };

  search(search, 0);
  return answer;
}`,
    visualizationLabel: "부분집합 탐색 트리에서 선택하고 되돌리는 과정",
    frames: [
      { title: "1을 선택합니다", description: "첫 갈래에서 1을 path에 넣고 다음 숫자 2로 내려갑니다.", rows: [{ label: "결정", cells: [{ value: "1 선택", state: "active" }, "2 ?", "3 ?"] }, { label: "path", cells: [{ value: "[1]", state: "candidate" }] }] },
      { title: "2와 3도 선택합니다", description: "선택 갈래를 계속 따라가면 첫 결과 [1,2,3]을 얻습니다.", rows: [{ label: "결정", cells: [{ value: "1 선택", state: "visited" }, { value: "2 선택", state: "visited" }, { value: "3 선택", state: "active" }] }, { label: "결과", cells: [{ value: "[1,2,3]", state: "success" }] }] },
      { title: "3 선택을 되돌립니다", description: "pop으로 3을 빼고 ‘3을 고르지 않는’ 갈래에서 [1,2]를 기록합니다.", rows: [{ label: "결정", cells: ["1 선택", "2 선택", { value: "3 제외", state: "active" }] }, { label: "결과", cells: ["[1,2,3]", { value: "[1,2]", state: "success" }] }] },
      { title: "모든 갈래를 탐색합니다", description: "같은 방식으로 2와 1도 되돌리면 2³ = 8개의 부분집합이 완성됩니다.", rows: [{ label: "결과", cells: ["[1,2,3]", "[1,2]", "[1,3]", "[1]", "[2,3]", "[2]", "[3]", { value: "[]", state: "success" }] }] },
    ],
  },
  "greedy": {
    title: "겹치지 않는 회의 최대 선택",
    prompt: "시작·종료 시간이 주어진 회의 중 서로 겹치지 않게 가장 많은 회의를 고르세요.",
    input: "meetings = [(1,3), (2,5), (4,6), (6,7)]",
    output: "3개: (1,3), (4,6), (6,7)",
    inputContract: "회의는 [start, end) 구간입니다. end와 다음 start가 같으면 겹치지 않으며 코드는 입력 배열을 정렬합니다.",
    timeComplexity: "O(N log N)",
    spaceComplexity: "선택 결과 O(N), 정렬 보조 공간은 언어 구현에 따라 다름",
    keyIdea:
      "가장 빨리 끝나는 회의를 고르면 뒤에 남는 시간이 최대가 됩니다. 종료 시간순으로 정렬하고, 직전에 고른 회의가 끝난 뒤 시작하는 회의만 선택합니다.",
    reasoning: [
      { title: "선택 기준", description: "시작 시간이 아니라 종료 시간이 빠른 순서로 정렬합니다." },
      { title: "겹침 검사", description: "회의 시작이 lastEnd 이상이면 선택하고 lastEnd를 갱신합니다." },
      { title: "왜 안전한가", description: "더 늦게 끝나는 회의를 골라도 이후 선택지가 늘지 않으므로 빠른 종료가 손해가 아닙니다." },
    ],
    python: `def max_meetings(meetings):
    meetings.sort(key=lambda meeting: meeting[1])
    chosen, last_end = [], float("-inf")
    for start, end in meetings:
        if start >= last_end:
            chosen.append((start, end))
            last_end = end
    return chosen`,
    javascript: `function maxMeetings(meetings) {
  meetings.sort((a, b) => a[1] - b[1]);
  const chosen = [];
  let lastEnd = -Infinity;
  for (const meeting of meetings) {
    if (meeting[0] >= lastEnd) {
      chosen.push(meeting);
      lastEnd = meeting[1];
    }
  }
  return chosen;
}`,
    cpp: `#include <algorithm>
#include <limits>
#include <utility>
#include <vector>

std::vector<std::pair<int, int>> maxMeetings(
    std::vector<std::pair<int, int>> meetings) {
  std::sort(meetings.begin(), meetings.end(), [](const auto& a, const auto& b) {
    return a.second < b.second;
  });
  std::vector<std::pair<int, int>> chosen;
  int lastEnd = std::numeric_limits<int>::min();
  for (const auto& [start, end] : meetings) {
    if (start >= lastEnd) {
      chosen.push_back({start, end});
      lastEnd = end;
    }
  }
  return chosen;
}`,
    visualizationLabel: "종료 시간순으로 회의를 선택하는 과정",
    frames: [
      { title: "가장 빨리 끝나는 회의 선택", description: "(1,3)을 선택하고 lastEnd를 3으로 둡니다.", rows: [{ label: "회의", cells: [{ value: "1─3", state: "success" }, "2──5", "4─6", "6─7"] }, { label: "lastEnd", cells: [{ value: "3", state: "active" }] }] },
      { title: "겹치는 회의 제외", description: "(2,5)는 2 < 3이므로 이미 고른 회의와 겹쳐 제외합니다.", rows: [{ label: "회의", cells: ["1─3", { value: "2──5", state: "blocked" }, "4─6", "6─7"] }, { label: "선택", cells: [{ value: "(1,3)", state: "visited" }] }] },
      { title: "다음 두 회의 선택", description: "4 ≥ 3이라 (4,6), 이어서 6 ≥ 6이라 (6,7)을 선택합니다.", rows: [{ label: "회의", cells: [{ value: "1─3", state: "success" }, { value: "2──5", state: "blocked" }, { value: "4─6", state: "success" }, { value: "6─7", state: "success" }] }, { label: "선택", cells: [{ value: "3개", state: "success" }] }] },
    ],
  },
  "binary-search": {
    title: "처음으로 7 이상인 위치",
    prompt: "정렬된 배열에서 target 이상인 값이 처음 나타나는 인덱스를 찾으세요.",
    input: "values = [1, 3, 5, 7, 9, 11], target = 7",
    output: "3",
    inputContract: "values는 오름차순입니다. target 이상인 값이 없으면 values.length를 반환합니다.",
    timeComplexity: "O(log N)",
    spaceComplexity: "O(1)",
    keyIdea:
      "‘values[i]가 7 이상인가?’는 배열에서 거짓 구간 뒤에 참 구간이 이어지는 단조 조건입니다. 참이 처음 시작되는 경계를 이분 탐색합니다.",
    reasoning: [
      { title: "반열린 구간", description: "탐색 범위를 [left, right)로 두고 right는 배열 길이에서 시작합니다." },
      { title: "중간값 판정", description: "mid 값이 target보다 작으면 답은 오른쪽, 아니면 mid도 후보이므로 right = mid입니다." },
      { title: "종료", description: "left와 right가 같아지는 위치가 처음으로 조건을 만족하는 인덱스입니다." },
    ],
    python: `def lower_bound(values, target):
    left, right = 0, len(values)
    while left < right:
        mid = (left + right) // 2
        if values[mid] < target:
            left = mid + 1
        else:
            right = mid
    return left`,
    javascript: `function lowerBound(values, target) {
  let left = 0, right = values.length;
  while (left < right) {
    const mid = Math.floor((left + right) / 2);
    if (values[mid] < target) left = mid + 1;
    else right = mid;
  }
  return left;
}`,
    cpp: `#include <vector>

int lowerBound(const std::vector<int>& values, int target) {
  int left = 0;
  int right = static_cast<int>(values.size());
  while (left < right) {
    int mid = left + (right - left) / 2;
    if (values[mid] < target) left = mid + 1;
    else right = mid;
  }
  return left;
}`,
    visualizationLabel: "이분 탐색으로 참이 시작되는 경계를 좁히는 과정",
    frames: [
      { title: "첫 구간 [0, 6)", description: "mid = 3, values[3] = 7입니다. 7 이상이므로 3도 답 후보가 되어 right를 3으로 옮깁니다.", rows: [{ label: "index", cells: ["0", "1", "2", { value: "3 mid", state: "active" }, "4", "5"] }, { label: "value", cells: ["1", "3", "5", { value: "7", state: "candidate" }, "9", "11"] }] },
      { title: "왼쪽 절반 [0, 3)", description: "mid = 1, 값 3은 7보다 작습니다. 인덱스 0과 1은 답이 아니므로 left를 2로 옮깁니다.", rows: [{ label: "value", cells: [{ value: "1", state: "muted" }, { value: "3", state: "active" }, "5", "7", { value: "9", state: "muted" }, { value: "11", state: "muted" }] }, { label: "range", cells: [{ value: "left = 2", state: "candidate" }, { value: "right = 3", state: "candidate" }] }] },
      { title: "마지막 구간 [2, 3)", description: "mid = 2, 값 5도 작아 left가 3이 됩니다. left = right = 3이 정답입니다.", rows: [{ label: "value", cells: ["1", "3", { value: "5", state: "active" }, { value: "7", state: "success" }, "9", "11"] }, { label: "answer", cells: [{ value: "index 3", state: "success" }] }] },
    ],
  },
  "two-pointer": {
    title: "합이 7 이상인 가장 짧은 연속 구간",
    prompt: "양수 배열에서 합이 target 이상인 가장 짧은 연속 부분 배열의 길이를 구하세요.",
    input: "nums = [2, 3, 1, 2, 4, 3], target = 7",
    output: "2 — [4, 3]",
    inputContract: "nums의 모든 값과 target은 양수입니다. 답이 없으면 0을 반환합니다.",
    timeComplexity: "O(N)",
    spaceComplexity: "O(1)",
    keyIdea:
      "오른쪽 포인터로 합을 늘리고, 조건을 만족하는 동안 왼쪽 포인터를 당겨 가장 짧은 구간을 찾습니다. 모든 값이 양수라 포인터 이동 방향이 안전합니다.",
    reasoning: [
      { title: "오른쪽 확장", description: "합이 7보다 작으면 right를 한 칸 이동해 새 값을 더합니다." },
      { title: "왼쪽 축소", description: "합이 7 이상이면 현재 길이를 기록하고 left 값을 빼며 줄입니다." },
      { title: "최솟값 갱신", description: "조건을 만족할 때마다 현재 구간 길이와 지금까지의 최솟값을 비교합니다." },
    ],
    python: `def min_subarray_len(nums, target):
    left = total = 0
    answer = len(nums) + 1
    for right, value in enumerate(nums):
        total += value
        while total >= target:
            answer = min(answer, right - left + 1)
            total -= nums[left]
            left += 1
    return 0 if answer > len(nums) else answer`,
    javascript: `function minSubarrayLen(nums, target) {
  let left = 0, sum = 0, answer = Infinity;
  for (let right = 0; right < nums.length; right++) {
    sum += nums[right];
    while (sum >= target) {
      answer = Math.min(answer, right - left + 1);
      sum -= nums[left++];
    }
  }
  return answer === Infinity ? 0 : answer;
}`,
    cpp: `#include <algorithm>
#include <limits>
#include <vector>

int minSubarrayLen(const std::vector<int>& nums, int target) {
  int left = 0;
  int sum = 0;
  int answer = std::numeric_limits<int>::max();
  for (int right = 0; right < static_cast<int>(nums.size()); ++right) {
    sum += nums[right];
    while (sum >= target) {
      answer = std::min(answer, right - left + 1);
      sum -= nums[left++];
    }
  }
  return answer == std::numeric_limits<int>::max() ? 0 : answer;
}`,
    visualizationLabel: "슬라이딩 윈도우의 양쪽 경계가 이동하는 과정",
    frames: [
      { title: "합이 부족해 오른쪽을 늘립니다", description: "[2,3,1]의 합은 6이라 아직 target보다 작습니다.", rows: [{ label: "nums", cells: [{ value: "2 L", state: "candidate" }, { value: "3", state: "candidate" }, { value: "1 R", state: "active" }, "2", "4", "3"] }, { label: "sum", cells: [{ value: "6", state: "muted" }] }] },
      { title: "조건을 처음 만족합니다", description: "2를 더해 [2,3,1,2]의 합이 8이 되었습니다. 길이 4를 기록합니다.", rows: [{ label: "window", cells: [{ value: "2 L", state: "candidate" }, { value: "3", state: "candidate" }, { value: "1", state: "candidate" }, { value: "2 R", state: "active" }, "4", "3"] }, { label: "best", cells: [{ value: "4", state: "visited" }] }] },
      { title: "왼쪽을 줄이고 다시 확장합니다", description: "앞의 2를 빼면 합이 6이므로 멈추고, 오른쪽의 4를 더합니다. [3,1,2,4]의 합은 10입니다.", rows: [{ label: "window", cells: [{ value: "2", state: "muted" }, { value: "3 L", state: "candidate" }, "1", "2", { value: "4 R", state: "active" }, "3"] }, { label: "sum", cells: [{ value: "10", state: "candidate" }] }] },
      { title: "가능한 만큼 줄입니다", description: "3과 1을 차례로 빼도 [2,4]의 합은 6이 되어 직전 길이 3까지 갱신됩니다.", rows: [{ label: "window", cells: ["2", "3", "1", { value: "2 L", state: "candidate" }, { value: "4 R", state: "active" }, "3"] }, { label: "best", cells: [{ value: "3", state: "visited" }] }] },
      { title: "최단 구간을 찾았습니다", description: "마지막 3을 더한 뒤 왼쪽을 줄이면 [4,3]의 합이 7입니다. 길이 2가 최종 답입니다.", rows: [{ label: "window", cells: ["2", "3", "1", "2", { value: "4 L", state: "success" }, { value: "3 R", state: "success" }] }, { label: "best", cells: [{ value: "2", state: "success" }] }] },
    ],
  },
  "graph-search": {
    title: "격자에서 최단 거리 찾기",
    prompt: "0은 이동 가능, 1은 벽인 격자에서 S부터 G까지 상하좌우 최소 이동 횟수를 구하세요.",
    input: "grid = [[0,0,1],[1,0,0],[0,0,0]], start = (0,0), goal = (2,2)",
    output: "4",
    inputContract: "grid에서 0은 이동 가능, 1은 벽입니다. S와 G 표시는 시각화에만 사용하고 실제 위치는 start와 goal 좌표로 전달합니다.",
    timeComplexity: "O(행 × 열)",
    spaceComplexity: "O(행 × 열)",
    keyIdea:
      "모든 이동 비용이 1이므로 BFS를 사용합니다. 시작점에서 가까운 칸부터 큐로 처리하면 목표를 처음 방문한 거리가 곧 최단 거리입니다.",
    reasoning: [
      { title: "큐에 넣을 때 방문", description: "같은 칸이 중복으로 큐에 들어가지 않도록 발견 즉시 방문 표시합니다." },
      { title: "거리 전파", description: "이웃 칸의 거리는 현재 칸의 거리 + 1로 기록합니다." },
      { title: "목표 확인", description: "BFS는 거리 순서대로 처리하므로 G를 처음 큐에서 꺼낸 거리가 최단 거리입니다." },
    ],
    python: `from collections import deque

def shortest_path(grid, start, goal):
    queue = deque([(start[0], start[1], 0)])
    visited = {start}
    while queue:
        row, col, distance = queue.popleft()
        if (row, col) == goal:
            return distance
        for dr, dc in ((1, 0), (-1, 0), (0, 1), (0, -1)):
            nr, nc = row + dr, col + dc
            if 0 <= nr < len(grid) and 0 <= nc < len(grid[0]):
                if grid[nr][nc] == 0 and (nr, nc) not in visited:
                    visited.add((nr, nc))
                    queue.append((nr, nc, distance + 1))
    return -1`,
    javascript: `function shortestPath(grid, start, goal) {
  const queue = [[...start, 0]], visited = new Set([start.join(",")]);
  for (let head = 0; head < queue.length; head++) {
    const [row, col, distance] = queue[head];
    if (row === goal[0] && col === goal[1]) return distance;
    for (const [dr, dc] of [[1,0],[-1,0],[0,1],[0,-1]]) {
      const nr = row + dr, nc = col + dc, key = nr + "," + nc;
      if (grid[nr]?.[nc] === 0 && !visited.has(key)) {
        visited.add(key);
        queue.push([nr, nc, distance + 1]);
      }
    }
  }
  return -1;
}`,
    cpp: `#include <queue>
#include <tuple>
#include <utility>
#include <vector>

int shortestPath(const std::vector<std::vector<int>>& grid,
                 std::pair<int, int> start,
                 std::pair<int, int> goal) {
  const int rows = static_cast<int>(grid.size());
  const int cols = static_cast<int>(grid[0].size());
  const int directions[4][2] = {{1, 0}, {-1, 0}, {0, 1}, {0, -1}};
  std::vector<std::vector<bool>> visited(rows, std::vector<bool>(cols));
  std::queue<std::tuple<int, int, int>> queue;
  queue.push({start.first, start.second, 0});
  visited[start.first][start.second] = true;

  while (!queue.empty()) {
    auto [row, col, distance] = queue.front();
    queue.pop();
    if (std::pair{row, col} == goal) return distance;
    for (const auto& direction : directions) {
      int nextRow = row + direction[0];
      int nextCol = col + direction[1];
      if (0 <= nextRow && nextRow < rows && 0 <= nextCol && nextCol < cols &&
          grid[nextRow][nextCol] == 0 && !visited[nextRow][nextCol]) {
        visited[nextRow][nextCol] = true;
        queue.push({nextRow, nextCol, distance + 1});
      }
    }
  }
  return -1;
}`,
    visualizationLabel: "BFS가 격자의 가까운 칸부터 방문하는 과정",
    frames: [
      { title: "거리 0: 시작점", description: "S를 방문 표시하고 큐에 넣습니다.", rows: [{ label: "0", cells: [{ value: "S·0", state: "active" }, "·", { value: "■", state: "blocked" }] }, { label: "1", cells: [{ value: "■", state: "blocked" }, "·", "·"] }, { label: "2", cells: ["·", "·", "G"] }, { label: "queue", cells: [{ value: "S", state: "active" }] }] },
      { title: "거리 1: 오른쪽 칸", description: "S의 유일한 이동 가능 이웃을 발견하고 거리 1로 큐에 넣습니다.", rows: [{ label: "0", cells: [{ value: "S·0", state: "visited" }, { value: "·1", state: "active" }, { value: "■", state: "blocked" }] }, { label: "1", cells: [{ value: "■", state: "blocked" }, "·", "·"] }, { label: "2", cells: ["·", "·", "G"] }] },
      { title: "거리 2와 3으로 확장", description: "아래로 내려간 뒤 오른쪽과 아래 칸을 같은 거리 순서로 방문합니다.", rows: [{ label: "0", cells: [{ value: "S·0", state: "visited" }, { value: "·1", state: "visited" }, { value: "■", state: "blocked" }] }, { label: "1", cells: [{ value: "■", state: "blocked" }, { value: "·2", state: "visited" }, { value: "·3", state: "candidate" }] }, { label: "2", cells: ["·", { value: "·3", state: "active" }, "G"] }] },
      { title: "거리 4: 목표 확인", description: "거리 3인 칸에서 G를 큐에 넣고, 거리 4의 G를 꺼내면 최단 거리가 확정됩니다.", rows: [{ label: "0", cells: ["S·0", "·1", { value: "■", state: "blocked" }] }, { label: "1", cells: [{ value: "■", state: "blocked" }, "·2", "·3"] }, { label: "2", cells: ["·", { value: "·3", state: "visited" }, { value: "G·4", state: "success" }] }] },
    ],
  },
  "dynamic-programming": {
    title: "계단 오르기",
    prompt: "한 번에 1칸 또는 2칸을 오를 수 있을 때 n번째 계단에 도달하는 방법의 수를 구하세요.",
    input: "n = 5",
    output: "8",
    inputContract: "n은 0 이상의 정수입니다. n = 0은 아무것도 하지 않는 한 가지 방법으로 셉니다.",
    timeComplexity: "O(N)",
    spaceComplexity: "O(N), 직전 두 값만 저장하면 O(1)로 축소 가능",
    keyIdea:
      "n번째 계단의 마지막 이동은 n-1에서 1칸 오거나 n-2에서 2칸 오르는 두 경우뿐입니다. 따라서 dp[n] = dp[n-1] + dp[n-2]입니다.",
    reasoning: [
      { title: "상태 정의", description: "dp[i]를 i번째 계단에 도달하는 방법의 수로 정합니다." },
      { title: "초깃값", description: "0번째에는 아무것도 하지 않는 1가지, 1번째에는 1칸 오르는 1가지가 있습니다." },
      { title: "작은 답 재사용", description: "2부터 n까지 앞의 두 값을 더해 한 번씩만 계산합니다." },
    ],
    python: `def climb_stairs(n):
    if n <= 1:
        return 1
    dp = [0] * (n + 1)
    dp[0] = dp[1] = 1
    for stair in range(2, n + 1):
        dp[stair] = dp[stair - 1] + dp[stair - 2]
    return dp[n]`,
    javascript: `function climbStairs(n) {
  if (n <= 1) return 1;
  const dp = Array(n + 1).fill(0);
  dp[0] = dp[1] = 1;
  for (let stair = 2; stair <= n; stair++) {
    dp[stair] = dp[stair - 1] + dp[stair - 2];
  }
  return dp[n];
}`,
    cpp: `#include <vector>

long long climbStairs(int n) {
  if (n <= 1) return 1;
  std::vector<long long> dp(n + 1);
  dp[0] = dp[1] = 1;
  for (int stair = 2; stair <= n; ++stair) {
    dp[stair] = dp[stair - 1] + dp[stair - 2];
  }
  return dp[n];
}`,
    visualizationLabel: "앞의 두 계단 값을 더해 DP 표를 채우는 과정",
    frames: [
      { title: "기준이 되는 두 값을 정합니다", description: "dp[0] = 1, dp[1] = 1로 시작합니다.", rows: [{ label: "stair", cells: ["0", "1", "2", "3", "4", "5"] }, { label: "dp", cells: [{ value: "1", state: "visited" }, { value: "1", state: "visited" }, "?", "?", "?", "?"] }] },
      { title: "dp[2]와 dp[3] 계산", description: "dp[2] = 1 + 1 = 2, dp[3] = 2 + 1 = 3입니다.", rows: [{ label: "stair", cells: ["0", "1", "2", "3", "4", "5"] }, { label: "dp", cells: ["1", "1", { value: "2", state: "visited" }, { value: "3", state: "active" }, "?", "?"] }] },
      { title: "dp[4] 계산", description: "4번째 계단은 3번째의 3가지와 2번째의 2가지를 합쳐 5가지입니다.", rows: [{ label: "dp", cells: ["1", "1", { value: "2", state: "candidate" }, { value: "3", state: "candidate" }, { value: "5", state: "active" }, "?"] }] },
      { title: "dp[5]가 정답", description: "dp[5] = dp[4] + dp[3] = 5 + 3 = 8입니다.", rows: [{ label: "dp", cells: ["1", "1", "2", { value: "3", state: "candidate" }, { value: "5", state: "candidate" }, { value: "8", state: "success" }] }] },
    ],
  },
  "shortest-path": {
    title: "가중치 그래프의 최단 거리",
    prompt: "S에서 모든 노드까지의 최소 비용을 구하세요. 간선은 S-A 4, S-B 1, B-A 2, A-C 1, B-C 5입니다.",
    input: "start = S",
    output: "S=0, B=1, A=3, C=4",
    inputContract: "모든 가중치는 0 이상이고 모든 노드는 빈 인접 목록이라도 graph의 키로 존재합니다. graph는 방향 그래프 인접 리스트입니다.",
    timeComplexity: "인접 리스트 + 이진 최소 힙 기준 O((V + E) log V)",
    spaceComplexity: "dist와 힙 O(V + E), 입력 그래프 O(V + E)",
    keyIdea:
      "다익스트라는 현재까지 거리가 가장 짧은 노드를 확정하고, 그 노드를 거쳐 이웃으로 가는 비용이 더 작으면 갱신합니다.",
    reasoning: [
      { title: "거리 초기화", description: "시작점은 0, 나머지는 무한대로 두고 (0,S)를 우선순위 큐에 넣습니다." },
      { title: "최소 후보 확정", description: "큐에서 거리가 가장 작은 노드를 꺼내 이웃 간선을 완화합니다." },
      { title: "낡은 항목 건너뛰기", description: "큐에서 꺼낸 비용이 최신 dist보다 크다면 이미 더 좋은 경로가 있으므로 무시합니다." },
    ],
    python: `import heapq

def dijkstra(graph, start):
    dist = {node: float("inf") for node in graph}
    dist[start] = 0
    heap = [(0, start)]
    while heap:
        cost, node = heapq.heappop(heap)
        if cost != dist[node]:
            continue
        for next_node, weight in graph[node]:
            next_cost = cost + weight
            if next_cost < dist[next_node]:
                dist[next_node] = next_cost
                heapq.heappush(heap, (next_cost, next_node))
    return dist`,
    javascript: `function dijkstra(graph, start, heap) {
  const dist = Object.fromEntries(Object.keys(graph).map(node => [node, Infinity]));
  dist[start] = 0;
  heap.push([0, start]);
  while (!heap.isEmpty()) {
    const [cost, node] = heap.popMin();
    if (cost !== dist[node]) continue;
    for (const [next, weight] of graph[node]) {
      const nextCost = cost + weight;
      if (nextCost < dist[next]) {
        dist[next] = nextCost;
        heap.push([nextCost, next]);
      }
    }
  }
  return dist;
}`,
    cpp: `#include <functional>
#include <limits>
#include <queue>
#include <unordered_map>
#include <utility>
#include <vector>

using Graph = std::unordered_map<char, std::vector<std::pair<char, int>>>;

std::unordered_map<char, int> dijkstra(const Graph& graph, char start) {
  const int infinity = std::numeric_limits<int>::max();
  std::unordered_map<char, int> dist;
  for (const auto& [node, edges] : graph) dist[node] = infinity;
  dist[start] = 0;

  using State = std::pair<int, char>;
  std::priority_queue<State, std::vector<State>, std::greater<State>> heap;
  heap.push({0, start});
  while (!heap.empty()) {
    auto [cost, node] = heap.top();
    heap.pop();
    if (cost != dist[node]) continue;
    for (const auto& [next, weight] : graph.at(node)) {
      int nextCost = cost + weight;
      if (nextCost < dist[next]) {
        dist[next] = nextCost;
        heap.push({nextCost, next});
      }
    }
  }
  return dist;
}`,
    visualizationLabel: "다익스트라가 최소 거리 노드를 확정하고 간선을 완화하는 과정",
    frames: [
      { title: "S에서 시작", description: "S를 비용 0으로 확정하고 직접 연결된 A=4, B=1을 후보로 넣습니다.", rows: [{ label: "dist", cells: [{ value: "S 0", state: "success" }, { value: "A 4", state: "candidate" }, { value: "B 1", state: "candidate" }, "C ∞"] }, { label: "queue", cells: [{ value: "B 1", state: "active" }, "A 4"] }] },
      { title: "가장 가까운 B 확정", description: "B까지 1입니다. B→A를 거치면 1+2=3으로 기존 4보다 짧아 A를 3으로 갱신합니다. C도 6이 됩니다.", rows: [{ label: "dist", cells: ["S 0", { value: "A 3", state: "candidate" }, { value: "B 1", state: "success" }, { value: "C 6", state: "candidate" }] }, { label: "queue", cells: [{ value: "A 3", state: "active" }, "A 4(낡음)", "C 6"] }] },
      { title: "A를 거쳐 C 갱신", description: "A를 비용 3으로 확정합니다. A→C를 거치면 3+1=4로 기존 6보다 짧습니다.", rows: [{ label: "dist", cells: ["S 0", { value: "A 3", state: "success" }, "B 1", { value: "C 4", state: "candidate" }] }, { label: "queue", cells: [{ value: "C 4", state: "active" }, "C 6(낡음)"] }] },
      { title: "모든 최단 거리 확정", description: "C를 비용 4로 확정합니다. 큐의 낡은 A=4와 C=6은 최신 거리와 달라 건너뜁니다.", rows: [{ label: "dist", cells: [{ value: "S 0", state: "success" }, { value: "A 3", state: "success" }, { value: "B 1", state: "success" }, { value: "C 4", state: "success" }] }] },
    ],
  },
  "union-find-mst": {
    title: "모든 도시를 최소 비용으로 연결",
    prompt: "A, B, C, D를 잇는 간선 중 전체를 연결하면서 비용 합이 최소인 간선을 고르세요.",
    input: "AB=1, BC=2, AC=3, CD=4, BD=5",
    output: "AB, BC, CD — 총비용 7",
    inputContract: "가중치가 있는 무방향 연결 그래프입니다. 연결되지 않은 입력에는 MST가 존재하지 않습니다.",
    timeComplexity: "O(E log E)",
    spaceComplexity: "O(V + E) — parent·size와 정렬된 간선·결과 포함",
    keyIdea:
      "크루스칼 알고리즘은 간선을 비용순으로 보고, 서로 다른 집합을 잇는 간선만 선택합니다. 유니온 파인드로 두 노드가 이미 연결됐는지 빠르게 검사합니다.",
    reasoning: [
      { title: "간선 정렬", description: "AB, BC, AC, CD, BD 순서로 비용이 작은 간선부터 봅니다." },
      { title: "사이클 방지", description: "find(u)와 find(v)가 같으면 이미 이어져 있으므로 그 간선은 제외합니다." },
      { title: "완성 조건", description: "노드가 4개면 간선 3개를 선택하는 순간 최소 신장 트리가 완성됩니다." },
    ],
    python: `def kruskal(nodes, edges):
    parent = {node: node for node in nodes}
    size = {node: 1 for node in nodes}
    def find(x):
        if parent[x] != x:
            parent[x] = find(parent[x])
        return parent[x]
    chosen, cost = [], 0
    for weight, a, b in sorted(edges):
        root_a, root_b = find(a), find(b)
        if root_a != root_b:
            if size[root_a] < size[root_b]:
                root_a, root_b = root_b, root_a
            parent[root_b] = root_a
            size[root_a] += size[root_b]
            chosen.append((a, b))
            cost += weight
            if len(chosen) == len(nodes) - 1:
                break
    if len(chosen) != len(nodes) - 1:
        raise ValueError("graph is disconnected")
    return chosen, cost`,
    javascript: `function kruskal(nodes, edges) {
  const parent = Object.fromEntries(nodes.map(node => [node, node]));
  const size = Object.fromEntries(nodes.map(node => [node, 1]));
  const find = x => parent[x] === x ? x : (parent[x] = find(parent[x]));
  const chosen = [];
  let cost = 0;
  edges.sort((a, b) => a[0] - b[0]);
  for (const [weight, a, b] of edges) {
    const rootA = find(a), rootB = find(b);
    if (rootA !== rootB) {
      let large = rootA, small = rootB;
      if (size[large] < size[small]) [large, small] = [small, large];
      parent[small] = large;
      size[large] += size[small];
      chosen.push([a, b]);
      cost += weight;
      if (chosen.length === nodes.length - 1) break;
    }
  }
  if (chosen.length !== nodes.length - 1) throw new Error("graph is disconnected");
  return { chosen, cost };
}`,
    cpp: `#include <algorithm>
#include <stdexcept>
#include <tuple>
#include <unordered_map>
#include <utility>
#include <vector>

std::pair<std::vector<std::pair<char, char>>, int> kruskal(
    const std::vector<char>& nodes,
    std::vector<std::tuple<int, char, char>> edges) {
  if (nodes.empty()) return {{}, 0};
  std::unordered_map<char, char> parent;
  std::unordered_map<char, int> size;
  for (char node : nodes) {
    parent[node] = node;
    size[node] = 1;
  }
  auto find = [&](auto&& self, char node) -> char {
    if (parent[node] != node) parent[node] = self(self, parent[node]);
    return parent[node];
  };

  std::sort(edges.begin(), edges.end());
  std::vector<std::pair<char, char>> chosen;
  int cost = 0;
  for (const auto& [weight, a, b] : edges) {
    char rootA = find(find, a);
    char rootB = find(find, b);
    if (rootA == rootB) continue;
    if (size[rootA] < size[rootB]) std::swap(rootA, rootB);
    parent[rootB] = rootA;
    size[rootA] += size[rootB];
    chosen.push_back({a, b});
    cost += weight;
    if (chosen.size() == nodes.size() - 1) break;
  }
  if (chosen.size() != nodes.size() - 1) {
    throw std::invalid_argument("graph is disconnected");
  }
  return {chosen, cost};
}`,
    visualizationLabel: "크루스칼 알고리즘이 간선을 선택하고 집합을 합치는 과정",
    frames: [
      { title: "처음에는 모두 다른 집합", description: "각 노드의 대표는 자기 자신입니다. 가장 싼 AB=1을 선택해 A와 B를 합칩니다.", rows: [{ label: "간선", cells: [{ value: "AB 1", state: "active" }, "BC 2", "AC 3", "CD 4", "BD 5"] }, { label: "집합", cells: [{ value: "{A,B}", state: "success" }, "{C}", "{D}"] }, { label: "cost", cells: [{ value: "1", state: "visited" }] }] },
      { title: "BC=2 선택", description: "B와 C는 다른 집합이므로 간선을 선택하고 {A,B,C}로 합칩니다.", rows: [{ label: "간선", cells: ["AB 1", { value: "BC 2", state: "active" }, "AC 3", "CD 4", "BD 5"] }, { label: "집합", cells: [{ value: "{A,B,C}", state: "success" }, "{D}"] }, { label: "cost", cells: [{ value: "3", state: "visited" }] }] },
      { title: "AC=3 제외", description: "A와 C의 대표가 이미 같습니다. AC를 추가하면 사이클이 생기므로 제외합니다.", rows: [{ label: "간선", cells: ["AB 1", "BC 2", { value: "AC 3", state: "blocked" }, "CD 4", "BD 5"] }, { label: "선택", cells: ["AB", "BC"] }] },
      { title: "CD=4 선택해 완성", description: "C와 D는 다른 집합이므로 선택합니다. 간선 3개로 모든 노드가 연결되고 총비용은 7입니다.", rows: [{ label: "간선", cells: [{ value: "AB 1", state: "success" }, { value: "BC 2", state: "success" }, { value: "AC 3", state: "blocked" }, { value: "CD 4", state: "success" }, "BD 5"] }, { label: "집합", cells: [{ value: "{A,B,C,D}", state: "success" }] }, { label: "cost", cells: [{ value: "7", state: "success" }] }] },
    ],
  },
};
