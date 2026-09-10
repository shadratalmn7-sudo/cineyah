#!/usr/bin/env python3
"""Review Ulises Internet Archive renditions without changing the public catalog.

HTTP/codec checks are useful screening signals only. They must never be treated as
proof of iPhone/Safari playback. Cineyah keeps Ulises sources=[] until a real
Safari/iPhone playback test succeeds.
"""
from __future__ import annotations

import json
import pathlib
import subprocess
import urllib.parse
import urllib.request

ID = "ulises-largometraje-abel-amador-2012"
ROOT = pathlib.Path(__file__).resolve().parents[1]
OUT = ROOT / "content" / "ulises-playback-review.json"
UA = "Mozilla/5.0 CineyahSourceReview/2.0"
MIN_RUNTIME_SECONDS = 90 * 60


def as_float(value):
    try:
        return float(value or 0)
    except Exception:
        return 0.0


def get_json(url: str):
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    with urllib.request.urlopen(req, timeout=30) as response:
        return json.load(response)


def probe(url: str):
    proc = subprocess.run(
        [
            "ffprobe", "-v", "error", "-rw_timeout", "20000000",
            "-show_entries", "format=duration,format_name:stream=codec_name,codec_type,height,width,profile",
            "-of", "json", url,
        ],
        capture_output=True,
        text=True,
        timeout=45,
    )
    if proc.returncode:
        return {"ok": False, "error": (proc.stderr or "ffprobe failed")[-800:]}
    data = json.loads(proc.stdout or "{}")
    streams = data.get("streams", [])
    video = next((item for item in streams if item.get("codec_type") == "video"), {})
    audio = next((item for item in streams if item.get("codec_type") == "audio"), {})
    return {
        "ok": bool(video),
        "container": (data.get("format") or {}).get("format_name"),
        "durationSeconds": as_float((data.get("format") or {}).get("duration")),
        "videoCodec": video.get("codec_name"),
        "videoProfile": video.get("profile"),
        "width": int(video.get("width") or 0),
        "height": int(video.get("height") or 0),
        "audioCodec": audio.get("codec_name") if audio else None,
    }


def range_test(url: str):
    req = urllib.request.Request(
        url,
        headers={"User-Agent": UA, "Range": "bytes=0-1048575", "Accept": "*/*"},
    )
    try:
        with urllib.request.urlopen(req, timeout=30) as response:
            response.read(128 * 1024)
            return {
                "ok": getattr(response, "status", None) in {200, 206},
                "status": getattr(response, "status", None),
                "contentType": response.headers.get("Content-Type", ""),
                "acceptRanges": response.headers.get("Accept-Ranges", ""),
                "contentRange": response.headers.get("Content-Range", ""),
                "finalUrl": response.geturl(),
            }
    except Exception as exc:
        return {"ok": False, "error": str(exc)[:800]}


metadata = get_json(f"https://archive.org/metadata/{ID}")
raw_candidates = []
for item in metadata.get("files", []):
    name = str(item.get("name", ""))
    if not name.lower().endswith(".mp4"):
        continue
    url = f"https://archive.org/download/{ID}/" + urllib.parse.quote(name, safe="/")
    raw_candidates.append(
        {
            "name": name,
            "url": url,
            "sizeBytes": int(as_float(item.get("size"))),
            "archiveSourceType": item.get("source"),
            "archiveFormat": item.get("format"),
            "archiveLengthSeconds": as_float(item.get("length")),
        }
    )

reviewed = []
for candidate in raw_candidates:
    info = probe(candidate["url"])
    runtime = candidate["archiveLengthSeconds"] or info.get("durationSeconds", 0)
    http = range_test(candidate["url"])
    h264_aac = info.get("videoCodec") == "h264" and info.get("audioCodec") in {None, "aac", "mp3"}
    feature_length = runtime >= MIN_RUNTIME_SECONDS
    mobile_size_hint = 0 < candidate["sizeBytes"] <= 1_500_000_000
    reviewed.append(
        {
            **candidate,
            "runtimeMinutes": round(runtime / 60, 1) if runtime else None,
            "probe": info,
            "httpRange": http,
            "screening": {
                "featureLength": feature_length,
                "commonSafariCodecs": h264_aac,
                "mobileSizeHint": mobile_size_hint,
                "browserCandidate": bool(feature_length and h264_aac and http.get("ok")),
                "safariIPhoneVerified": False,
                "eligibleForAutoPublish": False,
            },
        }
    )

reviewed.sort(key=lambda item: (not item["screening"]["browserCandidate"], item["sizeBytes"] or 10**15))
smallest_screened = next((item for item in reviewed if item["screening"]["browserCandidate"]), None)

report = {
    "archiveIdentifier": ID,
    "sourcePage": f"https://archive.org/details/{ID}",
    "declaredLicense": metadata.get("metadata", {}).get("licenseurl"),
    "candidateCount": len(reviewed),
    "smallestScreenedCandidate": smallest_screened["name"] if smallest_screened else None,
    "smallestScreenedCandidateSizeBytes": smallest_screened["sizeBytes"] if smallest_screened else None,
    "safariIPhoneVerified": False,
    "publicPlaybackDecision": "disabled",
    "decisionReason": "No candidate may be published from automated HTTP/codec checks alone; a real iPhone/Safari playback test is required.",
    "candidates": reviewed,
}
OUT.parent.mkdir(exist_ok=True)
OUT.write_text(json.dumps(report, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
print(json.dumps({
    "candidateCount": report["candidateCount"],
    "smallestScreenedCandidate": report["smallestScreenedCandidate"],
    "smallestScreenedCandidateSizeBytes": report["smallestScreenedCandidateSizeBytes"],
    "safariIPhoneVerified": False,
    "publicPlaybackDecision": "disabled",
}, ensure_ascii=False, indent=2))
