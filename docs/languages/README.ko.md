# Windows용 Claude Code

> **WSL 없이. Docker 없이. 순수 Windows.**

## 🌍 언어 선택

[English](../../README.md) | [한국어](README.ko.md) | [中文](README.zh.md) | [日本語](README.ja.md) | [Русский](README.ru.md) | [Español](README.es.md) | [Français](README.fr.md) | [Deutsch](README.de.md)

[![npm version](https://img.shields.io/npm/v/win-claude-code.svg)](https://npmjs.com/package/win-claude-code)
[![npm downloads](https://img.shields.io/npm/dm/win-claude-code.svg)](https://npmjs.com/package/win-claude-code)

Claude Code가 Windows를 만났습니다. "WSL이 필요합니다" 오류는 이제 그만, 순수한 생산성만 남겼습니다.

![a.png](../../images/a.png)

## 🚀 빠른 시작

```bash
# Claude Code 전역 설치
npm install -g @anthropic-ai/claude-code --ignore-scripts

# 실행하기
npx win-claude-code@latest
```

**끝입니다.** 🎉

## ✨ 이 도구의 기능

- **bash 의존성 검사 우회** - 더 이상 터미널 감지 실패 없음
- **설정 불필요** - 바로 작동
- **동일한 Claude 경험** - 모든 기능 그대로
- **Unix 명령어 지원** - Git Bash와 함께 `grep`, `find`, `awk`, `sed` 등을 자동으로 활성화

## 🛠️ Unix 명령어 (선택사항)

Unix 명령어를 사용하고 싶으신가요? **Git for Windows**를 설치하면 win-claude-code가 자동으로 감지합니다:

1. [git-scm.com/download/win](https://git-scm.com/download/win)에서 다운로드
2. 기본 옵션으로 설치
3. `npx win-claude-code` 실행 - Unix 도구가 자동으로 사용 가능해집니다!

사용 가능한 명령어: `grep`, `find`, `awk`, `sed`, `curl`, `wget`, `tar`, `ssh` 등.

## 📋 요구사항

- **Node.js** 22+
- **Windows** 10/11
- **Claude Code** (전역 설치됨)
- **Git for Windows** (선택사항 - Unix 명령어용)

## 🐛 일반적인 문제들

```bash
# Claude Code가 전역으로 설치되지 않음
"Claude Code package is not installed globally"
→ 실행: npm install -g @anthropic-ai/claude-code --ignore-scripts

# Unix 명령어가 작동하지 않음
"grep is not recognized as an internal or external command"
→ Git for Windows 설치: https://git-scm.com/download/win
```

버그를 발견하셨나요? [여기에 신고해주세요](https://github.com/somersby10ml/win-claude-code/issues)

## 📜 라이센스

MIT

---

**WSL 사용을 거부하는 개발자들을 위해 만들어졌습니다** 😎