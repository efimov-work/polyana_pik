#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/.."

REMOTE="$(git remote get-url origin)"
SLUG="$(printf '%s' "$REMOTE" | sed -E 's#^.*github\.com[:/]+##; s#^[0-9]+/##; s#\.git$##')"
OWNER="${PAGES_OWNER:-${SLUG%%/*}}"
REPO="${SLUG##*/}"
BASE="/$REPO"
ORIGIN="https://$(printf '%s' "$OWNER" | tr '[:upper:]' '[:lower:]').github.io"
REV="$(git rev-parse --short HEAD)"

TMP="$(mktemp -d)"
trap 'rm -rf "$TMP"' EXIT

rsync -a --exclude node_modules --exclude .next --exclude out --exclude .git --exclude .env --exclude src/app/api ./ "$TMP/app/"
cp -r node_modules "$TMP/app/node_modules"

(
  cd "$TMP/app"
  STATIC_EXPORT=1 SITE_NOINDEX=1 NEXT_PUBLIC_BASE_PATH="$BASE" NEXT_PUBLIC_SITE_URL="$ORIGIN" \
    NEXT_PUBLIC_YM_ID= YANDEX_VERIFICATION= GOOGLE_SITE_VERIFICATION= NEXT_TELEMETRY_DISABLED=1 \
    npx next build
)

OUT="$TMP/app/out"
touch "$OUT/.nojekyll"

git -C "$OUT" init -q -b gh-pages
git -C "$OUT" add -A
git -C "$OUT" -c user.name="$(git config user.name)" -c user.email="$(git config user.email)" commit -q -m "Статическая сборка для GitHub Pages ($REV)"
git -C "$OUT" push -q -f "$REMOTE" gh-pages

echo "Опубликовано: $ORIGIN$BASE/"
