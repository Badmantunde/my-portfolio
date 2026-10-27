#!/usr/bin/env bash
# Renders the blueprint hero film to an image sequence for heroMedia.source = { type: 'sequence', ... }
# (src/data/blueprint.ts). Only needed if scrubbing the MP4 proves unreliable on a target browser.
# Usage: scripts/build-blueprint-frames.sh [fps=12] [width=960]   (~160 frames, ~8 MB at the defaults)
set -euo pipefail
fps="${1:-12}"
width="${2:-960}"
src="public/video/hero-landscape.mp4"
out="public/video/blueprint-frames"
rm -rf "$out" && mkdir -p "$out"
ffmpeg -v error -i "$src" -vf "fps=${fps},scale=${width}:-2" -q:v 5 "$out/frame-%03d.jpg"
echo "$(ls "$out" | wc -l | tr -d ' ') frames written to $out (frame-001.jpg …)"
