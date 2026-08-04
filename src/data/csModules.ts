export interface CSConcept {
  id: string;
  title: string;
  subtitle: string;
  core: string;
  aiWhy: string;
  questions: string[];
  practice: string;
  checkpoint: string;
}

export interface CSModule {
  id: string;
  number: string;
  title: string;
  description: string;
  outcome: string;
  accent: string;
  concepts: CSConcept[];
}

export const csModules: CSModule[] = [
  {
    id: "computation",
    number: "01",
    title: "컴퓨터는 어떻게 일하는가",
    description: "코드가 데이터로 표현되고 CPU에서 실행되는 과정을 이해합니다.",
    outcome: "성능 문제를 감이 아닌 비용으로 설명할 수 있다",
    accent: "coral",
    concepts: [
      {
        id: "data-representation",
        title: "데이터 표현",
        subtitle: "비트 · 정수 · 문자 · 부동소수점",
        core: "컴퓨터의 모든 값은 유한한 비트 패턴입니다. 표현 범위와 정밀도에 한계가 있다는 사실이 오버플로, 인코딩 오류, 0.1 + 0.2 문제의 출발점입니다.",
        aiWhy: "모델의 FP32·FP16·INT8 양자화가 정확도와 메모리, 속도를 어떻게 바꾸는지 이해하는 토대입니다.",
        questions: ["signed 정수는 음수를 어떻게 표현할까?", "UTF-8에서 한 글자의 크기가 다른 이유는?", "부동소수점 비교에 오차 허용값이 필요한 이유는?"],
        practice: "브라우저 콘솔에서 Number.MAX_SAFE_INTEGER와 0.1 + 0.2를 확인하고 결과를 설명해보세요.",
        checkpoint: "같은 숫자도 자료형에 따라 결과가 달라지는 이유를 말할 수 있다.",
      },
      {
        id: "cpu-memory",
        title: "CPU와 메모리",
        subtitle: "명령어 · 레지스터 · 캐시 · RAM",
        core: "CPU는 명령어를 가져와 해석하고 실행합니다. 데이터가 레지스터, 캐시, RAM, 디스크 중 어디에 있느냐에 따라 접근 비용은 크게 달라집니다.",
        aiWhy: "GPU가 병렬 계산에 강한 이유와 모델 로딩·추론에서 메모리가 병목이 되는 이유를 판단할 수 있습니다.",
        questions: ["CPU 캐시는 왜 필요한가?", "연속된 배열 순회가 임의 접근보다 빠른 이유는?", "CPU와 GPU의 강점은 어떻게 다른가?"],
        practice: "큰 배열을 순차 접근할 때와 무작위 접근할 때의 실행 시간을 측정해보세요.",
        checkpoint: "프로그램이 느릴 때 연산과 메모리 중 병목 후보를 구분할 수 있다.",
      },
      {
        id: "complexity",
        title: "복잡도와 확장성",
        subtitle: "시간 · 공간 · 상수 비용",
        core: "복잡도는 입력 크기가 커질 때 자원 사용량이 어떻게 증가하는지 설명하는 언어입니다. Big-O와 실제 상수 비용을 함께 봐야 합니다.",
        aiWhy: "AI가 제안한 코드가 작은 예제만 통과하는지, 실제 트래픽과 데이터 크기에서도 버틸지 검증하는 최소 기준입니다.",
        questions: ["O(n log n)과 O(n²)의 차이는 언제 체감될까?", "시간을 줄이기 위해 공간을 쓰는 사례는?", "Big-O가 같아도 속도가 다른 이유는?"],
        practice: "중복 탐색 코드를 Set을 쓰는 방식으로 바꾸고 입력 크기별 시간을 비교해보세요.",
        checkpoint: "코드의 주요 연산 횟수와 메모리 사용량을 대략 추정할 수 있다.",
      },
    ],
  },
  {
    id: "operating-system",
    number: "02",
    title: "운영체제와 동시성",
    description: "여러 프로그램이 한정된 자원을 안전하게 나눠 쓰는 원리를 배웁니다.",
    outcome: "멈춤·충돌·메모리 문제의 원인을 좁힐 수 있다",
    accent: "lime",
    concepts: [
      {
        id: "process-thread",
        title: "프로세스와 스레드",
        subtitle: "격리 · 공유 · 문맥 교환",
        core: "프로세스는 독립된 주소 공간을 가지며, 스레드는 한 프로세스의 메모리를 공유합니다. 격리는 안전성을, 공유는 효율을 주지만 동기화 비용을 만듭니다.",
        aiWhy: "AI 서버의 worker 수, 병렬 요청 처리, Python 멀티프로세싱 선택을 이해하는 데 직접 연결됩니다.",
        questions: ["프로세스와 스레드는 무엇을 공유할까?", "문맥 교환에는 왜 비용이 드는가?", "동시성과 병렬성은 어떻게 다른가?"],
        practice: "작업 관리자에서 브라우저의 프로세스·스레드 수와 메모리 사용량을 관찰해보세요.",
        checkpoint: "CPU 작업과 I/O 작업에 맞는 실행 방식을 고를 수 있다.",
      },
      {
        id: "synchronization",
        title: "동기화와 교착상태",
        subtitle: "race condition · lock · atomic",
        core: "공유 상태를 동시에 바꾸면 실행 순서에 따라 결과가 달라집니다. 잠금은 이를 막지만 잘못 사용하면 대기와 교착상태를 일으킵니다.",
        aiWhy: "에이전트 여러 개가 같은 파일이나 DB 행을 수정할 때 생기는 덮어쓰기와 중복 실행을 예방할 수 있습니다.",
        questions: ["race condition은 왜 재현하기 어려운가?", "임계 구역은 무엇인가?", "교착상태의 네 조건은 무엇인가?"],
        practice: "공유 카운터를 여러 작업이 갱신하는 작은 예제를 만들고 잠금 전후 결과를 비교하세요.",
        checkpoint: "공유 상태를 발견하고 동기화가 필요한 구간을 표시할 수 있다.",
      },
      {
        id: "memory-io",
        title: "가상 메모리와 I/O",
        subtitle: "stack · heap · page · buffer",
        core: "가상 메모리는 각 프로세스에 독립된 주소 공간을 제공하고, 운영체제는 페이지 단위로 실제 메모리를 관리합니다. I/O는 버퍼와 캐시를 통해 느린 장치의 비용을 숨깁니다.",
        aiWhy: "OOM, 메모리 누수, 대용량 파일 스트리밍, 모델 적재 실패를 진단하는 공통 언어가 됩니다.",
        questions: ["stack과 heap의 수명은 어떻게 다른가?", "페이지 폴트는 언제 발생하는가?", "파일 전체 읽기와 스트리밍의 차이는?"],
        practice: "큰 파일을 한 번에 읽는 코드와 줄 단위 스트리밍 코드의 메모리를 비교하세요.",
        checkpoint: "OOM이 데이터 크기, 객체 수명, 누수 중 어디서 왔는지 가설을 세울 수 있다.",
      },
    ],
  },
  {
    id: "network",
    number: "03",
    title: "네트워크와 웹",
    description: "브라우저의 한 요청이 이름을 찾고 안전하게 응답을 받는 여정을 따라갑니다.",
    outcome: "느림·연결 실패·API 오류를 계층별로 진단할 수 있다",
    accent: "blue",
    concepts: [
      {
        id: "network-stack",
        title: "네트워크 계층",
        subtitle: "IP · TCP/UDP · port",
        core: "IP는 목적지까지 패킷을 전달하고, TCP는 순서와 재전송으로 신뢰성을 더합니다. 포트는 한 호스트 안에서 요청이 도착할 프로그램을 구분합니다.",
        aiWhy: "모델 API 타임아웃, 스트리밍 끊김, 방화벽 문제를 애플리케이션 코드와 분리해 볼 수 있습니다.",
        questions: ["IP와 포트의 역할은 어떻게 다른가?", "TCP 연결에는 왜 왕복 시간이 필요한가?", "UDP가 유리한 상황은?"],
        practice: "ping, tracert, netstat으로 목적지까지의 경로와 열린 연결을 관찰해보세요.",
        checkpoint: "연결 실패를 DNS·TCP·애플리케이션 문제로 나눠 질문할 수 있다.",
      },
      {
        id: "web-request",
        title: "웹 요청의 생애",
        subtitle: "DNS · TLS · HTTP · status",
        core: "URL 입력 뒤에는 DNS 조회, TCP 연결, TLS 협상, HTTP 요청과 응답이 이어집니다. 상태 코드와 헤더는 이 과정의 계약입니다.",
        aiWhy: "LLM API의 인증, rate limit, SSE 스트리밍, 캐시 헤더를 정확히 다룰 수 있습니다.",
        questions: ["HTTPS는 무엇을 보호하는가?", "GET과 POST의 의미 차이는?", "4xx와 5xx는 누구의 문제인가?"],
        practice: "브라우저 개발자 도구 Network 탭에서 한 요청의 timing과 헤더를 해석하세요.",
        checkpoint: "URL 입력부터 화면 렌더링 전까지의 네트워크 단계를 순서대로 설명할 수 있다.",
      },
      {
        id: "distributed-failure",
        title: "분산 시스템의 실패",
        subtitle: "timeout · retry · idempotency",
        core: "네트워크 너머의 작업은 성공, 실패뿐 아니라 결과를 모르는 상태가 존재합니다. 타임아웃·재시도·멱등성은 이 불확실성을 다루는 기본 도구입니다.",
        aiWhy: "길고 비싼 AI 요청의 중복 결제, 중복 작업, 부분 실패를 안전하게 처리하려면 반드시 필요합니다.",
        questions: ["타임아웃이 없으면 어떤 일이 생기는가?", "재시도가 장애를 키울 수 있는 이유는?", "멱등성 키는 무엇을 막는가?"],
        practice: "실패 확률이 있는 가짜 API에 지수 백오프와 최대 재시도 횟수를 적용해보세요.",
        checkpoint: "외부 API 호출에 timeout, retry, 중복 방지 정책을 설계할 수 있다.",
      },
    ],
  },
  {
    id: "data",
    number: "04",
    title: "데이터베이스와 저장",
    description: "데이터를 오래, 빠르게, 일관되게 보관하는 선택 기준을 익힙니다.",
    outcome: "쿼리와 데이터 모델의 비용·일관성을 설명할 수 있다",
    accent: "coral",
    concepts: [
      {
        id: "data-model",
        title: "데이터 모델과 SQL",
        subtitle: "table · key · join · normalization",
        core: "관계형 모델은 데이터를 테이블과 키로 표현하고 SQL로 원하는 집합을 선언합니다. 정규화는 중복과 갱신 오류를 줄이는 설계 원칙입니다.",
        aiWhy: "자연어로 생성된 SQL이 정확한 join과 조건을 쓰는지, 데이터 누락이나 중복을 만들지 검토할 수 있습니다.",
        questions: ["기본 키와 외래 키는 무엇을 보장하는가?", "join은 어떤 행을 결합하는가?", "정규화와 조회 편의의 trade-off는?"],
        practice: "사용자·주문·상품 3개 테이블을 설계하고 최근 주문 목록 SQL을 작성하세요.",
        checkpoint: "작은 서비스의 핵심 엔터티와 관계를 테이블로 표현할 수 있다.",
      },
      {
        id: "index-query",
        title: "인덱스와 쿼리",
        subtitle: "B-tree · scan · query plan",
        core: "인덱스는 추가 저장 공간과 쓰기 비용을 지불해 검색 범위를 줄입니다. 쿼리 플랜은 DB가 실제로 어떤 접근 경로를 선택했는지 보여줍니다.",
        aiWhy: "벡터 인덱스를 포함해 ‘인덱스를 만들면 빨라진다’는 조언의 비용과 조건을 판단하게 해줍니다.",
        questions: ["모든 열에 인덱스를 만들면 왜 안 되는가?", "복합 인덱스에서 열 순서가 중요한 이유는?", "full scan이 항상 나쁜가?"],
        practice: "SQLite에서 EXPLAIN QUERY PLAN으로 인덱스 생성 전후를 비교하세요.",
        checkpoint: "느린 쿼리에서 탐색 행 수와 인덱스 사용 여부를 확인할 수 있다.",
      },
      {
        id: "transaction-cache",
        title: "트랜잭션과 캐시",
        subtitle: "ACID · isolation · invalidation",
        core: "트랜잭션은 여러 변경을 하나의 논리적 작업으로 묶습니다. 캐시는 읽기를 빠르게 하지만 원본과 복사본의 일관성이라는 새 문제를 만듭니다.",
        aiWhy: "대화 기록 저장, 사용량 차감, 응답 캐시가 동시에 얽힐 때 데이터가 틀어지지 않게 설계할 수 있습니다.",
        questions: ["원자성은 어떤 실패를 막는가?", "격리 수준이 낮으면 어떤 현상이 생기는가?", "캐시 무효화가 어려운 이유는?"],
        practice: "계좌 이체를 두 UPDATE와 한 트랜잭션으로 표현하고 중간 실패를 가정해보세요.",
        checkpoint: "함께 성공하거나 실패해야 하는 DB 변경을 찾아 트랜잭션 경계를 정할 수 있다.",
      },
    ],
  },
  {
    id: "software",
    number: "05",
    title: "소프트웨어 설계와 품질",
    description: "변경 가능한 코드를 만들고, 실패를 재현하고, 계약을 지키는 법을 익힙니다.",
    outcome: "AI가 만든 코드를 검증 가능한 작은 단위로 다룰 수 있다",
    accent: "lime",
    concepts: [
      {
        id: "abstraction-api",
        title: "추상화와 API",
        subtitle: "interface · coupling · cohesion",
        core: "좋은 추상화는 구현 세부를 숨기면서 사용자가 알아야 할 계약은 분명히 드러냅니다. 응집도를 높이고 결합도를 낮추면 변경 범위가 작아집니다.",
        aiWhy: "AI에게 모듈 단위로 명확한 계약을 주고, 생성된 구현을 교체하거나 검토하기 쉬워집니다.",
        questions: ["인터페이스는 무엇을 약속하는가?", "중복 제거가 항상 좋은가?", "변경 이유가 다른 코드는 왜 나눠야 하는가?"],
        practice: "외부 API 호출 코드를 인터페이스 뒤로 숨기고 가짜 구현으로 교체해보세요.",
        checkpoint: "한 모듈의 책임과 입력·출력·실패 계약을 한 문단으로 쓸 수 있다.",
      },
      {
        id: "testing-debugging",
        title: "테스트와 디버깅",
        subtitle: "invariant · boundary · hypothesis",
        core: "테스트는 예시를 확인하는 일을 넘어 항상 지켜야 할 불변식을 기록합니다. 디버깅은 관찰 → 가설 → 최소 재현 → 검증의 반복입니다.",
        aiWhy: "그럴듯하지만 틀릴 수 있는 생성 코드를 신뢰 대신 증거로 받아들이는 핵심 습관입니다.",
        questions: ["단위·통합·E2E 테스트의 경계는?", "좋은 실패 메시지는 무엇을 알려주는가?", "경계값 테스트가 중요한 이유는?"],
        practice: "AI가 만든 함수 하나를 골라 정상·경계·오류 입력 테스트를 각각 작성하세요.",
        checkpoint: "버그를 재현하는 가장 작은 입력과 실패하는 주장을 만들 수 있다.",
      },
      {
        id: "version-observability",
        title: "버전 관리와 관측성",
        subtitle: "git · log · metric · trace",
        core: "버전 관리는 변경의 의도와 복구 지점을 남깁니다. 로그·메트릭·트레이스는 실행 중인 시스템의 내부 상태를 외부에서 추론하게 합니다.",
        aiWhy: "AI가 넓은 범위를 수정해도 diff로 검토하고, 운영 중 결과가 나빠진 지점을 추적할 수 있습니다.",
        questions: ["좋은 커밋의 단위는?", "로그와 메트릭은 어떤 질문에 답하는가?", "상관관계 ID는 왜 필요한가?"],
        practice: "기능 하나를 작은 커밋으로 나누고 요청 ID가 포함된 구조화 로그를 남겨보세요.",
        checkpoint: "문제가 생긴 변경과 요청 흐름을 기록만으로 추적할 수 있다.",
      },
    ],
  },
  {
    id: "security-ai",
    number: "06",
    title: "보안과 AI 시스템",
    description: "신뢰 경계를 세우고 AI 기능을 하나의 확률적 시스템으로 운영합니다.",
    outcome: "AI 출력과 외부 입력을 검증하는 안전장치를 설계할 수 있다",
    accent: "blue",
    concepts: [
      {
        id: "security-basics",
        title: "보안 기본 원칙",
        subtitle: "authn · authz · least privilege",
        core: "인증은 누구인지, 인가는 무엇을 할 수 있는지 확인합니다. 최소 권한과 심층 방어는 한 겹이 뚫려도 피해 범위를 제한합니다.",
        aiWhy: "에이전트에 파일·DB·배포 권한을 줄 때 편의보다 권한 경계와 감사 가능성을 먼저 설계하게 합니다.",
        questions: ["인증과 인가는 왜 분리해야 하는가?", "비밀값을 코드에 넣으면 안 되는 이유는?", "입력 검증은 어느 경계에서 해야 하는가?"],
        practice: "작은 API의 사용자 역할별 권한표를 만들고 거부되어야 할 요청을 적어보세요.",
        checkpoint: "사용자 입력, AI 출력, 외부 API를 모두 신뢰하지 않는 데이터로 표시할 수 있다.",
      },
      {
        id: "ai-pipeline",
        title: "AI 애플리케이션 구조",
        subtitle: "token · embedding · RAG · tool",
        core: "AI 앱은 모델 하나가 아니라 입력 정제, 검색, 프롬프트, 추론, 도구 실행, 출력 검증이 이어지는 파이프라인입니다. 각 단계는 서로 다른 실패 방식을 가집니다.",
        aiWhy: "모델 탓으로 뭉뚱그리지 않고 검색 품질, 컨텍스트, 도구, 후처리 중 실제 원인을 분리할 수 있습니다.",
        questions: ["토큰 제한은 입력 설계에 어떤 영향을 주는가?", "임베딩 검색은 키워드 검색과 어떻게 다른가?", "도구 실행 결과는 왜 다시 검증해야 하는가?"],
        practice: "질문 → 검색 → 프롬프트 → 모델 → 검증의 흐름도를 그리고 단계별 실패를 하나씩 적으세요.",
        checkpoint: "AI 기능을 결정적 코드와 확률적 모델 단계로 분해할 수 있다.",
      },
      {
        id: "ai-evaluation",
        title: "평가와 안전한 운영",
        subtitle: "eval · guardrail · cost · latency",
        core: "확률적 출력은 단일 정답 테스트만으로 평가하기 어렵습니다. 대표 데이터셋, 품질 기준, 비용·지연, 실패 사례를 함께 측정하고 사람의 확인이 필요한 경계를 정해야 합니다.",
        aiWhy: "데모가 잘 되는지보다 실제 사용자에게 일관되고 안전한 가치를 주는지 판단하는 기준입니다.",
        questions: ["오프라인 평가와 온라인 지표는 어떻게 다른가?", "정확도 외에 무엇을 측정해야 하는가?", "사람의 승인이 필요한 작업은 무엇인가?"],
        practice: "실제 질문 20개와 기대 기준을 만들고 모델 변경 전후의 품질·비용·지연을 비교하세요.",
        checkpoint: "AI 기능의 성공·실패 기준과 롤백 조건을 숫자로 정의할 수 있다.",
      },
    ],
  },
];

export const conceptCount = csModules.reduce(
  (total, module) => total + module.concepts.length,
  0,
);
