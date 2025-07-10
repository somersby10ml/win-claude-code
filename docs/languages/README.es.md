# Claude Code para Windows

> **Sin WSL. Sin Docker. Solo Windows.**

## 🌍 Selección de idioma

[English](../../README.md) | [한국어](README.ko.md) | [中文](README.zh.md) | [日本語](README.ja.md) | [Русский](README.ru.md) | [Español](README.es.md) | [Français](README.fr.md) | [Deutsch](README.de.md)

[![npm version](https://img.shields.io/npm/v/win-claude-code.svg)](https://npmjs.com/package/win-claude-code)
[![npm downloads](https://img.shields.io/npm/dm/win-claude-code.svg)](https://npmjs.com/package/win-claude-code)

Claude Code se encuentra con Windows. No más errores de "WSL requerido", solo productividad pura.

![a.png](../../images/a.png)

## 🚀 Inicio rápido

```bash
# Instalar Claude Code globalmente
npm install -g @anthropic-ai/claude-code --ignore-scripts

# Ejecutar
npx win-claude-code@latest
```

**Eso es todo.** 🎉

## ✨ Características

- **Omite verificaciones de dependencias de bash** - No más fallos de detección de terminal
- **Configuración cero** - Funciona desde el primer momento
- **La misma experiencia Claude** - Todas las funciones intactas
- **Soporte de comandos Unix** - Habilita automáticamente `grep`, `find`, `awk`, `sed` y más con Git Bash

## 🛠️ Comandos Unix (opcional)

¿Quieres usar comandos Unix? Instala **Git for Windows** y win-claude-code los detectará automáticamente:

1. Descarga desde [git-scm.com/download/win](https://git-scm.com/download/win)
2. Instala con opciones predeterminadas
3. Ejecuta `npx win-claude-code` - ¡Las herramientas Unix estarán disponibles automáticamente!

Comandos disponibles: `grep`, `find`, `awk`, `sed`, `curl`, `wget`, `tar`, `ssh` y más.

## 📋 Requisitos del sistema

- **Node.js** 22+
- **Windows** 10/11
- **Claude Code** (instalado globalmente)
- **Git for Windows** (opcional - para comandos Unix)

## 🐛 Problemas comunes

```bash
# Claude Code no instalado globalmente
"Claude Code package is not installed globally"
→ Ejecutar: npm install -g @anthropic-ai/claude-code --ignore-scripts

# Los comandos Unix no funcionan
"grep is not recognized as an internal or external command"
→ Instalar Git for Windows: https://git-scm.com/download/win
```

¿Encontraste un error? [Repórtalo aquí](https://github.com/somersby10ml/win-claude-code/issues)

## 📜 Licencia

MIT

---

**Hecho para desarrolladores que se niegan a usar WSL** 😎