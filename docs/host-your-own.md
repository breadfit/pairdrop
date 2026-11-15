# 배포 안내

## 인터넷 전송을 위한 TURN 서버

서로 다른 네트워크 간 전송을 가능하게 하려면 직접 TURN 서버를 호스팅해야 합니다.

[이 가이드](https://gabrieltanner.org/blog/turn-server/)를 따라 시스템에 coturn을 직접 설치(1단계)하거나 
Docker로 배포(5단계)하십시오.

이 저장소의 `docker-compose-coturn.yml`을 사용할 수 있습니다. [Docker Compose로 Coturn과 PairDrop 실행하기](#coturn-and-pairdrop-via-docker-compose)를 참고하십시오.
 
또는 [OpenRelay](https://www.metered.ca/tools/openrelay/)와 같이 미리 구성된 무료 TURN 서버를 사용할 수도 있습니다.

<br>

## HTTPS로 PairDrop 제공하기

일부 브라우저에서는 몇몇 기능이 제대로 동작하려면 PairDrop을 TLS로 제공해야 합니다.
해당 기능은 다음과 같습니다.
- '복사' 버튼으로 수신한 메시지 복사하기
- PairDrop을 PWA로 설치하기
- 기기 간 영구 페어링
- 표시 이름 변경
- 알림

물론 보안을 강화하기 위해서도 TLS 사용을 권장합니다.

<br>

## Docker로 배포하기

PairDrop을 가장 쉽게 실행하는 방법은 Docker를 사용하는 것입니다.

### Docker Hub의 Docker 이미지

```bash
docker run -d --restart=unless-stopped --name=pairdrop -p 127.0.0.1:3000:3000 lscr.io/linuxserver/pairdrop
```
> 이 이미지는 [linuxserver.io](https://linuxserver.io)에서 호스팅합니다. 자세한 내용은 https://hub.docker.com/r/linuxserver/pairdrop 을 참고하십시오.


<br>

### GitHub Container Registry(ghcr.io)의 Docker 이미지

```bash
docker run -d --restart=unless-stopped --name=pairdrop -p 127.0.0.1:3000:3000 ghcr.io/schlagmichdoch/pairdrop
```


<br>

### 직접 빌드한 Docker 이미지

#### 이미지 빌드하기

```bash
docker build --pull . -f Dockerfile -t pairdrop
```

> 새 버전이 릴리스될 때 이 단계를 자동으로 수행하도록 GitHub Action이 설정되어 있습니다.
>
> `--pull`은 항상 최신 node 이미지를 사용하도록 보장합니다.

#### 이미지 실행하기

```bash
docker run -d --restart=unless-stopped --name=pairdrop -p 127.0.0.1:3000:3000 -it pairdrop
```

> 모든 클라이언트가 서로를 발견하는 것을 막으려면 서버 프록시로 `X-Forwarded-For` 헤더를 설정해야 합니다 
> ([#HTTP-Server](#http-server) 참고).
>
> 프록시를 우회하여 Docker 컨테이너에 직접 접속하는 것을 막기 위해 
> 실행 명령에 `127.0.0.1`을 지정합니다.


<br>

### 플래그

`docker run` 명령에서 다음 플래그를 사용하여 옵션을 설정합니다.

#### 포트

```bash
-p 127.0.0.1:8080:3000
```

> Docker 이미지가 사용할 포트를 지정합니다.
>
> - 3000 -> `-p 127.0.0.1:3000:3000`
> - 8080 -> `-p 127.0.0.1:8080:3000`

#### Docker로 환경 변수 설정하기

환경 변수는 `docker run` 명령에서 직접 설정합니다. \
예: `docker run -p 127.0.0.1:3000:3000 -it pairdrop -e DEBUG_MODE="true"`

사용 가능한 환경 변수의 목록은 [여기](#environment-variables)에서 확인할 수 있습니다.

예시:
```bash
docker run -d \
    --name=pairdrop \
    --restart=unless-stopped \
    -p 127.0.0.1:3000:3000 \
    -e PUID=1000 \
    -e PGID=1000 \
    -e WS_SERVER=false \
    -e WS_FALLBACK=false \
    -e RTC_CONFIG=false \
    -e RATE_LIMIT=false \
    -e DEBUG_MODE=false \
    -e TZ=Etc/UTC \
    lscr.io/linuxserver/pairdrop 
```

<br>

## Docker Compose로 배포하기

다음은 docker compose 파일의 예시입니다.

```yaml
version: "3"
services:
    pairdrop:
        image: "lscr.io/linuxserver/pairdrop:latest"
        container_name: pairdrop
        restart: unless-stopped
        environment:
            - PUID=1000 # 애플리케이션을 실행할 UID
            - PGID=1000 # 애플리케이션을 실행할 GID
            - WS_FALLBACK=false # 클라이언트가 WebRTC 피어 투 피어 연결을 사용할 수 없을 때 websocket 폴백을 활성화하려면 true로 설정합니다.
            - RATE_LIMIT=false # 클라이언트를 5분당 1000건의 요청으로 제한하려면 true로 설정합니다.
            - RTC_CONFIG=false # STUN/TURN 서버를 지정하는 파일의 경로로 설정합니다.
            - DEBUG_MODE=false # 컨테이너와 피어 연결을 디버깅하려면 true로 설정합니다.
            - TZ=Etc/UTC # 시간대
        ports:
            - "127.0.0.1:3000:3000" # 웹 UI
```

`docker compose up -d`로 compose 파일을 실행합니다.

> 모든 클라이언트가 서로를 발견하는 것을 막으려면 서버 프록시로 `X-Forwarded-For` 헤더를 설정해야 합니다 
> ([#HTTP-Server](#http-server) 참고).
>
> 프록시를 우회하여 Docker 컨테이너에 직접 접속하는 것을 막기 위해 
> `ports` 인자에 `127.0.0.1`을 지정합니다.

<br>

## Node.js로 배포하기

이 저장소를 클론한 뒤 해당 폴더로 이동합니다.

```bash
git clone https://github.com/schlagmichdoch/PairDrop.git && cd PairDrop
```

NPM으로 모든 의존성을 설치합니다.

```bash
npm install
```

다음 명령으로 서버를 시작합니다.

```bash
npm start
```

> 기본적으로 node 서버는 3000번 포트에서 수신 대기합니다.


<br>

### 옵션 / 플래그

다음은 Node.js로 배포할 때만 의미가 있는 플래그입니다.

#### 포트

```bash
PORT=3000
```

> 기본값: `3000`
> 
> Node.js 서버가 사용할 포트를 지정하는 환경 변수입니다. \
> 예: `PORT=3010 npm start`

#### 로컬 실행

```bash
npm start -- --localhost-only
```

> localhost에서 오는 연결만 허용합니다.
>
> 모든 클라이언트가 서로를 발견하는 것을 막으려면 서버 프록시로 `X-Forwarded-For` 헤더를 설정해야 합니다 
> ([#HTTP-Server](#http-server) 참고).
>
> node로 PairDrop을 배포할 때 이 옵션을 사용하면 
> 리버스 프록시를 우회하여 Node.js 서버에 직접 접속하는 것을 막을 수 있습니다.

#### 오류 발생 시 자동 재시작

```bash
npm start -- --auto-restart
```

> 오류가 발생하면 서버를 자동으로 재시작합니다.

#### 프로덕션 (자동 시작 및 요청 제한)

```bash
npm run start:prod
```

> `RATE_LIMIT=5 npm start -- --auto-restart`의 단축 명령입니다.

#### 프로덕션 (자동 시작, 요청 제한, localhost 전용)

```bash
npm run start:prod -- --localhost-only
```

> node 서버로의 연결이 프록시 서버를 우회하는 것을 막으려면 \
> 프로덕션에서는 항상 "--localhost-only"를 사용해야 합니다.

#### Node.js로 환경 변수 설정하기

환경 변수를 지정하려면 실행 명령에서 `npm start` 앞에 설정합니다.
구문은 Unix와 Windows에서 서로 다릅니다.

Unix 기반 시스템

```bash
PORT=3000 RTC_CONFIG="rtc_config.json" npm start
```

Windows

```bash
$env:PORT=3000 RTC_CONFIG="rtc_config.json"; npm start
```

사용 가능한 환경 변수의 목록은 [여기](#environment-variables)에서 확인할 수 있습니다.

<br>

<a id="environment-variables"></a>
## 환경 변수

<a id="debug-mode"></a>
### 디버그 모드

```bash
DEBUG_MODE="true"
```

> 기본값: `false`
>
> 디버깅을 위해 사용 중인 환경 변수를 로그로 출력합니다.
>
> 접속하는 피어의 IP 주소에 대한 디버깅 정보를 출력합니다.
> 
> [#HTTP-Server](#http-server)가 올바르게 구성되어 자동 검색 기능이 제대로 동작하는지 
> 확인할 때 매우 유용합니다.
> 그렇지 않으면 모든 클라이언트가 네트워크 상태와 관계없이 서로를 발견하게 됩니다.
>
> 이 플래그를 `"true"`로 설정하면 PairDrop 서버에 접속하는 각 피어마다 다음과 같은 로그가 STDOUT으로 출력됩니다.
>
> ```
> ----DEBUGGING-PEER-IP-START----
> remoteAddress: ::ffff:172.17.0.1
> x-forwarded-for: 19.117.63.126
> cf-connecting-ip: undefined
> PairDrop uses: 19.117.63.126
> IP is private: false
> if IP is private, '127.0.0.1' is used instead
> ----DEBUGGING-PEER-IP-END----
> ```
>
> "PairDrop uses"의 IP 주소가 클라이언트 기기의 공인 IP 주소와 일치하면 모든 설정이 올바르게 된 것입니다. \
> 클라이언트 기기의 공인 IP 주소는 https://whatsmyip.com/ 에서 확인할 수 있습니다.
>
> 클라이언트의 개인정보를 보호하려면 \
> **프로덕션에서는 이 환경 변수를 절대 사용하지 마십시오!**


<br>

### 요청 제한

```bash
RATE_LIMIT=1
```

> 기본값: `false`
>
> 클라이언트를 5분당 1000건의 요청으로 제한합니다.
>
> "프록시/로드 밸런서 뒤에 있는 경우(Heroku, Bluemix, AWS ELB, Render, Nginx, Cloudflare, Akamai, Fastly, 
> Firebase Hosting, Rackspace LB, Riverbed Stingray 등 대부분의 호스팅 서비스에서 일반적입니다), 
> 요청의 IP 주소가 로드 밸런서/리버스 프록시의 IP가 되거나(요청 제한이 사실상 전역으로 동작하여 
> 한도에 도달하면 모든 요청이 차단됩니다) undefined가 될 수 있습니다."
> (참고: https://express-rate-limit.mintlify.app/guides/troubleshooting-proxy-issues)
>
> 이 설정에 사용할 올바른 숫자를 찾으려면 다음과 같이 하십시오.
>
> 1. `DEBUG_MODE=True`와 `RATE_LIMIT=1`로 PairDrop을 시작합니다.
> 2. PairDrop 인스턴스의 `/ip`로 `get` 요청을 보냅니다 (예: `https://pairdrop-example.net/ip`).
> 3. 응답으로 반환된 IP 주소가 자신의 공인 IP 주소와 일치하는지 확인합니다 (예: https://whatsmyip.com/ 에서 확인할 수 있습니다).
> 4. IP 주소가 일치하면 올바른 숫자를 찾은 것입니다. 일치하지 않으면 `RATE_LIMIT`을 1 늘리고 1~4단계를 다시 수행합니다.
>
> 예: Render에서는 RATE_LIMIT=5를 사용해야 합니다.


<br>

### IPv6 지역화

```bash
IPV6_LOCALIZE=4
```

> 기본값: `false`
>
> IPv6 피어 간 피어 자동 검색을 활성화하려면, 클라이언트 IPv6 주소 중 피어의 IP로 평가할 \
> 세그먼트 수를 줄여서 지정할 수 있습니다. \
> Cloudflare를 프록시로 사용할 때 특히 유용합니다.
>
> 이 플래그는 `1`에서 `7` 사이의 **정수**로 설정해야 합니다. \
> 이 숫자는 클라이언트 IP와 비교할 IPv6 [헥테트](https://en.wikipedia.org/wiki/IPv6#Address_representation)의 \
> 개수를 의미합니다. 가장 일반적인 값은 `4`이며, \
> 같은 `/64` 서브넷에 있는 피어끼리 묶입니다.


<br>

<a id="websocket-fallback-for-vpn"></a>
### Websocket 폴백 (VPN용)

```bash
WS_FALLBACK=true
```

> 기본값: `false`
>
> 클라이언트가 WebRTC 피어 투 피어 연결을 사용할 수 없는 경우를 위해 \
> 내장된 websocket 폴백을 클라이언트에 제공합니다.
>
> 공식 https://pairdrop.net 웹사이트에서는 사용하지 않지만, 
> 직접 호스팅하는 인스턴스에서는 활성화할 수 있습니다.\
> VPN을 통해 인스턴스에 접속하는 경우 특히 유용합니다(대부분의 VPN 서비스는 실제 IP 주소를 숨기기 위해 
> WebRTC를 완전히 차단합니다). ([자세한 내용은 여기](https://privacysavvy.com/security/safe-browsing/disable-webrtc-chrome-firefox-safari-opera-edge/)).
>
> **경고:** \
> 이 폴백을 사용하여 기기 간에 전송되는 모든 트래픽은 
> 서버를 경유하므로 피어 투 피어가 아닙니다!
> 
> 이 폴백을 통해 전송되는 트래픽은 서버에서 읽을 수 있다는 점에 유의하십시오. \
> 신뢰할 수 있는 인스턴스에서만 사용하십시오.
> 
> 또한 이 폴백을 사용하는 모든 트래픽은 서버의 데이터 요금제를 소모한다는 점에도 유의하십시오.


<br>

<a id="specify-stunturn-servers"></a>
### STUN/TURN 서버 지정하기

```bash
RTC_CONFIG="rtc_config.json"
```

> 기본값: `false`
>
> `RTC_CONFIG`를 설정 내용이 담긴 JSON 파일로 지정하여 \
> PairDrop 클라이언트가 사용할 STUN/TURN 서버를 지정합니다. \
> `rtc_config_example.json`을 출발점으로 사용할 수 있습니다.
>
> 직접 TURN 서버를 호스팅하려면 다음 가이드를 따를 수 있습니다: https://gabrieltanner.org/blog/turn-server/
> 또는 [OpenRelay](<[url](https://www.metered.ca/tools/openrelay/)>)와 같이 미리 구성된 무료 TURN 서버를 사용할 수도 있습니다.
>
> 기본 구성:
>
> ```json
> {
>   "sdpSemantics": "unified-plan",
>   "iceServers": [
>     {
>       "urls": "stun:stun.l.google.com:19302"
>     }
>   ]
> }
> ```

<br>

다른 시그널링 서버를 사용하는 인스턴스를 호스팅할 수 있습니다.
다른 인스턴스에서 호스팅하는 클라이언트 파일은 신뢰하고 싶지 않지만, https://pairdrop.net 을 사용하는 기기와는 계속 연결하고 싶을 때 유용합니다.

### 시그널링 서버 지정하기

```bash
SIGNALING_SERVER="pairdrop.net"
```

> 기본값: `false`
>
> 기본적으로 인스턴스에 접속한 클라이언트는 해당 인스턴스의 시그널링 서버를 사용하여 다른 기기에 연결합니다.
> 
> `SIGNALING_SERVER`를 사용하면 다른 시그널링 서버를 사용하는 인스턴스를 호스팅할 수 있습니다.
> 
> 클라이언트 파일의 무결성을 보장하고 싶어 다른 PairDrop 인스턴스에서 호스팅하는 클라이언트 파일은 신뢰하고 싶지 않지만, 해당 인스턴스를 사용하는 기기와는 계속 연결하고 싶을 때 유용합니다.
> 예를 들어 클라이언트 파일은 *pairdrop.your-domain.com*에서 직접 호스팅하되 시그널링 서버는 *pairdrop.net*의 공식 서버를 사용할 수 있습니다.
> 이렇게 하면 *pairdrop.your-domain.com*과 *pairdrop.net*에 접속한 기기끼리 서로를 발견할 수 있습니다.
> 
> PairDrop 서버의 버전이 시그널링 서버의 버전과 호환되어야 한다는 점에 유의하십시오.
>
> `SIGNALING_SERVER`는 프로토콜 접두사가 없는 올바른 URL이어야 합니다. 
> 올바른 값의 예: `pairdrop.net`, `pairdrop.your-domain.com:3000`, `your-domain.com/pairdrop`

<br>

### _PairDrop 정보_ 페이지의 버튼 사용자 지정

```bash
DONATION_BUTTON_ACTIVE=true
DONATION_BUTTON_LINK="https://www.buymeacoffee.com/pairdrop"
DONATION_BUTTON_TITLE="Buy me a coffee"
TWITTER_BUTTON_ACTIVE=true
TWITTER_BUTTON_LINK="https://twitter.com/account"
TWITTER_BUTTON_TITLE="Find me on Twitter"
MASTODON_BUTTON_ACTIVE=true
MASTODON_BUTTON_LINK="https://mastodon.social/account"
MASTODON_BUTTON_TITLE="Find me on Mastodon"
BLUESKY_BUTTON_ACTIVE=true
BLUESKY_BUTTON_LINK="https://bsky.app/profile/account"
BLUESKY_BUTTON_TITLE="Find me on Bluesky"
CUSTOM_BUTTON_ACTIVE=true
CUSTOM_BUTTON_LINK="https://your-custom-social-network.net/account"
CUSTOM_BUTTON_TITLE="Find me on this custom social network"
PRIVACYPOLICY_BUTTON_ACTIVE=true
PRIVACYPOLICY_BUTTON_LINK="https://link-to-your-privacy-policy.net"
PRIVACYPOLICY_BUTTON_TITLE="Open our privacy policy"
```

> 기본값: 설정되지 않음
>
> 기본적으로 클라이언트에는 GitHub, BuyMeACoffee, Twitter, GitHub의 FAQ 버튼이 기본 구성으로 표시됩니다.
> 
> GitHub와 GitHub의 FAQ 버튼은 필수이므로 항상 표시됩니다.
> 
> 나머지 버튼은 다음과 같이 사용자 지정할 수 있습니다.
>
> * `*_BUTTON_ACTIVE`: 기본적으로 숨겨진 버튼을 표시하려면 `true`로, 기본적으로 표시되는 버튼을 숨기려면 `false`로 설정합니다.
> * `*_BUTTON_LINK`: 버튼의 href 속성을 덮어쓸 URL을 설정합니다.
> * `*_BUTTON_TITLE`: 버튼의 마우스 오버 제목을 덮어쓰도록 설정합니다. 이 경우 제목이 번역되지 않습니다.

<br>

## 상태 점검

> `ghcr.io`에서 호스팅하는 Docker 이미지와 직접 빌드한 Docker 이미지에는 상태 점검(healthcheck)이 포함되어 있습니다.
>
> 자세한 내용은 [Docker Swarm 사용법](docker-swarm-usage.md#docker-swarm-usage)을 참고하십시오.

<br>

<a id="http-server"></a>
## HTTP 서버

PairDrop을 실행할 때 `X-Forwarded-For` 헤더는 프록시가 설정해야 합니다. \
그렇지 않으면 모든 클라이언트가 서로에게 보이게 됩니다.

설정이 올바른지 확인하려면 [환경 변수 `DEBUG_MODE="true"`를 사용하십시오](#debug-mode).

### nginx 사용하기

#### http 및 https 요청 허용

```
server {
    listen       80;

    expires epoch;

    location / {
        proxy_connect_timeout 300;
        proxy_pass http://127.0.0.1:3000;
        proxy_set_header Connection "upgrade";
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header X-Forwarded-for $remote_addr;
    }
}

server {
    listen       443 ssl http2;
    ssl_certificate /etc/ssl/certs/pairdrop-dev.crt;
    ssl_certificate_key /etc/ssl/certs/pairdrop-dev.key;

    expires epoch;

    location / {
        proxy_connect_timeout 300;
        proxy_pass http://127.0.0.1:3000;
        proxy_set_header Connection "upgrade";
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header X-Forwarded-for $remote_addr;
    }
}
```

#### http에서 https로 자동 리디렉션:

```
server {
    listen       80;

    expires epoch;

    location / {
        return 301 https://$host:3000$request_uri;
    }
}

server {
    listen       443 ssl http2;
    ssl_certificate /etc/ssl/certs/pairdrop-dev.crt;
    ssl_certificate_key /etc/ssl/certs/pairdrop-dev.key;

    expires epoch;

    location / {
        proxy_connect_timeout 300;
        proxy_pass http://127.0.0.1:3000;
        proxy_set_header Connection "upgrade";
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header X-Forwarded-for $remote_addr;
    }
}
```


<br>

### Apache 사용하기

`proxy`, `proxy_http`, `mod_proxy_wstunnel` 모듈을 설치합니다.

```bash
a2enmod proxy
```

```bash
a2enmod proxy_http
```

<br>

`/etc/apache2/sites-available` 아래에 새 설정 파일을 만듭니다 (Debian 기준).

**pairdrop.conf**

#### HTTP 및 HTTPS 요청 허용

```apacheconf
<VirtualHost *:80>
	ProxyPass / http://127.0.0.1:3000/ upgrade=websocket
</VirtualHost>
<VirtualHost *:443>
	ProxyPass / https://127.0.0.1:3000/ upgrade=websocket
</VirtualHost>
```

#### HTTP에서 HTTPS로 자동 리디렉션:

```apacheconf
<VirtualHost *:80>
	Redirect permanent / https://127.0.0.1:3000/
</VirtualHost>
<VirtualHost *:443>
	ProxyPass / http://127.0.0.1:3000/ upgrade=websocket
</VirtualHost>
```

새 가상 호스트를 활성화하고 Apache를 다시 불러옵니다.

```bash
a2ensite pairdrop
```

```bash
service apache2 reload
```

<br>

<a id="coturn-and-pairdrop-via-docker-compose"></a>
## Docker Compose로 Coturn과 PairDrop 실행하기

### 컨테이너 설정
`docker-compose-coturn.yml`을 사용하여 TLS 기반 TURN을 활성화한 상태로 coturn과 PairDrop을 한 번에 실행하려면
다음 단계를 따라야 합니다.

1. `<DOMAIN>`에 대한 인증서를 생성하거나 가져옵니다 (예: letsencrypt / certbot).
2. `./ssl` 폴더를 만듭니다: `mkdir ssl`
3. SSL 인증서와 개인 키를 `./ssl`에 복사합니다. 
4. `./ssl`에 대한 접근을 제한합니다: `chown -R nobody:nogroup ./ssl`
5. dh-params 파일을 만듭니다: `openssl dhparam -out ./ssl/dhparams.pem 4096` 
6. `rtc_config_example.json`을 `rtc_config.json`으로 복사합니다.
7. `turnserver_example.conf`를 `turnserver.conf`로 복사합니다.
8. 두 파일의 `<DOMAIN>`을 PairDrop 인스턴스가 실행 중인 도메인으로 변경합니다. 
9. `turnserver.conf`와 `rtc-config.json`의 `username`과 `password`를 변경합니다.
10. coturn을 포함한 컨테이너를 시작하려면 다음을 실행합니다. \
  `docker compose -f docker-compose-coturn.yml up -d`

<br>

#### 컨테이너 설정
coturn을 포함한 컨테이너를 재시작하려면 다음을 실행합니다. \
  `docker compose -f docker-compose-coturn.yml restart`

<br>

#### 컨테이너 설정
coturn을 포함한 컨테이너를 중지하려면 다음을 실행합니다. \
  `docker compose -f docker-compose-coturn.yml stop`

<br>

### 방화벽
자체 coturn 서버를 포함하여 PairDrop을 실행하려면 방화벽에서 포트를 열어야 합니다. 다음 포트를 추가로 열어야 합니다.
- 3478 tcp/udp
- 5349 tcp/udp
- 10000:20000 tcp/udp

<br>

## 로컬 개발

### 설치

개발에 필요한 모든 파일은 `./dev` 폴더에 있습니다.

편의를 위해 개발용 docker compose 파일도 제공됩니다.

#### docker compose로 개발하기
먼저 [docker와 docker compose를 설치합니다.](https://docs.docker.com/compose/install/)

그런 다음 저장소를 클론하고 docker compose를 실행합니다.

```bash
git clone https://github.com/schlagmichdoch/PairDrop.git && cd PairDrop
```
```bash
docker compose -f docker-compose-dev.yml up --no-deps --build
```

이제 웹 브라우저에서 `http://localhost:8080`으로 접속합니다.

- Node.js 서버를 디버깅하려면 `docker logs pairdrop`을 실행합니다.
- 코드를 변경한 후에는 `docker compose` 명령을 다시 실행해야 합니다.

<br>

<a id="testing-pwa-related-features"></a>
#### PWA 관련 기능 테스트하기

PWA는 앱이 올바르게 설정되고 신뢰할 수 있는 TLS 엔드포인트에서 제공되어야 합니다.

NGINX 컨테이너가 CA 인증서와 웹사이트 인증서를 대신 생성합니다. 
인증서의 common name을 올바르게 설정하려면 
`docker-compose-dev.yml`의 FQDN 환경 변수를 
작업용 컴퓨터의 정규화된 도메인 이름(FQDN)으로 변경해야 합니다. (기본값: localhost)

PWA 기능을 테스트하려면 로컬 배포용 인증서의 CA를 신뢰하도록 설정해야 합니다. \
편의를 위해 `http://<Your FQDN>:8080/ca.crt`에서 crt 파일을 내려받을 수 있습니다. \
해당 인증서를 운영 체제의 신뢰 저장소에 설치하십시오. \

##### Windows
- 반드시 `신뢰할 수 있는 루트 인증 기관` 저장소에 설치하십시오.

##### macOS
- `키체인 접근`에서 설치된 CA 인증서를 두 번 클릭하고,
- `신뢰`를 펼친 다음 SSL에 대해 `항상 신뢰`를 선택합니다.

##### Firefox
Firefox는 자체 신뢰 저장소를 사용합니다. CA를 설치하려면 다음과 같이 합니다.
- Firefox로 `http://<Your FQDN>:8080/ca.crt` (기본값: `http://localhost:8080/ca.crt`)에 접속합니다.
- 메시지가 표시되면 `이 CA를 웹 사이트 식별에 신뢰` 항목을 선택하고 _확인_을 클릭합니다.

다른 방법:
1. `http://<Your FQDN>:8080/ca.crt` (기본값: `http://localhost:8080/ca.crt`)에서 `ca.crt`를 내려받습니다.
2. `about:preferences#privacy`로 이동하여 `보안`과 `인증서`까지 스크롤한 뒤 `인증서 보기`를 클릭합니다.
3. 내려받은 인증서 파일(1단계)을 가져옵니다.

##### Chrome
- Chrome을 사용하는 경우 신뢰 저장소를 다시 불러오도록 Chrome을 재시작해야 합니다 (`chrome://restart`).
- 또한 새 인증서를 설치한 후에는 저장소를 지워야 합니다 (DevTools → Application → Clear storage → Clear site data).

##### Google Chrome
- 인증서 설치를 건너뛰려면 `chrome://flags/#unsafely-treat-insecure-origin-as-secure`를 열 수도 있습니다.
- `Insecure origins treated as secure` 기능을 활성화해야 하며, 목록에 PairDrop 테스트 인스턴스가 포함되어야 합니다. 예: `http://127.0.0.1:3000,https://127.0.0.1:8443`

인증서(CA 및 웹 서버 인증서)는 하루 후에 만료된다는 점에 유의하십시오.
또한 NGINX Docker 컨테이너를 재시작할 때마다 새 인증서가 생성됩니다.

사이트는 `https://<Your FQDN>:8443` (기본값: `https://localhost:8443`)에서 제공됩니다.

[< 뒤로](/README.md)
