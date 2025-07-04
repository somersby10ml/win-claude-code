# Claude Code For Windows

> **No WSL. No Docker. Just Windows.**

Claude Code meets Windows. No more "WSL required" errors, just pure productivity.

## 🚀 Quick Start

**Step 1:** Install Claude Code globally with the magic flag
```bash
npm install -g @anthropic-ai/claude-code --ignore-scripts
```

**Step 2:** Run it anywhere, anytime
```bash
npx win-claude-code
```

**That's it.** 🎉

> ⚡ **Important**: Claude Code must be installed globally (`-g` flag) for this to work!

## ✨ What This Does

- **Bypasses bash dependency checks** - No more terminal detection fails
- **Zero configuration** - Works out of the box
- **Same Claude experience** - All features intact
- **Global package detection** - Automatically finds your Claude Code installation

## 🎯 Why You Need This

```bash
# Without win-claude-code ❌
claude
# Error: Please use WSL on Windows

# With win-claude-code ✅  
npx win-claude-code
# Claude Code is ready! 🤖
```

## 🔧 Installation Options

**One-time use** (Recommended)
```bash
npx win-claude-code
```

**Global install**
```bash
npm install -g win-claude-code
win-claude
```

## 🌟 Requirements

- **Node.js** 16+ 
- **Windows** 10/11
- **npm** (available in PATH)
- **Claude Code** (must be installed globally)

## 💡 Pro Tips

- **Global installation is required** - Claude Code must be installed with `-g` flag
- Use your favorite terminal - PowerShell, CMD, Windows Terminal
- If npm commands fail, restart your terminal after Node.js installation
- Works with all Claude Code features and commands

## ⚠️ Known Issues

Terminal interactions might feel slightly different in some edge cases. Report bugs with details and we'll fix them fast.

## 🐛 Issues?

**Common Error Messages:**

```bash
# Claude Code not installed globally
"Claude Code package is not installed globally"
→ Run: npm install -g @anthropic-ai/claude-code --ignore-scripts

# npm not found  
"npm command not found"
→ Add npm to your PATH or reinstall Node.js

# CLI script missing
"CLI script is not found"  
→ Reinstall Claude Code with --ignore-scripts flag
```

Found other bugs? [Drop it here](https://github.com/somersby10ml/win-claude-code/issues) with:
- Windows version
- Node.js version
- Terminal used  
- Complete error message

## 📜 License

MIT - Use it, share it, love it.

---

**Made for developers who refuse to use WSL** 😎