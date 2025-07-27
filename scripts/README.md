# Git Hooks

This directory contains Git hooks that help maintain code quality and consistency.

## Setup

To install the Git hooks, run:

```bash
./scripts/setup-hooks.sh
```

## Available Hooks

### Pre-commit Hook

**Purpose:** Ensures `changelog.md` is always updated before commits.

**What it does:**
- Checks if `changelog.md` is staged for commit
- If not, opens the changelog in Windsurf for editing
- Blocks the commit until changelog is updated and staged

**Usage:**
- Works with any Git interface (Windsurf, terminal, VS Code, etc.)
- Automatically runs before every commit
- Can be bypassed in emergencies with: `git commit --no-verify`

## Maintenance

- Hook source: `scripts/pre-commit`
- Installed location: `.git/hooks/pre-commit`
- To update: Modify `scripts/pre-commit` and run `./scripts/setup-hooks.sh` again
