import {spawn} from "child_process";
import fs from "fs";

import PairDropServer from "./server.js";
import PairDropWsServer from "./ws-server.js";

// Handle SIGINT
process.on('SIGINT', () => {
    console.info("SIGINT Received, exiting...")
    process.exit(0)
})

// Handle SIGTERM
process.on('SIGTERM', () => {
    console.info("SIGTERM Received, exiting...")
    process.exit(0)
})

// Handle APP ERRORS
process.on('uncaughtException', (error, origin) => {
    console.log('----- 처리되지 않은 예외 -----')
    console.log(error)
    console.log('----- 예외 발생 위치 -----')
    console.log(origin)
})
process.on('unhandledRejection', (reason, promise) => {
    console.log('----- 처리되지 않은 Promise 거부 위치 -----')
    console.log(promise)
    console.log('----- 사유 -----')
    console.log(reason)
})

// Evaluate arguments for deployment with Docker and Node.js
let conf = {};

conf.debugMode = process.env.DEBUG_MODE === "true";

conf.port = process.env.PORT || 3000;

conf.wsFallback = process.argv.includes('--include-ws-fallback') || process.env.WS_FALLBACK === "true";

conf.rtcConfig = process.env.RTC_CONFIG && process.env.RTC_CONFIG !== "false"
    ? JSON.parse(fs.readFileSync(process.env.RTC_CONFIG, 'utf8'))
    : {
        "sdpSemantics": "unified-plan",
        "iceServers": [
            {
                "urls": "stun:stun.l.google.com:19302"
            }
        ]
    };


conf.signalingServer = process.env.SIGNALING_SERVER && process.env.SIGNALING_SERVER !== "false"
    ? process.env.SIGNALING_SERVER
    : false;

conf.ipv6Localize = parseInt(process.env.IPV6_LOCALIZE) || false;

let rateLimit = false;
if (process.argv.includes('--rate-limit') || process.env.RATE_LIMIT === "true") {
    rateLimit = 5;
}
else {
    let envRateLimit = parseInt(process.env.RATE_LIMIT);
    if (!isNaN(envRateLimit)) {
        rateLimit = envRateLimit;
    }
}
conf.rateLimit = rateLimit;

conf.buttons = {
    "donation_button": {
        "active": process.env.DONATION_BUTTON_ACTIVE,
        "link": process.env.DONATION_BUTTON_LINK,
        "title": process.env.DONATION_BUTTON_TITLE
    },
    "twitter_button": {
        "active": process.env.TWITTER_BUTTON_ACTIVE,
        "link": process.env.TWITTER_BUTTON_LINK,
        "title": process.env.TWITTER_BUTTON_TITLE
    },
    "mastodon_button": {
        "active": process.env.MASTODON_BUTTON_ACTIVE,
        "link": process.env.MASTODON_BUTTON_LINK,
        "title": process.env.MASTODON_BUTTON_TITLE
    },
    "bluesky_button": {
        "active": process.env.BLUESKY_BUTTON_ACTIVE,
        "link": process.env.BLUESKY_BUTTON_LINK,
        "title": process.env.BLUESKY_BUTTON_TITLE
    },
    "custom_button": {
        "active": process.env.CUSTOM_BUTTON_ACTIVE,
        "link": process.env.CUSTOM_BUTTON_LINK,
        "title": process.env.CUSTOM_BUTTON_TITLE
    },
    "privacypolicy_button": {
        "active": process.env.PRIVACYPOLICY_BUTTON_ACTIVE,
        "link": process.env.PRIVACYPOLICY_BUTTON_LINK,
        "title": process.env.PRIVACYPOLICY_BUTTON_TITLE
    }
};

// Evaluate arguments for deployment with Node.js only
conf.autoStart = process.argv.includes('--auto-restart');

conf.localhostOnly = process.argv.includes('--localhost-only');


// Validate configuration
if (conf.ipv6Localize) {
    if (!(0 < conf.ipv6Localize && conf.ipv6Localize < 8)) {
        console.error("ipv6Localize는 1에서 7 사이의 정수여야 합니다");
        process.exit(1);
    }

    console.log("IPv6 클라이언트 IP는 다음 단위로 지역화됩니다:",
        conf.ipv6Localize,
        conf.ipv6Localize === 1 ? "segment" : "segments");
}

if (conf.signalingServer) {
    const isValidUrl = /[a-z|0-9|\-._~:\/?#\[\]@!$&'()*+,;=]+$/.test(conf.signalingServer);
    const containsProtocol = /:\/\//.test(conf.signalingServer)
    const endsWithSlash = /\/$/.test(conf.signalingServer)
    if (!isValidUrl || containsProtocol) {
        console.error("SIGNALING_SERVER는 프로토콜 접두사가 없는 올바른 URL이어야 합니다.\n" +
            "올바른 값의 예: `pairdrop.net`, `pairdrop.example.com:3000`, `example.com/pairdrop`");
        process.exit(1);
    }

    if (!endsWithSlash) {
        conf.signalingServer += "/";
    }

    if (process.env.RTC_CONFIG || conf.wsFallback || conf.ipv6Localize) {
        console.error("SIGNALING_SERVER는 WS_FALLBACK, RTC_CONFIG, IPV6_LOCALIZE와 함께 사용할 수 없습니다. 이 설정들은 " +
            "시그널링 서버에서 지정되기 때문입니다.\n" +
            "이 인스턴스를 시그널링 서버로 사용하려면 SIGNALING_SERVER를 설정하지 마세요");
        process.exit(1);
    }
}

// Logs for debugging
if (conf.debugMode) {
    console.log("DEBUG_MODE가 활성화되어 있습니다. 개인정보 보호를 위해 운영 환경에서는 사용하지 마세요.");
    console.debug("\n");
    console.debug("----DEBUG ENVIRONMENT VARIABLES----")
    console.debug(JSON.stringify(conf, null, 4));
    console.debug("\n");
}

// Start a new PairDrop instance when an uncaught exception occurs
if (conf.autoStart) {
    process.on(
        'uncaughtException',
        () => {
            process.once(
                'exit',
                () => spawn(
                    process.argv.shift(),
                    process.argv,
                    {
                        cwd: process.cwd(),
                        detached: true,
                        stdio: 'inherit'
                    }
                )
            );
            process.exit();
        }
    );
}

// Start server to serve client files
const pairDropServer = new PairDropServer(conf);

if (!conf.signalingServer) {
    // Start websocket server if SIGNALING_SERVER is not set
    new PairDropWsServer(pairDropServer.server, conf);
} else {
    console.log("이 인스턴스에는 시그널링 서버가 포함되어 있지 않습니다. 이 인스턴스의 클라이언트는 다음 시그널링 서버에 연결합니다:", conf.signalingServer);
}

console.log('\nPairDrop이 다음 포트에서 실행 중입니다:', conf.port);
