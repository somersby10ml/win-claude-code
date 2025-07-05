#!/usr/bin/env node
import { execSync } from 'child_process';
import path from 'path';
import fs from 'fs';
import { syncBuiltinESMExports } from 'module';

(async () => {

    const originalConsoleLog = console.log;
    const originalConsoleError = console.error;

    async function main() {
        const npmGlobalRoot = await getNpmGlobalRoot();
        const claudePath = path.join(npmGlobalRoot, '@anthropic-ai', 'claude-code');
        const packageInstalled = fs.existsSync(path.join(claudePath, 'package.json'));
        if (!packageInstalled) {
            originalConsoleError('Claude Code package is not installed globally. Please run "npm install -g @anthropic-ai/claude-code --ignore-scripts"');
            return;
        }

        const cliPath = path.join(claudePath, 'cli.js');
        if (!fs.existsSync(cliPath)) {
            originalConsoleError('CLI script is not found. Please ensure it is installed correctly.');
            return;
        }

        hook();
        await import(`file://${cliPath}`).catch(err => {
            originalConsoleError('[win-cursor] Error importing CLI script:', err);
        });
    }

    const hook = () => {

        // Git Bash 경로 자동 추가
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
                        console.log(`[win-claude-code] ✅ Git Bash tools added to PATH: ${gitPath}`);
                    }
                    gitBashFound = true;
                    break;
                }
            }

            if (!gitBashFound) {
                console.log(`[win-claude-code] ⚠️  Git Bash not found - Unix commands (grep, find, awk, sed) will not be available`);
                console.log(`[win-claude-code] 📦 To enable Unix commands, install Git for Windows:`);
                console.log(`[win-claude-code] 🔗 https://git-scm.com/download/win`);
                console.log(`[win-claude-code] 💡 After installation, restart your terminal and run win-claude-code again`);
                console.log(`[win-claude-code] ℹ️  Claude Code will still work perfectly for basic operations!`);
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
        //   originalConsoleError('[win-cursor] Could not patch Node.js fs module');
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
        //   originalConsoleError('[win-cursor] Could not override fs.accessSync with defineProperty');
        // }

        try {
            syncBuiltinESMExports();
        } catch (e) {
            console.log('Could not sync builtin ESM exports', e);
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
        console.error('Error in main function:', err);
    });

})();
