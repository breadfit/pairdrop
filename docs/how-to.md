# How-To

<a id="send-directly-from-share-menu-on-ios"></a>
## iOS 공유 메뉴에서 바로 보내기
이미지, 파일, 폴더, URL, 텍스트를 공유 메뉴에서 바로 보낼 수 있는 \
iOS 단축어를 만들었습니다.
https://routinehub.co/shortcut/13990/

[//]: # (Todo: Add screenshots)

<br>

<a id="send-directly-from-share-menu-on-android"></a>
## Android 공유 메뉴에서 바로 보내기
[Web Share Target API](https://developer.mozilla.org/en-US/docs/Web/Manifest/share_target)가 구현되어 있습니다.

PWA를 설치하면 기기의 공유 메뉴에 자동으로 등록됩니다.

<br>

<a id="send-directly-via-command-line-interface"></a>
## 명령줄 인터페이스로 바로 보내기
명령줄 인터페이스로 PairDrop을 통해 파일이나 텍스트를 보냅니다. \
기본 브라우저에서 PairDrop이 열리며, 거기서 받는 사람을 선택할 수 있습니다.

### 사용법
```bash
pairdrop -h
```
```
Send files or text with PairDrop via command-line interface.
Current domain: https://pairdrop-dev.onrender.com/

Usage:
Open PairDrop:		pairdrop
Send files:		pairdrop file1/directory1 (file2/directory2 file3/directory3 ...)
Send text:		pairdrop -t "text"
Specify domain:		pairdrop -d "https://pairdrop.net/"
Show this help text:	pairdrop (-h|--help)

This pairdrop-cli version was released alongside v1.10.4
```

<br>

### 설치

<a id="linux"></a>
#### Linux / Mac
1. [릴리스 페이지](https://github.com/schlagmichdoch/PairDrop/releases)에서 최신 _pairdrop-cli.zip_을 다운로드합니다.
   ```shell
   wget "https://github.com/schlagmichdoch/PairDrop/releases/download/v1.11.2/pairdrop-cli.zip"
   ```
   or
   ```shell
   curl -LO "https://github.com/schlagmichdoch/PairDrop/releases/download/v1.11.2/pairdrop-cli.zip"
   ```
2. 원하는 폴더(예: `/usr/share/pairdrop-cli/`)에 압축을 풉니다.
   ```shell
   sudo unzip pairdrop-cli.zip -d /usr/share/pairdrop-cli/
   ```
3. _.pairdrop-cli-config.example_ 파일을 _.pairdrop-cli-config_로 복사합니다.
   ```shell
   sudo cp /usr/share/pairdrop-cli/.pairdrop-cli-config.example /usr/share/pairdrop-cli/.pairdrop-cli-config
   ```
4. bash 파일 _pairdrop_에 실행 권한을 부여합니다.
   ```shell
   sudo chmod +x /usr/share/pairdrop-cli/pairdrop
   ```
5. _pairdrop_을 _PATH_에 포함하도록 /usr/local/bin/에 심볼릭 링크를 추가합니다.
   ```shell
   sudo ln -s /usr/share/pairdrop-cli/pairdrop /usr/local/bin/pairdrop
   ```

<br>

#### Windows
1. [릴리스 페이지](https://github.com/schlagmichdoch/PairDrop/releases)에서 최신 _pairdrop-cli.zip_을 다운로드합니다.
2. 원하는 폴더(예: `C:\Program Files\pairdrop-cli`)에 파일을 넣습니다.
3. 이 폴더 안에서 _.pairdrop-cli-config.example_ 파일을 _.pairdrop-cli-config_로 복사합니다.
4. `Edit environment variables for your account`(계정의 환경 변수 편집)를 검색해서 엽니다.
5. `Environment Variables…`(환경 변수)를 클릭합니다.
6. _System Variables_(시스템 변수)에서 `Path`를 선택하고 _Edit..._(편집)를 클릭합니다.
7. _New_(새로 만들기)를 클릭하고 원하는 폴더(`C:\Program Files\pairdrop-cli`)를 입력한 뒤, 모든 창이 닫힐 때까지 *OK*를 클릭합니다.
8. 명령 프롬프트 창을 다시 엽니다.

**요구 사항**

Windows는 bash 스크립트를 기본적으로 실행할 수 없으므로 [Git Bash](https://gitforwindows.org/)를 설치해야 합니다.

그러면 기본 Windows 명령 프롬프트에서도 pairdrop-cli를 사용할 수 있습니다. \
bash 파일 대신 셸 파일을 사용하면, 이 파일이 Git Bash를 통해 \
_pairdrop-cli_(bash 파일)를 실행합니다.
```shell
pairdrop.sh -h
```

<br>

<a id="send-multiple-files-and-directories-directly-from-context-menu-on-windows"></a>
<a id="send-files-directly-from-context-menu-on-windows"></a>
## Windows의 컨텍스트 메뉴에서 여러 파일과 디렉터리 바로 보내기

### PairDrop으로 파일을 여는 프로그램으로 등록하기
pairdrop-cli를 Windows `Send to`(보내기) 메뉴에 추가하면 컨텍스트 메뉴로 PairDrop을 통해 여러 파일을 보낼 수 있습니다.
1. [릴리스 페이지](https://github.com/schlagmichdoch/PairDrop/releases)에서 최신 _pairdrop-cli.zip_을 다운로드합니다.
2. 원하는 폴더(예: `C:\Program Files\pairdrop-cli\`)에 압축을 풉니다.
3. 이 폴더 안에서 _.pairdrop-cli-config.example_ 파일을 _.pairdrop-cli-config_로 복사합니다.
4. 바로 가기 _send with PairDrop.lnk_를 복사합니다.
5. Windows 키+R을 누르고 `shell:sendto`를 입력한 뒤 Enter를 누릅니다.
6. 복사한 바로 가기를 해당 디렉터리에 붙여넣습니다.
7. 바로 가기의 속성 창을 열고, 링크 필드를 2단계에서 사용한 폴더에 있는 _send-with-pairdrop.ps1_을 가리키도록 수정합니다. \
   `"C:\Program Files\PowerShell\7\pwsh.exe" -File "C:\Program Files\pairdrop-cli\send-with-pairdrop.ps1"`
8. 모두 끝났습니다! 이제 PairDrop으로 여러 파일과 디렉터리를 바로 보낼 수 있습니다.

   _컨텍스트 메뉴_ > _Send to_ > _PairDrop_

##### 요구 사항
Windows는 bash 스크립트를 기본적으로 실행할 수 없으므로 [Git Bash](https://gitforwindows.org/)를 설치해야 합니다.

<br>

<a id="send-multiple-files-and-directories-directly-from-context-menu-on-ubuntu-using-nautilus"></a>
## Nautilus를 사용하는 Ubuntu의 컨텍스트 메뉴에서 여러 파일과 디렉터리 바로 보내기

### PairDrop으로 파일을 여는 프로그램으로 등록하기
pairdrop-cli를 Nautilus `Scripts` 메뉴에 추가하면 컨텍스트 메뉴로 PairDrop을 통해 여러 파일을 보낼 수 있습니다.
1. [위의 안내](#linux)에 따라 _pairdrop_을 실행 파일로 등록합니다.
2. 셸 파일 _send-with-pairdrop_을 `~/.local/share/nautilus/scripts/`에 복사해 컨텍스트 메뉴에 포함합니다.
   ```shell
   cp /usr/share/pairdrop-cli/send-with-pairdrop ~/.local/share/nautilus/scripts/
   ```
3. 셸 파일 _send-with-pairdrop_에 실행 권한을 부여합니다.
   ```shell
   chmod +x ~/.local/share/nautilus/scripts/send-with-pairdrop
   ```
4. 모두 끝났습니다! 이제 PairDrop으로 여러 파일과 디렉터리를 바로 보낼 수 있습니다.

   _컨텍스트 메뉴_ > _Scripts_ > _send-with-pairdrop_

<br>

## File Handling API
[File Handling API](https://learn.microsoft.com/en-us/microsoft-edge/progressive-web-apps-chromium/how-to/handle-files)
가 구현되어 있었지만, 기본 파일 연결이 덮어써지는 문제 ([#17](https://github.com/schlagmichdoch/PairDrop/issues/17),
[#116](https://github.com/schlagmichdoch/PairDrop/issues/116) [#190](https://github.com/schlagmichdoch/PairDrop/issues/190))가 있었고,
명시적으로 지정한 파일 형식에서만 작동하며 디렉터리는 전혀 처리하지 못해 제거되었습니다.

[< 뒤로](/README.md)
