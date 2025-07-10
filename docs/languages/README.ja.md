# Windows用 Claude Code

> **WSL不要。Docker不要。純粋なWindows。**

## 🌍 言語選択

[English](../../README.md) | [한국어](README.ko.md) | [中文](README.zh.md) | [日本語](README.ja.md) | [Русский](README.ru.md) | [Español](README.es.md) | [Français](README.fr.md) | [Deutsch](README.de.md)

[![npm version](https://img.shields.io/npm/v/win-claude-code.svg)](https://npmjs.com/package/win-claude-code)
[![npm downloads](https://img.shields.io/npm/dm/win-claude-code.svg)](https://npmjs.com/package/win-claude-code)

Claude CodeがWindowsと出会いました。「WSLが必要です」エラーはもうありません。純粋な生産性だけが残りました。

![a.png](../../images/a.png)

## 🚀 クイックスタート

```bash
# Claude Codeをグローバルインストール
npm install -g @anthropic-ai/claude-code --ignore-scripts

# 実行
npx win-claude-code@latest
```

**以上です。** 🎉

## ✨ 機能

- **bash依存関係チェックをバイパス** - ターミナル検出失敗なし
- **設定不要** - すぐに動作
- **同じClaude体験** - 全機能そのまま
- **Unixコマンドサポート** - Git Bashで `grep`、`find`、`awk`、`sed` などを自動有効化

## 🛠️ Unixコマンド（オプション）

Unixコマンドを使いたいですか？**Git for Windows**をインストールすると、win-claude-codeが自動検出します：

1. [git-scm.com/download/win](https://git-scm.com/download/win)からダウンロード
2. デフォルトオプションでインストール
3. `npx win-claude-code`を実行 - Unixツールが自動的に利用可能になります！

利用可能コマンド：`grep`、`find`、`awk`、`sed`、`curl`、`wget`、`tar`、`ssh`など。

## 📋 システム要件

- **Node.js** 22+
- **Windows** 10/11
- **Claude Code**（グローバルインストール済み）
- **Git for Windows**（オプション - Unixコマンド用）

## 🐛 よくある問題

```bash
# Claude Codeがグローバルインストールされていない
"Claude Code package is not installed globally"
→ 実行: npm install -g @anthropic-ai/claude-code --ignore-scripts

# Unixコマンドが動作しない
"grep is not recognized as an internal or external command"
→ Git for Windowsをインストール: https://git-scm.com/download/win
```

バグを見つけましたか？[こちらで報告してください](https://github.com/somersby10ml/win-claude-code/issues)

## 📜 ライセンス

MIT

---

**WSLの使用を拒否する開発者のために作られました** 😎