# 우선순위
- PairDrop은 매우 단순하고, 깔끔하고, 사용하기 쉬워야 합니다.
- 핵심 사용자 흐름은 절대 방해받아서는 안 됩니다!
- 새로운 기능은 병합하기 전에 철저히 테스트해야 합니다.
- 안정성이 언제나 가장 우선입니다!

# 방향성
PairDrop은 극단적인 단순함에 대한 탐구입니다. 사용자 인터페이스는 놀라울 만큼 단순합니다. 모든 기능은 다른 기능과 서로 간섭할 가능성이 있어 복잡도가 제곱으로 늘어나기 때문에, 기능은 매우 신중하게 선택합니다. 우리는 즉각적인 파일 전송이라는 단 하나의 사용 사례에 집중합니다.
일부 엣지 케이스에 맞춰 최적화하지 않습니다. 평균적인 사용자의 사용 흐름을 최적화합니다. 단순함을 위해 기능 요청을 거절하더라도 너무 서운해하지 말아 주세요.

단순함에 대해 더 알고 싶다면 [Insanely Simple: The Obsession that Drives Apple's Success](https://www.amazon.com/Insanely-Simple-Ken-Segall-audiobook/dp/B007Z9686O)나 [Thinking, Fast and Slow](https://www.amazon.com/Thinking-Fast-Slow-Daniel-Kahneman/dp/0374533555)를 읽어 보세요.

# 기여 가이드라인
[이슈](https://github.com/schlagmichdoch/pairdrop/issues/new/choose)나 [풀 리퀘스트](https://github.com/schlagmichdoch/pairdrop/pulls)를 열기 전에 다음 가이드라인을 지켜 주세요.

- 이슈나 풀 리퀘스트를 열기 전에, 같은 이슈나 풀 리퀘스트가 이미 있는지 확인해 주세요.
- 패키지 업데이트를 위한 풀 리퀘스트는 허용하지 않습니다. [Dependabot](https://github.com/schlagmichdoch/pairdrop/blob/master/.github/dependabot.yml)이 자동으로 확인하기 때문입니다.
- 어떻게 기여해야 할지 모르겠거나 JavaScript나 Node.js를 모르더라도, 새 이슈(기능 요청)로 멋진 아이디어를 공유하거나 프로젝트 전반의 오탈자를 확인해 주실 수 있습니다.
