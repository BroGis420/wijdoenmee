#!/usr/bin/env bash
# Git credential helper for Alloy sandboxes (GitHub App installation token via broker).
set -euo pipefail
action="${1:-}"
if [[ "$action" != "get" ]]; then
  exit 0
fi
protocol= host= path=
while IFS= read -r line; do
  [[ -z "$line" ]] && break
  case "$line" in
    protocol=*) protocol="${line#protocol=}" ;;
    host=*) host="${line#host=}" ;;
    path=*) path="${line#path=}" ;;
  esac
done
if [[ "$host" != "github.com" ]]; then
  exit 0
fi
if [[ -z "${GITHUB_BROKER_URL:-}" || -z "${GITHUB_BROKER_CREDENTIAL:-}" ]]; then
  exit 0
fi
token="$(curl -fsS -X POST "$GITHUB_BROKER_URL" \
  -H "Authorization: Bearer $GITHUB_BROKER_CREDENTIAL" \
  -H "Content-Type: application/json" \
  | python3 -c "import sys,json; d=json.load(sys.stdin); print(d.get('token') or d.get('access_token') or '')")"
if [[ -z "$token" ]]; then
  exit 0
fi
echo "protocol=${protocol}"
echo "host=${host}"
echo "username=x-access-token"
echo "password=${token}"
