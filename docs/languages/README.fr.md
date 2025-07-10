# Claude Code pour Windows

> **Pas de WSL. Pas de Docker. Juste Windows.**

## 🌍 Sélection de langue

[English](../../README.md) | [한국어](README.ko.md) | [中文](README.zh.md) | [日本語](README.ja.md) | [Русский](README.ru.md) | [Español](README.es.md) | [Français](README.fr.md) | [Deutsch](README.de.md)

[![npm version](https://img.shields.io/npm/v/win-claude-code.svg)](https://npmjs.com/package/win-claude-code)
[![npm downloads](https://img.shields.io/npm/dm/win-claude-code.svg)](https://npmjs.com/package/win-claude-code)

Claude Code rencontre Windows. Plus d'erreurs "WSL requis", juste de la productivité pure.

![a.png](../../images/a.png)

## 🚀 Démarrage rapide

```bash
# Installer Claude Code globalement
npm install -g @anthropic-ai/claude-code --ignore-scripts

# Exécuter
npx win-claude-code@latest
```

**C'est tout.** 🎉

## ✨ Fonctionnalités

- **Contourne les vérifications de dépendances bash** - Plus d'échecs de détection de terminal
- **Configuration zéro** - Fonctionne immédiatement
- **Même expérience Claude** - Toutes les fonctionnalités intactes
- **Support des commandes Unix** - Active automatiquement `grep`, `find`, `awk`, `sed` et plus avec Git Bash

## 🛠️ Commandes Unix (optionnel)

Vous voulez utiliser les commandes Unix ? Installez **Git for Windows** et win-claude-code les détectera automatiquement :

1. Téléchargez depuis [git-scm.com/download/win](https://git-scm.com/download/win)
2. Installez avec les options par défaut
3. Exécutez `npx win-claude-code` - Les outils Unix seront automatiquement disponibles !

Commandes disponibles : `grep`, `find`, `awk`, `sed`, `curl`, `wget`, `tar`, `ssh` et plus.

## 📋 Configuration requise

- **Node.js** 22+
- **Windows** 10/11
- **Claude Code** (installé globalement)
- **Git for Windows** (optionnel - pour les commandes Unix)

## 🐛 Problèmes courants

```bash
# Claude Code pas installé globalement
"Claude Code package is not installed globally"
→ Exécuter : npm install -g @anthropic-ai/claude-code --ignore-scripts

# Les commandes Unix ne fonctionnent pas
"grep is not recognized as an internal or external command"
→ Installer Git for Windows : https://git-scm.com/download/win
```

Vous avez trouvé un bug ? [Signalez-le ici](https://github.com/somersby10ml/win-claude-code/issues)

## 📜 Licence

MIT

---

**Fait pour les développeurs qui refusent d'utiliser WSL** 😎