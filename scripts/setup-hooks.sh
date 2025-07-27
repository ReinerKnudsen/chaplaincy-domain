#!/bin/bash

echo "🔧 Setting up Git hooks..."

# Create hooks directory if it doesn't exist
mkdir -p .git/hooks

# Copy pre-commit hook
cp scripts/pre-commit .git/hooks/pre-commit
chmod +x .git/hooks/pre-commit

echo "✅ Pre-commit hook installed!"
echo "📝 This hook will ensure changelog.md is always updated before commits."
echo ""
echo "🚀 You're all set! The hook will run automatically on your next commit."
