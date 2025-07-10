# Claude Code For Windows

> **No WSL. No Docker. Just Windows.**

## 🌍 Languages / 언어 / 语言 / 言語 / Языки

[English](README.md) | [한국어](docs/languages/README.ko.md) | [中文](docs/languages/README.zh.md) | [日本語](docs/languages/README.ja.md) | [Русский](docs/languages/README.ru.md) | [Español](docs/languages/README.es.md) | [Français](docs/languages/README.fr.md) | [Deutsch](docs/languages/README.de.md)

[![npm version](https://img.shields.io/npm/v/win-claude-code.svg)](https://npmjs.com/package/win-claude-code)
[![npm downloads](https://img.shields.io/npm/dm/win-claude-code.svg)](https://npmjs.com/package/win-claude-code)

Claude Code meets Windows. No more "WSL required" errors, just pure productivity.

![a.png](./images/a.png)

## 🚀 Quick Start

```bash
# Install Claude Code globally
npm install -g @anthropic-ai/claude-code --ignore-scripts

# Run it
npx win-claude-code@latest
```

**That's it.** 🎉

## ✨ What This Does

- **Bypasses bash dependency checks** - No more terminal detection fails
- **Zero configuration** - Works out of the box
- **Same Claude experience** - All features intact
- **Unix commands support** - Automatically enables `grep`, `find`, `awk`, `sed` and more with Git Bash

## 🛠️ Unix Commands (Optional)

Want to use Unix commands? Install **Git for Windows** and win-claude-code will automatically detect it:

1. Download from [git-scm.com/download/win](https://git-scm.com/download/win)
2. Install with default options
3. Run `npx win-claude-code` - Unix tools are automatically available!

Available commands: `grep`, `find`, `awk`, `sed`, `curl`, `wget`, `tar`, `ssh`, and more.

## 📋 Requirements

- **Node.js** 22+
- **Windows** 10/11
- **Claude Code** (installed globally)
- **Git for Windows** (optional - for Unix commands)

## 🐛 Common Issues

```bash
# Claude Code not installed globally
"Claude Code package is not installed globally"
→ Run: npm install -g @anthropic-ai/claude-code --ignore-scripts

# Unix commands not working
"grep is not recognized as an internal or external command"
→ Install Git for Windows: https://git-scm.com/download/win
```

Found bugs? [Report here](https://github.com/somersby10ml/win-claude-code/issues)

## 📜 License

MIT

---

**Made for developers who refuse to use WSL** 😎