#!/bin/bash
# Ignore builds triggered by the gh-pages branch
if [[ "$VERCEL_GIT_COMMIT_REF" == "gh-pages" ]]; then
  echo "🛑 Skipping Vercel build for gh-pages branch"
  exit 0
else
  echo "✅ Proceeding with Vercel build for branch: $VERCEL_GIT_COMMIT_REF"
  exit 1
fi
