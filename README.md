# Claude Code For Windows

> **No WSL. No Docker. Just Windows.**

Claude Code meets Windows. No more "WSL required" errors, just pure productivity.

![a.png](./images/a.png)


## 🚀 Quick Start

**Step 1:** Install Claude Code globally with the magic flag
```bash
npm install -g @anthropic-ai/claude-code --ignore-scripts
```

**Step 2:** Run it anywhere, anytime
```bash
npx win-claude-code@latest
```

**That's it.** 🎉

> ⚡ **Important**: Claude Code must be installed globally (`-g` flag) for this to work!

## ✨ What This Does

- **Bypasses bash dependency checks** - No more terminal detection fails
- **Zero configuration** - Works out of the box
- **Same Claude experience** - All features intact
- **Global package detection** - Automatically finds your Claude Code installation
- **🔥 NEW: Unix commands support** - Automatically enables `grep`, `find`, `awk`, `sed` and more!
- **Git Bash auto-detection** - Seamlessly integrates with Git for Windows

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

## 🛠️ Enhanced Unix Commands Support

**Want to use `grep`, `find`, `awk`, `sed` and other Unix commands with Claude Code?**

### 🎯 Install Git for Windows (Recommended)

1. **Download Git for Windows** from [git-scm.com/download/win](https://git-scm.com/download/win)
2. **Install with default options** (includes Git Bash with Unix tools)
3. **Run win-claude-code** - Unix commands will be automatically available!

```bash
# After installing Git for Windows
npx win-claude-code
# → Git Bash tools automatically detected and added to PATH
# → Now you can use grep, find, awk, sed, curl, wget, and more!
```

### 📦 What Unix Commands Are Available?

Once Git for Windows is installed, you'll have access to:
- `grep` - Search text patterns
- `find` - Locate files and directories  
- `awk` - Text processing and data extraction
- `sed` - Stream editor for filtering and transforming text
- `curl` - Transfer data from servers
- `wget` - Download files from web
- `tar` - Archive and compress files
- `ssh` - Secure shell access
- `cat`, `head`, `tail` - File content viewing
- `sort`, `uniq` - Sort and remove duplicates
- And many more!

### 🔍 Auto-Detection Process

win-claude-code automatically searches for Git Bash in these locations:
- `C:\Program Files\Git\usr\bin`
- `C:\Program Files (x86)\Git\usr\bin`
- `%ProgramFiles%\Git\usr\bin`
- `%ProgramFiles(x86)%\Git\usr\bin`

**No manual configuration needed!** 🎉

## 🌟 Requirements

### 💻 Essential Requirements
- **Node.js** 16+ 
- **Windows** 10/11
- **npm** (available in PATH)
- **Claude Code** (must be installed globally)

### 🔧 Recommended for Full Experience
- **Git for Windows** (for Unix commands like `grep`, `find`, `awk`, `sed`)
  - Download from [git-scm.com/download/win](https://git-scm.com/download/win)
  - Enables 90% of Linux command compatibility
  - Most Windows developers already have this installed!

## 💡 Pro Tips

### 🎯 Essential Tips
- **Global installation is required** - Claude Code must be installed with `-g` flag
- Use your favorite terminal - PowerShell, CMD, Windows Terminal
- If npm commands fail, restart your terminal after Node.js installation
- Works with all Claude Code features and commands

### 🛠️ Unix Commands Tips
- **Install Git for Windows first** for the best experience with Unix commands
- **No configuration needed** - win-claude-code automatically detects and adds Git Bash tools
- **Check installation**: Run `grep --version` after starting win-claude-code to verify Unix commands work
- **Performance**: Git Bash tools are slightly slower than native Windows tools but much more compatible

### 🔧 Troubleshooting
- **If Unix commands don't work**: Make sure Git for Windows is installed with default options
- **If Git Bash detection fails**: Check if `C:\Program Files\Git\usr\bin` exists
- **For advanced users**: You can manually add Git Bash to PATH before running win-claude-code

## ⚠️ Known Issues

### 🐛 General Issues
- Terminal interactions might feel slightly different in some edge cases
- Report bugs with details and we'll fix them fast

### 🛠️ Unix Commands Related
- **Performance**: Git Bash commands are ~10-20% slower than native Linux
- **Compatibility**: Some advanced Unix command options might not work exactly like Linux
- **Path separators**: Mixed Windows/Unix paths in some edge cases
- **Case sensitivity**: Windows filesystem limitations may affect some file operations

### 💡 Workarounds
- For performance-critical operations, consider using native Windows alternatives
- Use forward slashes `/` in paths for better compatibility
- Most common use cases (grep, find, awk, sed) work perfectly fine

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

# Unix commands not working
"grep is not recognized as an internal or external command"
→ Install Git for Windows: https://git-scm.com/download/win
→ Or manually add Git Bash to PATH

# Git Bash not detected
"Git Bash tools not found"
→ Install Git for Windows with default options
→ Check if C:\Program Files\Git\usr\bin exists
```

Found other bugs? [Drop it here](https://github.com/somersby10ml/win-claude-code/issues) with:
- Windows version
- Node.js version
- Terminal used  
- Complete error message

## 📜 License

MIT - Use it, share it, love it.

## 🙏 Credits

- **[Git for Windows](https://git-scm.com/download/win)** - For providing excellent Unix tools on Windows
- **[Anthropic](https://www.anthropic.com/)** - For creating Claude Code
- **Windows developers** - For inspiring this solution

---

**Made for developers who refuse to use WSL** 😎

**Enhanced with Unix commands support** 🛠️