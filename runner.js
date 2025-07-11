#!/usr/bin/env node
import { execSync, spawn } from 'child_process';
import path from 'path';
import fs from 'fs';
import { syncBuiltinESMExports, createRequire } from 'module';
import os from 'os';

const originalConsole = {
  error: console.error.bind(console),
  warn: console.warn.bind(console),
  log: console.log.bind(console)
};

(async () => {

  let gitBashPath = null;
  async function main() {
    const npmGlobalRoot = await getNpmGlobalRoot();
    const claudePath = path.join(npmGlobalRoot, '@anthropic-ai', 'claude-code');
    const packageInstalled = fs.existsSync(path.join(claudePath, 'package.json'));
    if (!packageInstalled) {
      originalConsole.error('Claude Code package is not installed globally. Please run "npm install -g @anthropic-ai/claude-code --ignore-scripts"');
      return;
    }

    const cliPath = path.join(claudePath, 'cli.js');
    if (!fs.existsSync(cliPath)) {
      originalConsole.error('CLI script is not found. Please ensure it is installed correctly.');
      return;
    }

    gitBashPath = findGitBashPath();
    if (!gitBashPath) {
      originalConsole.warn('[win-claude-code] Git Bash not found - Unix commands (grep, find, awk, sed) will not be available');
      originalConsole.warn('[win-claude-code] To enable Unix commands, install Git for Windows: https://git-scm.com/download/win');
      originalConsole.warn('[win-claude-code] After installation, restart your terminal and run win-claude-code again');
    }

    hook();
    await import(`file://${cliPath}`).catch(err => {
      originalConsole.error('[win-claude-code] Error importing CLI script:', err);
    });
  }

  const hook = () => {

    // Shift + Tab Hook
    // plan mode or auto-accept mode
    const originalStdin = process.stdin;
    const fakeStdin = Object.create(originalStdin);
    fakeStdin.read = function (...args) {
      const result = originalStdin.read.apply(originalStdin, args);
      if (result && result.toString().includes('\x1b[[B')) {
        return Buffer.from('\x1b[Z');
      }
      return result;
    };

    Object.defineProperty(process, 'stdin', {
      value: fakeStdin,
      writable: false,
      configurable: false
    });

    const originalAccessSync = fs.accessSync;
    fs.accessSync = function (...args) {
      if (args.length >= 2 && typeof args[0] === 'string' && args[0].includes('/bin/bash') && args[1] === 1) {
        return true;
      }
      return originalAccessSync.apply(this, args);
    };

    const originalTmpdir = os.tmpdir;
    os.tmpdir = function () {
      const windowsTmpPath = originalTmpdir.call(this);
      const unixTmpPath = windowsToPosix(windowsTmpPath);
      return unixTmpPath;
    };

    // const originalLstat = fs.lstat;
    // fs.lstat = function (path, options, callback) {
    //   console.log('[lstat]', path);
    //   if (typeof options === 'function') {
    //     callback = options;
    //     options = {};
    //   }
    //   const posixPath = windowsToPosix(path);
    //   return originalLstat.call(this, posixPath, options, callback);
    // };

    // const originalLstatSync = fs.lstatSync;
    // fs.lstatSync = function (path, options) {
    //   console.log('[lstatSync]', path);
    //   const posixPath = windowsToPosix(path);
    //   return originalLstatSync.call(this, posixPath, options);
    // };

    // // realpath 후킹 - Windows 경로를 POSIX 경로로 변환 후 호출
    // const originalRealpath = fs.realpath;
    // fs.realpath = function (path, options, callback) {
    //   console.log('[realpath]', path);
    //   if (typeof options === 'function') {
    //     callback = options;
    //     options = {};
    //   }
    //   const posixPath = windowsToPosix(path);
    //   return originalRealpath.call(this, posixPath, options, callback);
    // };

    // const originalRealpathSync = fs.realpathSync;
    // fs.realpathSync = function (path, options) {
    //   console.log('[realpathSync]', path);
    //   const posixPath = windowsToPosix(path);
    //   return originalRealpathSync.call(this, posixPath, options);
    // };

    // const originalJoin = path.join;
    // path.join = function (...args) {
    //   console.log(args);
    //   const result = originalJoin.apply(this, args);
    //   return windowsToPosix(result);
    // };

    // const originalResolve = path.resolve;
    // path.resolve = function (...args) {
    //   console.log(args);
    //   const result = originalResolve.apply(this, args);
    //   return windowsToPosix(result);
    // };


    if (gitBashPath) {
      const originalSpawn = spawn;
      const spawnHook = function (command, args = [], options = {}) {
        try {
          if (command === '/bin/bash') {
            command = gitBashPath;
          }
          return originalSpawn.call(this, command, args, options);
        }
        catch (error) {
          originalConsole.error('[win-claude-code] spawn error:', error);
          throw error;
        }
      };
      // Replace spawn function
      try {
        // Replace spawn in CommonJS modules (using createRequire)
        const require = createRequire(import.meta.url);
        const childProcess = require('child_process');

        if (childProcess && childProcess.spawn) {
          childProcess.spawn = spawnHook;
        }

        // Also register spawn in global (so other code can use it)
        if (typeof global !== 'undefined') {
          global.spawn = spawnHook;
        }

      } catch (e) {
        originalConsole.warn('[win-claude-code] Could not hook spawn function:', e.message);
      }
    }

    // think about this...
    // process.env.SHELL = 'bash';

    // try {
    //   const require = createRequire(import.meta.url); // import createRequire from 'module'
    //   const nodeFs = require('fs');
    //   if (nodeFs && nodeFs.accessSync) {
    //     nodeFs.accessSync = function (...args) {
    //       return true;
    //     };
    //   }
    // } catch (e) {
    //   originalConsole.error('[win-cursor] Could not patch Node.js fs module');
    // }

    // try {
    //   Object.defineProperty(fs, 'accessSync', {
    //     value: function (...args) {
    //       return true;
    //     },
    //     writable: false,
    //     configurable: true
    //   });
    // } catch (e) {
    //   originalConsole.error('[win-cursor] Could not override fs.accessSync with defineProperty');
    // }

    try {
      syncBuiltinESMExports();
    } catch (e) {
      // Silently ignore sync errors - not critical for operation
    }

  }

  // Automatically add Git Bash path
  const findGitBashPath = () => {
    const possibleGitPaths = [
      `C:/Program Files/Git/usr/bin/bash.exe`,
      `C:/Program Files (x86)/Git/usr/bin/bash.exe`,
    ];

    for (const gitPath of possibleGitPaths) {
      if (fs.existsSync(gitPath)) {
        return gitPath;
      }
    }

    return false;
  };

  const windowsToPosix = (path) => {
    return path
      .replace(/\\/g, '/')           // \ → /
      .replace(/^([A-Z]):/i, '/$1')  // C: → /c
      .toLowerCase()                 // 소문자로
      .replace(/^\/[a-z]/, match => match.toLowerCase());
  }


  const getNpmGlobalRoot = () => {
    try {
      const result = execSync('npm root -g', {
        encoding: 'utf8',
        timeout: 10000 // 10 seconds timeout
      });

      const rootPath = result.trim();

      if (!rootPath) {
        throw new Error('npm root -g returned empty result');
      }

      return rootPath;
    } catch (error) {
      if (error.code === 'ENOENT') {
        throw new Error('npm command not found. Please ensure npm is installed and available in PATH');
      }

      if (error.signal === 'SIGTERM') {
        throw new Error('npm root -g command timed out');
      }

      throw new Error(`Failed to get npm global root: ${error.message}`);
    }
  }

  main().catch(err => {
    originalConsole.error('Error in main function:', err);
  });

})();
