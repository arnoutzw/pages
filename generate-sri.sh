#!/usr/bin/env bash
# generate-sri.sh — Fetch CDN resources and compute SHA-384 SRI hashes.
# Run this locally (requires curl and openssl) then paste the hashes into index.html.
#
# Usage: ./generate-sri.sh

set -euo pipefail

URLS=(
  "https://unpkg.com/react@18.2.0/umd/react.production.min.js"
  "https://unpkg.com/react-dom@18.2.0/umd/react-dom.production.min.js"
  "https://unpkg.com/@babel/standalone@7.26.9/babel.min.js"
  "https://unpkg.com/lucide@0.344.0/dist/umd/lucide.min.js"
  "https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js"
  "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth-compat.js"
  "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore-compat.js"
  "https://cdn.jsdelivr.net/npm/marked@12.0.0/marked.min.js"
  "https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@11.9.0/build/highlight.min.js"
  "https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@11.9.0/build/styles/github-dark.min.css"
)

echo "Generating SRI hashes (sha384)..."
echo ""

for url in "${URLS[@]}"; do
  hash=$(curl -sL "$url" | openssl dgst -sha384 -binary | openssl base64 -A)
  echo "sha384-${hash}"
  echo "  ${url}"
  echo ""
done

echo "Add these as integrity=\"sha384-...\" attributes to the corresponding <script>/<link> tags in index.html."
echo "Note: gstatic.com (Firebase) may not serve CORS headers — SRI will only work if the browser receives Access-Control-Allow-Origin."
