# 자주 묻는 질문

<details>
<summary style="font-size:1.25em;margin-top: 24px; margin-bottom: 16px; font-weight: var(--base-text-weight-semibold, 600); line-height: 1.25;">
    도와주세요! PWA를 설치할 수 없습니다!
</summary>

<br>

다음은 여러 플랫폼에서 PWA를 설치하는 방법을 안내하는 좋은 가이드입니다. \
https://www.cdc.gov/niosh/mining/tools/installpwa.html


**데스크톱의 Chromium 기반 브라우저 (Chrome, Edge, Vivaldi, Brave 등)** \
[pairdrop.net](https://pairdrop.net)에서 오른쪽 상단의 설치 버튼을 클릭하면 PairDrop PWA를 데스크톱에 간단히 설치할 수 있습니다.

<img width="400" src="pwa-install.png" alt="Edge로 PWA를 설치하는 방법 예시">

**데스크톱 Firefox** \
Firefox에서는 [이 브라우저 확장 프로그램](https://addons.mozilla.org/de/firefox/addon/pwas-for-firefox/)을 통해 PWA를 설치할 수 있습니다.

**Android** \
PWA는 Google Chrome 또는 Samsung Browser에서만 설치할 수 있습니다.
1. [pairdrop.net](https://pairdrop.net)에 접속합니다.
2. 설치 팝업에서 _설치_를 클릭하거나, 점 세 개 메뉴에서 _홈 화면에 추가_를 클릭합니다.
3. 팝업에서 _추가_를 클릭합니다.

**iOS** \
PWA는 Safari에서만 설치할 수 있습니다.
1. [pairdrop.net](https://pairdrop.net)에 접속합니다.
2. 공유 아이콘을 누릅니다.
3. _홈 화면에 추가_를 누릅니다.
4. 오른쪽 상단의 _추가_를 누릅니다.

<br>

**자체 호스팅 인스턴스인가요?** \
자체 호스팅 인스턴스에서 PWA를 설치하려면 [HTTPS를 통해 연결](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Installable_PWAs)해야 합니다.
자세한 내용은 [직접 호스팅하기 문서의 이 섹션](https://github.com/schlagmichdoch/PairDrop/blob/master/docs/host-your-own.md#testing-pwa-related-features)을 참고하세요.

<br>

</details>

<details>
<summary style="font-size:1.25em;margin-top: 24px; margin-bottom: 16px; font-weight: var(--base-text-weight-semibold, 600); line-height: 1.25;">
    단축키가 있나요?
</summary>

<br>

사용 가능한 단축키는 다음과 같습니다.
- `CTRL + ENTER`로 메시지를 보냅니다.
- `Esc`를 눌러 모든 "보내기" 및 "페어링" 대화상자를 닫습니다.
- `CTRL/⌘ + C`로 받은 메시지를 클립보드에 복사합니다.
- `Enter`로 파일 전송 요청을 수락하고 `Esc`로 거절합니다.
<br>

</details>

<details>
<summary style="font-size:1.25em;margin-top: 24px; margin-bottom: 16px; font-weight: var(--base-text-weight-semibold, 600); line-height: 1.25;">
    iOS에서 이미지를 갤러리에 바로 저장하려면 어떻게 해야 하나요?
</summary>

<br>

~~iOS는 웹사이트에서 공유된 이미지를 갤러리에 바로 저장하도록 허용하지 않는 것으로 보입니다.~~
~~웹사이트에서 공유된 이미지에는 그 옵션이 아예 제공되지 않습니다.~~

~~iOS 단축어가 해결해 줍니다.~~ \
사진을 받아 갤러리에 저장하는 간단한 iOS 단축어를 만들었습니다.
https://routinehub.co/shortcut/13988/

업데이트: \
이는 최근 iOS 버전에서 수정된 버그였던 것으로 보입니다 (https://github.com/WebKit/WebKit/pull/13111). \
영향을 받는 이전 iOS 버전을 사용 중이라면 여전히 유용할 수 있습니다. \
다행히 이제는 `Save Image`/`Save X Images`를 그냥 사용하면 됩니다 🎉

<br>

</details>

<details>
<summary style="font-size:1.25em;margin-top: 24px; margin-bottom: 16px; font-weight: var(--base-text-weight-semibold, 600); line-height: 1.25;">
    "컨텍스트" 메뉴나 "공유" 메뉴에서 파일이나 텍스트를 바로 보낼 수 있나요?
</summary>

<br>

네, 드디어 가능합니다.
* [Windows의 "컨텍스트" 메뉴에서 파일 바로 보내기](/docs/how-to.md#send-files-directly-from-context-menu-on-windows)
* [iOS의 "공유" 메뉴에서 바로 보내기](/docs/how-to.md#send-directly-from-share-menu-on-ios)
* [Android의 "공유" 메뉴에서 바로 보내기](/docs/how-to.md#send-directly-from-share-menu-on-android)

<br>

</details>

<details>
<summary style="font-size:1.25em;margin-top: 24px; margin-bottom: 16px; font-weight: var(--base-text-weight-semibold, 600); line-height: 1.25;">
    CLI로 파일이나 텍스트를 바로 보낼 수 있나요?
</summary>

<br>

네, 가능합니다.

* [명령줄 인터페이스에서 바로 보내기](/docs/how-to.md#send-directly-via-command-line-interface)

<br>

</details>

<details>
<summary style="font-size:1.25em;margin-top: 24px; margin-bottom: 16px; font-weight: var(--base-text-weight-semibold, 600); line-height: 1.25;">
    서드파티 앱이 있나요?
</summary>

<br>

다음 서드파티 앱은 PairDrop과 호환됩니다.

1. [Snapdrop Android 앱](https://github.com/fm-sys/snapdrop-android)
2. [Firefox용 Snapdrop (애드온)](https://github.com/ueen/SnapdropFirefoxAddon)
3. 직접 만들어 보셔도 좋습니다 :)

<br>

</details>

<details>
<summary style="font-size:1.25em;margin-top: 24px; margin-bottom: 16px; font-weight: var(--base-text-weight-semibold, 600); line-height: 1.25;">
    연결은 어떻게 이루어지나요? 기기 간 직접 P2P 연결인가요, 아니면 서드파티 서버를 거치나요?
</summary>

<br>

WebRTC 피어 투 피어 연결을 사용합니다.
WebRTC에는 시그널링 서버가 필요하지만, 이 서버는 연결을 설정하는 데에만 사용됩니다.
서버는 파일 전송에 관여하지 않습니다.

기기들이 같은 네트워크에 있다면
파일이 어떤 서버로도 전송되지 않습니다.

기기들이 페어링되어 있고 NAT 뒤에 있다면
PairDrop TURN 서버가 파일과 메시지를 중계하는 데 사용됩니다.
STUN, TURN, WebRTC에 대해 더 알아보려면
[기술 문서](technical-documentation.md#encryption-webrtc-stun-and-turn)를 참고하세요.

직접 인스턴스를 호스팅하면서
WebRTC를 지원하지 않는 기기도 지원하고 싶다면
[WebSocket 폴백을 활성화하여 PairDrop 인스턴스를 시작](https://github.com/schlagmichdoch/PairDrop/blob/master/docs/host-your-own.md#websocket-fallback-for-vpn)할 수 있습니다.

<br>

</details>

<details>
<summary style="font-size:1.25em;margin-top: 24px; margin-bottom: 16px; font-weight: var(--base-text-weight-semibold, 600); line-height: 1.25;">
    개인정보 보호는 어떤가요? 파일이 서드파티 서버에 저장되나요?
</summary>

<br>

파일은 피어 간에 직접 전송됩니다.
PairDrop은 데이터베이스조차 사용하지 않습니다.
궁금하시다면 [시그널링 서버](https://github.com/schlagmichdoch/PairDrop/blob/master/server/ws-server.js)를 살펴보세요.
WebRTC는 전송 중인 파일을 암호화합니다.

기기들이 같은 네트워크에 있다면
파일이 어떤 서버로도 전송되지 않습니다.

기기들이 페어링되어 있고 NAT 뒤에 있다면
PairDrop TURN 서버가 파일과 메시지를 중계하는 데 사용됩니다.
STUN, TURN, WebRTC에 대해 더 알아보려면
[기술 문서](technical-documentation.md#encryption-webrtc-stun-and-turn)를 참고하세요.

<br>

</details>

<details>
<summary style="font-size:1.25em;margin-top: 24px; margin-bottom: 16px; font-weight: var(--base-text-weight-semibold, 600); line-height: 1.25;">
    보안은 어떤가요? 컴퓨터 간에 전송되는 동안 파일이 암호화되나요?
</summary>

<br>

네. 파일은 WebRTC를 사용해 전송되며 전송 중에 암호화됩니다.
다만 PairDrop 서버는 신뢰해야 합니다. 연결이 안전하고 [중간자 공격(MITM)](https://en.m.wikipedia.org/wiki/Man-in-the-middle_attack)이 없음을 보장하기 위해, 시그널링을 암호화하고 검증 절차를 도입하여 PairDrop을
제로 트러스트 방식으로 만들 계획이 있습니다. 진행 상황은 [이슈 #180](https://github.com/schlagmichdoch/PairDrop/issues/180)에서 확인하세요.

<br>

</details>

<details>
<summary style="font-size:1.25em;margin-top: 24px; margin-bottom: 16px; font-weight: var(--base-text-weight-semibold, 600); line-height: 1.25;">
    페어링된 기기로 많은 파일을 전송하는 데 너무 오래 걸립니다
</summary>

<br>

기기들이 서로 다른 NAT 뒤에 있어 트래픽을 TURN 서버를 통해 중계해야 하는 경우
전송 속도가 느려지는 것은 당연합니다.

기기 중 하나에서 핫스팟을 열어 연결을 이어 주면
TURN 서버가 필요 없어집니다.

- [Windows에서 핫스팟을 여는 방법](https://support.microsoft.com/en-us/windows/use-your-windows-pc-as-a-mobile-hotspot-c89b0fad-72d5-41e8-f7ea-406ad9036b85#WindowsVersion=Windows_11)
- [macOS에서 핫스팟을 여는 방법](https://support.apple.com/guide/mac-help/share-internet-connection-mac-network-users-mchlp1540/mac)
- [Linux에서 핫스팟을 여는 라이브러리](https://github.com/lakinduakash/linux-wifi-hotspot)

휴대폰의 모바일 핫스팟을 사용해도 됩니다.
그러면 모든 데이터가 기기 간에 직접 전송되며 데이터 요금제를 사용하지 않습니다.

<br>

</details>

<details>
<summary style="font-size:1.25em;margin-top: 24px; margin-bottom: 16px; font-weight: var(--base-text-weight-semibold, 600); line-height: 1.25;">
    왜 xyz 기능을 구현하지 않나요?
</summary>

<br>

Snapdrop과 PairDrop은 극단적인 단순함을 탐구하는 프로젝트입니다.
사용자 인터페이스는 놀라울 정도로 단순합니다.
모든 기능이 다른 모든 기능과 서로 간섭할 수 있어 복잡도가 제곱으로 증가하기 때문에
기능은 매우 신중하게 선택합니다.
저희는 즉각적인 파일 전송이라는 단 하나의 사용 사례에만 집중합니다.
극단적인 예외 상황까지 최적으로 지원하지 않는 편이 일반 사용자에게 더 나은 흐름을 제공합니다.
실망하지 마세요. 단순함을 위해 기능 요청을 거절할 수도 있습니다.

더 알아보시려면 *Insanely Simple: The Obsession that Drives Apple's Success*와
*Thinking, Fast and Slow*를 읽어 보세요.

<br>

</details>

<details>
<summary style="font-size:1.25em;margin-top: 24px; margin-bottom: 16px; font-weight: var(--base-text-weight-semibold, 600); line-height: 1.25;">
    PairDrop이 정말 멋집니다. 어떻게 후원할 수 있나요?
</summary>

<br>

* [커피 한 잔 사 주세요](https://www.buymeacoffee.com/pairdrop). 도메인과 서버 비용을 충당하고 자유 소프트웨어를 후원할 수 있습니다.
* [버그 신고, 피드백, 제안 제출](https://github.com/schlagmichdoch/pairdrop/issues)
* 소셜 미디어에 PairDrop을 공유합니다.
* 버그를 수정하고 풀 리퀘스트를 만듭니다.
* 보안 분석을 수행하고 제안합니다.
* [활발한 토론](https://github.com/schlagmichdoch/PairDrop/discussions)에 참여합니다.

<br>

</details>

<details>
<summary style="font-size:1.25em;margin-top: 24px; margin-bottom: 16px; font-weight: var(--base-text-weight-semibold, 600); line-height: 1.25;">
    어떻게 작동하나요?
</summary>

<br>

[기술적 구현에 대한 정보는 여기를 참고하세요](/docs/technical-documentation.md)

<br>

</details>

[< 뒤로](/README.md)
