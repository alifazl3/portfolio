#!/usr/bin/env bash
# Renders resume.html to public/Ali-Fazlollahi-Resume.pdf.
#
#   ./resume/build.sh
#
# Keep the output filename as it is: src/data/site.ts links to it from both
# the About button and the closing projects card, and the deployed site serves
# it at that exact path.
set -euo pipefail

here="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
root="$(dirname "$here")"
out="$root/public/Ali-Fazlollahi-Resume.pdf"

chrome="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
[ -x "$chrome" ] || { echo "Google Chrome not found at $chrome" >&2; exit 1; }

# A throwaway profile: Chrome refuses a second instance on the desktop profile,
# and this must not touch it anyway.
profile="$(mktemp -d)"

rm -f "$out"

# --headless=new writes the PDF and then often fails to exit, so run it in the
# background and stop it once the file has stopped growing.
"$chrome" \
  --headless=new \
  --disable-gpu \
  --no-pdf-header-footer \
  --user-data-dir="$profile" \
  --print-to-pdf="$out" \
  "file://$here/resume.html" >/dev/null 2>&1 &
pid=$!

size=-1
for _ in $(seq 1 60); do
  sleep 1
  [ -f "$out" ] || continue
  now=$(wc -c < "$out")
  [ "$now" -gt 0 ] && [ "$now" = "$size" ] && break
  size=$now
done

kill "$pid" 2>/dev/null || true
wait "$pid" 2>/dev/null || true
rm -rf "$profile" 2>/dev/null || true

[ -s "$out" ] || { echo "render produced nothing" >&2; exit 1; }

echo "wrote $out"
pdfinfo "$out" | grep -E "^(Pages|Page size)"
