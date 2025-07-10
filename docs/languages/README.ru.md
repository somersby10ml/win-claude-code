# Claude Code для Windows

> **Без WSL. Без Docker. Только Windows.**

## 🌍 Выбор языка

[English](../../README.md) | [한국어](README.ko.md) | [中文](README.zh.md) | [日本語](README.ja.md) | [Русский](README.ru.md) | [Español](README.es.md) | [Français](README.fr.md) | [Deutsch](README.de.md)

[![npm version](https://img.shields.io/npm/v/win-claude-code.svg)](https://npmjs.com/package/win-claude-code)
[![npm downloads](https://img.shields.io/npm/dm/win-claude-code.svg)](https://npmjs.com/package/win-claude-code)

Claude Code встречает Windows. Больше никаких ошибок "WSL требуется", только чистая продуктивность.

![a.png](../../images/a.png)

## 🚀 Быстрый старт

```bash
# Глобальная установка Claude Code
npm install -g @anthropic-ai/claude-code --ignore-scripts

# Запуск
npx win-claude-code@latest
```

**Вот и всё.** 🎉

## ✨ Возможности

- **Обход проверки зависимостей bash** - больше никаких ошибок обнаружения терминала
- **Нулевая конфигурация** - работает из коробки
- **Тот же опыт Claude** - все функции сохранены
- **Поддержка Unix-команд** - автоматически включает `grep`, `find`, `awk`, `sed` и другие через Git Bash

## 🛠️ Unix-команды (опционально)

Хотите использовать Unix-команды? Установите **Git for Windows**, и win-claude-code автоматически их обнаружит:

1. Скачайте с [git-scm.com/download/win](https://git-scm.com/download/win)
2. Установите с настройками по умолчанию
3. Запустите `npx win-claude-code` - Unix-инструменты станут доступны автоматически!

Доступные команды: `grep`, `find`, `awk`, `sed`, `curl`, `wget`, `tar`, `ssh` и другие.

## 📋 Системные требования

- **Node.js** 22+
- **Windows** 10/11
- **Claude Code** (установлен глобально)
- **Git for Windows** (опционально - для Unix-команд)

## 🐛 Частые проблемы

```bash
# Claude Code не установлен глобально
"Claude Code package is not installed globally"
→ Выполните: npm install -g @anthropic-ai/claude-code --ignore-scripts

# Unix-команды не работают
"grep is not recognized as an internal or external command"
→ Установите Git for Windows: https://git-scm.com/download/win
```

Нашли баг? [Сообщите здесь](https://github.com/somersby10ml/win-claude-code/issues)

## 📜 Лицензия

MIT

---

**Создано для разработчиков, которые отказываются использовать WSL** 😎