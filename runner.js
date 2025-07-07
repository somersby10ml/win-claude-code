#!/usr/bin/env node
import { execSync, spawn } from 'child_process';
import path from 'path';
import fs from 'fs';
import { syncBuiltinESMExports, createRequire } from 'module';

(async () => {

  const originalConsole = {
    error: console.error.bind(console),
    warn: console.warn.bind(console),
    log: console.log.bind(console)
  };
  
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

    hook();
    await import(`file://${cliPath}`).catch(err => {
      originalConsole.error('[win-cursor] Error importing CLI script:', err);
    });
  }

  const hook = () => {

    // Automatically add Git Bash path
    const setupGitBashPath = () => {
      const possibleGitPaths = [
        'C:\\Program Files\\Git\\usr\\bin',
        'C:\\Program Files (x86)\\Git\\usr\\bin',
        process.env.ProgramFiles + '\\Git\\usr\\bin',
        process.env['ProgramFiles(x86)'] + '\\Git\\usr\\bin'
      ];

      let gitBashFound = false;

      for (const gitPath of possibleGitPaths) {
        if (fs.existsSync(gitPath)) {
          if (!process.env.PATH.includes(gitPath)) {
            process.env.PATH = `${gitPath};${process.env.PATH}`;
          }
          gitBashFound = true;
          break;
        }
      }

      if (!gitBashFound) {
        originalConsole.warn('[win-claude-code] Git Bash not found - Unix commands (grep, find, awk, sed) will not be available');
        originalConsole.warn('[win-claude-code] To enable Unix commands, install Git for Windows: https://git-scm.com/download/win');
        originalConsole.warn('[win-claude-code] After installation, restart your terminal and run win-claude-code again');
      }
    };

    setupGitBashPath();

    const originalAccessSync = fs.accessSync;
    fs.accessSync = function (...args) {
      if (args.length >= 2 && typeof args[0] === 'string' && args[0].includes('/bin/bash') && args[1] === 1) {
        return true;
      }
      return originalAccessSync.apply(this, args);
    };

    // Function to find Git Bash path
    const findGitBashPath = () => {
      const possibleBashPaths = [
        'C:\\Program Files\\Git\\bin\\bash.exe',
        'C:\\Program Files (x86)\\Git\\bin\\bash.exe',
        process.env.ProgramFiles + '\\Git\\bin\\bash.exe',
        process.env['ProgramFiles(x86)'] + '\\Git\\bin\\bash.exe',
        'C:\\Program Files\\Git\\usr\\bin\\bash.exe',
        'C:\\Program Files (x86)\\Git\\usr\\bin\\bash.exe',
        process.env.ProgramFiles + '\\Git\\usr\\bin\\bash.exe',
        process.env['ProgramFiles(x86)'] + '\\Git\\usr\\bin\\bash.exe'
      ];

      for (const bashPath of possibleBashPaths) {
        if (fs.existsSync(bashPath)) {
          return bashPath;
        }
      }
      return null;
    };

    // Hook spawn function to log parameters and convert Linux paths to Windows
    const originalSpawn = spawn;
    const gitBashPath = findGitBashPath();
    
    // Function to convert Windows paths to Git Bash compatible paths
    const convertWindowsPathToBash = (path) => {
      // C:\Users\... → /c/Users/...
      // D:\folder\... → /d/folder/...
      return path.replace(/^([A-Za-z]):\\/, '/$1/')
                 .replace(/\\/g, '/');
    };

    // Function to find and convert Windows paths in args array
    const convertArgsForBash = (args) => {
      if (!Array.isArray(args)) return args;
      
      return args.map(arg => {
        if (typeof arg !== 'string') return arg;
        
        // Detect Windows absolute path patterns (C:\, D:\, etc.)
        const windowsPathRegex = /([A-Za-z]):\\[\w\\\/\-\.]+/g;
        
        return arg.replace(windowsPathRegex, (match) => {
          const converted = convertWindowsPathToBash(match);
          originalConsole.log('  → path converted:', match, '→', converted);
          return converted;
        });
      });
    };

    const spawnHook = function(command, args = [], options = {}) {
      let modifiedCommand = command;
      let modifiedArgs = args;
      let wasModified = false;

      // Log parameters (original)
      originalConsole.log('[win-claude-code] spawn called:');
      originalConsole.log('  original command:', command);
      originalConsole.log('  original args:', Array.isArray(args) ? args : []);
      
      // Convert /bin/bash to Windows Git Bash path
      if (command === '/bin/bash' && gitBashPath) {
        modifiedCommand = gitBashPath;
        wasModified = true;
        originalConsole.log('  → converted /bin/bash to:', gitBashPath);
        
        // For bash commands, also convert Windows paths in args
        modifiedArgs = convertArgsForBash(args);
        if (JSON.stringify(modifiedArgs) !== JSON.stringify(args)) {
          wasModified = true;
        }
      }
      
      // If bash is included in command and it's not a Windows path
      if (command.includes('bash') && !command.includes('\\') && !command.includes('.exe') && gitBashPath) {
        modifiedCommand = gitBashPath;
        wasModified = true;
        originalConsole.log('  → converted bash command to:', gitBashPath);
        
        // For bash commands, also convert Windows paths in args
        modifiedArgs = convertArgsForBash(args);
        if (JSON.stringify(modifiedArgs) !== JSON.stringify(args)) {
          wasModified = true;
        }
      }

      // Handle other Linux commands as well (if needed)
      const linuxToWindowsCommands = {
        '/bin/sh': gitBashPath,
        'sh': gitBashPath,
        '/usr/bin/bash': gitBashPath
      };

      if (linuxToWindowsCommands[command] && gitBashPath) {
        modifiedCommand = linuxToWindowsCommands[command];
        wasModified = true;
        originalConsole.log('  → converted', command, 'to:', modifiedCommand);
        
        // For shell commands, also convert Windows paths in args
        modifiedArgs = convertArgsForBash(args);
        if (JSON.stringify(modifiedArgs) !== JSON.stringify(args)) {
          wasModified = true;
        }
      }

      if (wasModified) {
        originalConsole.log('  modified command:', modifiedCommand);
        originalConsole.log('  modified args:', modifiedArgs);
      }
      
      originalConsole.log('  options:', typeof options === 'object' ? options : {});
      
      // Call original spawn function with modified command
      return originalSpawn.call(this, modifiedCommand, modifiedArgs, options);
    };

    // Replace spawn function
    try {
      // Replace spawn in CommonJS modules (using createRequire)
      const require = createRequire(import.meta.url);
      const childProcess = require('child_process');
      
      if (childProcess && childProcess.spawn) {
        childProcess.spawn = spawnHook;
        originalConsole.log('[win-claude-code] Successfully hooked child_process.spawn');
      }

      // Also register spawn in global (so other code can use it)
      if (typeof global !== 'undefined') {
        global.spawn = spawnHook;
      }
      
    } catch (e) {
      originalConsole.warn('[win-claude-code] Could not hook spawn function:', e.message);
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
