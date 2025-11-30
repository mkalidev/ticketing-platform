const { exec } = require('child_process');
const path = require('path');

const PROJECT_ROOT = path.resolve(__dirname, '..');
const COMMIT_INTERVAL = 3000; // 3 seconds

let commitCount = 0;

function runGitCommand(command) {
  return new Promise((resolve, reject) => {
    exec(command, { cwd: PROJECT_ROOT }, (error, stdout, stderr) => {
      if (error && !stderr.includes('nothing to commit')) {
        reject(error);
        return;
      }
      resolve(stdout || stderr);
    });
  });
}

async function autoCommit() {
  try {
    // Check for changes
    const status = await runGitCommand('git status --porcelain');
    
    if (status.trim()) {
      commitCount++;
      const timestamp = new Date().toISOString();
      const message = `Auto-commit #${commitCount} - ${timestamp}`;
      
      // Stage all changes
      await runGitCommand('git add -A');
      
      // Commit with message
      await runGitCommand(`git commit -m "${message}"`);
      
      console.log(`✓ ${message}`);
    } else {
      console.log(`⏳ No changes detected at ${new Date().toLocaleTimeString()}`);
    }
  } catch (error) {
    console.error('Auto-commit error:', error.message);
  }
}

console.log('🚀 Auto-commit started! Committing every 3 seconds...');
console.log('Press Ctrl+C to stop.\n');

// Initial commit check
autoCommit();

// Set up interval
setInterval(autoCommit, COMMIT_INTERVAL);

