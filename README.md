<div align="center">
  <a href="https://github.com/schlagmichdoch/PairDrop">
    <img src="public/images/android-chrome-512x512.png" alt="Logo"  width="150" height="150">
  </a>
 
  # _Send it_, with [PairDrop](https://pairdrop.net)

  <p>
    <a href="https://pairdrop.net"><strong>웹 브라우저에서</strong></a> 하는 로컬 파일 공유. 
    <br>
    Apple의 AirDrop에서 영감을 받았습니다.
    <br> 
    Snapdrop의 포크입니다.
    <br>
    <br>
    <a href="https://github.com/schlagmichdoch/PairDrop/issues">버그 신고</a>
    <br />
    <a href="https://github.com/schlagmichdoch/PairDrop/issues">기능 요청</a>
  </p>
</div>
<br>

## 주요 기능
모든 플랫폼에서 작동하는 로컬 네트워크 파일 공유입니다.

- 실제로 잘 작동하는 멀티 플랫폼 AirDrop 대체 솔루션입니다.
  - 같은 로컬 네트워크에 있는 기기로 이미지, 문서, 텍스트를 P2P(peer-to-peer) 연결로 보낼 수 있습니다.
- 인터넷 전송
  - 임시 공개 룸에 참여해 인터넷으로 간편하게 파일을 전송할 수 있습니다.
- 웹 앱
  - 최신 웹 브라우저가 있는 모든 기기에서 작동합니다.
 
휴대폰에서 노트북으로 파일을 보내고 싶으신가요?
<br>Android와 iOS를 쓰는 친구들과 원본 화질 그대로 사진을 공유하고 싶으신가요?
<br>Linux 시스템끼리 개인 파일을 P2P로 공유하고 싶으신가요?

<img src="docs/pairdrop_screenshot_mobile.gif" alt="PairDrop 사용 모습을 보여 주는 스크린샷 GIF" style="width: 300px">

## 기반이 된 [Snapdrop](https://github.com/RobinLinus/snapdrop)과의 차이점
<details><summary>모든 차이점 보기</summary>

### 페어링된 기기와 공개 룸 — 인터넷 전송
* 페어링된 기기 사이에서, 또는 임시 공개 룸에 입장해 인터넷으로 파일을 전송할 수 있습니다.
* 복잡한 네트워크 환경(공용 Wi-Fi, 회사 네트워크, iCloud Private Relay, VPN 등)에서도 기기에 연결할 수 있습니다.
* 모바일 핫스팟에 있는 기기에도 연결할 수 있습니다.
* NAT 뒤에 있는 로컬 네트워크 바깥의 기기는 PairDrop TURN 서버를 통해 자동으로 연결됩니다.
* 로컬 네트워크에 있거나, 같은 공개 룸에 있거나, 이전에 페어링한 기기가 표시됩니다.

#### 영구 기기 페어링

알고 있는 기기에 언제든 연결하세요.

* 6자리 코드 또는 QR 코드로 기기를 페어링합니다.
* 페어링된 기기는 로컬 네트워크와 상관없이 공유 시크릿으로 항상 서로를 찾습니다. 
* 페어링은 영구적입니다. PairDrop을 다시 열어도 기기를 찾을 수 있습니다.
* 기기를 쉽게 편집하고 페어링을 해제할 수 있습니다.

#### 임시 공개 룸

복잡한 네트워크 환경이나 인터넷 너머의 다른 사람과 연결하세요.

* 5자리 문자 코드 또는 QR 코드로 공개 룸에 입장합니다.
* 공개 룸에 입장하면 로컬 네트워크 바깥의 기기와 임시로 연결할 수 있습니다.
* 같은 공개 룸에 있는 모든 기기는 서로를 볼 수 있습니다.
* 공개 룸은 임시입니다. PairDrop을 닫으면 모든 룸에서 나가게 됩니다.

### [파일 송수신 UI 개선](https://github.com/RobinLinus/snapdrop/issues/560)
* 요청이 수락된 뒤에 파일이 전송됩니다. 가능한 경우 전송이 끝나면 파일이 자동으로 다운로드됩니다.
* 여러 파일은 ZIP 파일로 다운로드됩니다.
* Android와 iOS에서는 "공유" 메뉴로 다운로드하거나 공유하거나 갤러리에 저장할 수 있습니다.
* 여러 파일을 한 번에 전송하며 전체 진행률을 표시합니다.

### 공유 메뉴, 컨텍스트 메뉴, CLI에서 파일이나 텍스트 바로 보내기
* [Ubuntu의 컨텍스트 메뉴에서 바로 파일 보내기 (Nautilus 사용)](docs/how-to.md#send-multiple-files-and-directories-directly-from-context-menu-on-ubuntu-using-nautilus)
* [Windows의 컨텍스트 메뉴에서 바로 파일 보내기](docs/how-to.md#send-files-directly-from-context-menu-on-windows)
* [iOS의 "공유" 메뉴에서 바로 보내기](docs/how-to.md#send-directly-from-share-menu-on-ios)
* [Android의 "공유" 메뉴에서 바로 보내기](docs/how-to.md#send-directly-from-share-menu-on-android)
* [명령줄 인터페이스로 바로 보내기](docs/how-to.md#send-directly-via-command-line-interface)

### 기타 변경 사항
* 표시 이름을 바꿔 기기를 쉽게 구분할 수 있습니다.
* [파일/텍스트를 붙여넣고 나중에 받는 사람 선택하기 ](https://github.com/RobinLinus/snapdrop/pull/534)
* [파일 전송 중 기기가 절전 모드로 들어가지 않도록 방지](https://github.com/RobinLinus/snapdrop/pull/413)
* 파일 전송 중 PairDrop을 닫으려 하면 경고
* 여러 탭에서 PairDrop을 동시에 열기 ([@willstott101](https://github.com/willstott101) 님 감사합니다)
* [비디오 및 오디오 미리보기](https://github.com/RobinLinus/snapdrop/pull/455) ([@victorwads](https://github.com/victorwads) 님 감사합니다)
* 다크 또는 라이트 모드를 켠 뒤에도 테마를 자동/시스템 설정으로 되돌리기
* Node 전용 구현 ([@Bellisario](https://github.com/Bellisario) 님 감사합니다)
* 오류 발생 시 자동 재시작 ([@KaKi87](https://github.com/KaKi87) 님 감사합니다)
* 다수의 안정성 개선 ([@MWY001](https://github.com/MWY001), [@skiby7](https://github.com/skiby7), [@willstott101](https://github.com/willstott101) 님 감사합니다)
* 로컬 네트워크(예: Raspberry Pi)에서 PairDrop을 호스팅하는 경우: [사설 IP로 연결된 모든 피어가 서로를 찾을 수 있음](https://github.com/RobinLinus/snapdrop/pull/558)
* PairDrop을 직접 호스팅할 때 [STUN/TURN 서버를 직접 지정](docs/host-your-own.md#specify-stunturn-servers)할 수 있습니다
* 번역.

</details>

## [Hosted Weblate](https://hosted.weblate.org/engage/pairdrop/)에서 PairDrop 번역하기
<a href="https://hosted.weblate.org/engage/pairdrop/">
<img src="https://hosted.weblate.org/widget/pairdrop/horizontal-blue.svg" alt="번역 현황" style="width: 300px" />
</a>

## 다음의 훌륭한 기술로 만들어졌습니다.
* 바닐라 HTML5 / JS ES6 / CSS 3 프런트엔드
* [WebRTC](http://webrtc.org/) / WebSockets
* [Node.js](https://nodejs.org/en/) 백엔드
* [프로그레시브 웹 앱(PWA)](https://en.wikipedia.org/wiki/Progressive_web_app)으로 통일된 기능
* [IndexedDB API](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API)를 이용한 저장소 처리
* [zip.js](https://gildas-lormeau.github.io/zip.js/) 라이브러리
* [cyrb53](https://github.com/bryc/code/blob/master/jshash/experimental/cyrb53.js) 초고속 해시 함수
* [NoSleep](https://github.com/richtr/NoSleep.js) 화면 절전 방지, 웨이크 락 추가 ([MIT](licenses/MIT-NoSleep))
* [heic2any](https://github.com/alexcorvi/heic2any) HEIC/HEIF를 PNG/GIF/JPEG로 변환 ([MIT](licenses/MIT-heic2any))
* [Weblate](https://weblate.org/) 웹 기반 현지화 도구
* [BrowserStack](https://www.browserstack.com/) 이 프로젝트는 BrowserStack으로 테스트합니다

[FAQ](docs/faq.md)

[Docker 또는 Node.js로 직접 인스턴스 호스팅하기](docs/host-your-own.md).

## 후원
<a href="https://www.buymeacoffee.com/pairdrop" target="_blank">
<img src="https://cdn.buymeacoffee.com/buttons/v2/default-blue.png" alt="Buy me a coffee" style="height: 60px !important;width: 217px !important;" >
</a>
<br />
<br />

PairDrop은 자유 소프트웨어이며, 앞으로도 그럴 것입니다. \
유용하다고 느끼셨고 무료 오픈 소스 소프트웨어를 응원하고 싶으시다면, 위 버튼으로 후원해 주시기를 부탁드립니다. \
도메인과 서버 비용은 제가 부담해 왔으며, 여러분의 후원은 훌륭한 소프트웨어를 만들고 유지하는 데 큰 힘이 됩니다. \
여러분의 기여에 진심으로 감사드립니다!

## 기여하기
부담 없이 [이슈를 열거나](https://github.com/schlagmichdoch/pairdrop/issues/new/choose)
[풀 리퀘스트](https://github.com/schlagmichdoch/pairdrop/pulls)를 보내 주세요.
이때 [기여 가이드라인](CONTRIBUTING.md)을 따라 주시기 바랍니다.
