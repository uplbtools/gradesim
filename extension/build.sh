#!/usr/bin/env bash
# Build browser-specific extension packages from shared source.
# Usage: ./build.sh [chrome|firefox|opera|edge|all]

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
SRC_DIR="$SCRIPT_DIR/src"
MANIFESTS_DIR="$SCRIPT_DIR/manifests"
ICONS_DIR="$SCRIPT_DIR/icons"
DIST_DIR="$SCRIPT_DIR/dist"

build_target() {
  local target="$1"
  local manifest="$MANIFESTS_DIR/manifest.${target}.json"

  if [ ! -f "$manifest" ]; then
    echo "⚠ No manifest found for '$target' at $manifest — skipping"
    return 1
  fi

  local out="$DIST_DIR/$target"
  rm -rf "$out"
  mkdir -p "$out"

  # Copy shared source
  cp "$SRC_DIR"/popup.js "$SRC_DIR"/popup.css "$SRC_DIR"/popup.html \
     "$SRC_DIR"/content.js "$SRC_DIR"/background.js \
     "$SRC_DIR"/curriculum.js "$out/"

  [ -f "$SRC_DIR/sims.png" ] && cp "$SRC_DIR/sims.png" "$out/"

  # Copy icons
  mkdir -p "$out/icons"
  cp "$ICONS_DIR"/* "$out/icons/"

  # Copy the target-specific manifest as manifest.json
  cp "$manifest" "$out/manifest.json"

  echo "✓ Built $target → $out"
}

targets="${1:-all}"

if [ "$targets" = "all" ]; then
  for manifest in "$MANIFESTS_DIR"/manifest.*.json; do
    name=$(basename "$manifest" .json | sed 's/manifest\.//')
    build_target "$name" || true
  done
else
  build_target "$targets"
fi

echo ""
echo "Done. Load the extension from dist/<browser>/ in developer mode."
