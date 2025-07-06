#!/usr/bin/env node
import { execSync } from 'child_process';
import path from 'path';
import fs from 'fs';
import { syncBuiltinESMExports } from 'module';

const originalConsole = {
  error: console.error.bind(console),
  warn: console.warn.bind(console),
  log: console.log.bind(console)
};

(async () => {

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
