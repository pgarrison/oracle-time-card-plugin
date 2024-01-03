#!/bin/sh

# Track how many downloads the extension gets.
# This github api returns the download count of the last 30 days, so it must be re-run regularly
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