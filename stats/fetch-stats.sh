#!/bin/sh

# Track how many downloads the extension gets.
# The clones API only returns data for the last 14 days
# The releases API only return data for the last 30 days
# User must be authenticated to github to use gh api:
#   https://cli.github.com/manual/gh_api
datestr=$(date -u +%Y-%m-%dT%H:%M:%SZ)
gh api \
  -H "Accept: application/vnd.github+json" \
  -H "X-GitHub-Api-Version: 2022-11-28" \
  /repos/pgarrison/oracle-time-card-plugin/releases \
  | jq '.[].assets[]' \
  | jq --raw-output '[.download_count, .browser_download_url]|join(",")' \
  | sed "s/^/$datestr,/" \
  >> stats.log

gh api \
  -H "Accept: application/vnd.github+json" \
  -H "X-GitHub-Api-Version: 2022-11-28" \
  /repos/pgarrison/oracle-time-card-plugin/traffic/clones \
  | jq '.clones[]' \
  | jq --raw-output '[.timestamp,.uniques]|join(",")' \
  | sed "s/$/,clone/" \
  >> stats.log