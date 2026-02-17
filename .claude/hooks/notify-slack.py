#!/usr/bin/env python3
"""Claude Code → Slack 알림 스크립트

이벤트:
- Notification (permission_prompt): 권한 요청 시
- Stop: 작업 완료 시
"""

import sys
import json
import os
import urllib.request
import urllib.error


def load_env() -> dict[str, str]:
    """프로젝트 루트의 .env.local 파일에서 환경변수 로드"""
    env_vars: dict[str, str] = {}

    # 여러 경로 시도
    possible_paths = [
        # 1. 현재 작업 디렉토리
        os.path.join(os.getcwd(), ".env.local"),
        # 2. 스크립트의 부모 디렉토리의 부모 (.claude -> 프로젝트 루트)
        os.path.join(os.path.dirname(__file__), "..", "..", ".env.local"),
        # 3. CLAUDE_PROJECT_DIR 환경변수
        os.path.join(os.environ.get("CLAUDE_PROJECT_DIR", ""), ".env.local"),
        # 4. 하드코딩된 경로
        "C:/Users/Jinsik/workspace/courses/claude-nextjs-starters/.env.local",
    ]

    env_path = None
    for path in possible_paths:
        if os.path.isfile(path):
            env_path = path
            break

    if not env_path:
        return env_vars

    try:
        with open(env_path, encoding="utf-8") as f:
            for line in f:
                line = line.strip()
                if not line or line.startswith("#") or "=" not in line:
                    continue
                key, _, value = line.partition("=")
                env_vars[key.strip()] = value.strip()
    except FileNotFoundError:
        pass
    return env_vars


def send_slack(webhook_url: str, message: str) -> None:
    payload = json.dumps({"text": message}).encode("utf-8")
    req = urllib.request.Request(
        webhook_url,
        data=payload,
        headers={"Content-Type": "application/json"},
        method="POST",
    )
    try:
        urllib.request.urlopen(req, timeout=5)
    except urllib.error.URLError:
        pass  # 알림 실패해도 Claude 작업은 계속


def main() -> None:
    data = json.loads(sys.stdin.read())
    event = data.get("hook_event_name", "")
    cwd = data.get("cwd", "")

    env = load_env()
    webhook_url = env.get("SLACK_WEBHOOK_URL") or os.environ.get("SLACK_WEBHOOK_URL", "")
    if not webhook_url:
        sys.exit(0)

    if event == "Stop":
        # stop_hook_active 체크: 무한 루프 방지
        if data.get("stop_hook_active"):
            sys.exit(0)
        project = os.path.basename(cwd) if cwd else "알 수 없음"
        send_slack(webhook_url, f"✅ *Claude 작업 완료*\n📁 프로젝트: `{project}`")

    elif event == "Notification":
        notification_type = data.get("notification_type", "")
        if notification_type == "permission_prompt":
            message = data.get("message", "권한 요청")
            project = os.path.basename(cwd) if cwd else "알 수 없음"
            send_slack(
                webhook_url,
                f"🔐 *권한 요청 대기 중*\n📋 {message}\n📁 프로젝트: `{project}`",
            )

    sys.exit(0)


if __name__ == "__main__":
    main()
