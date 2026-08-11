#!/usr/bin/env python3
"""Generate original instrumental beds + British English voiceovers + SRT/VTT."""

from __future__ import annotations

import asyncio
import json
import subprocess
from pathlib import Path

import edge_tts

ROOT = Path(__file__).resolve().parents[1]
MUSIC = ROOT / "audio" / "music"
VOICE = ROOT / "audio" / "voice"
SFX = ROOT / "audio" / "sfx"
SUBS = ROOT / "subtitles"
VOICE_NAME = "en-GB-SoniaNeural"


SCRIPTS = {
    "hero": {
        "duration": 55,
        "text": (
            "Two trades. One clear point of contact. "
            "When technology fails or a space needs practical construction help, "
            "most people end up juggling separate providers. "
            "Abel Solutions brings technology support and construction services together — "
            "with clear communication, careful workmanship, and honest quotations. "
            "Explore public digital projects you can open today, including the Kwéyòl Dictionary "
            "and Programming Foundations course. "
            "Then request a quote — and get a clear next step."
        ),
        "cues": [
            (0.2, 3.8, "Two trades. One clear point of contact."),
            (3.9, 10.5, "Stop juggling separate providers."),
            (10.6, 20.0, "Technology support and construction services — together."),
            (20.1, 28.5, "Clear communication. Careful work. Honest quotations."),
            (28.6, 38.0, "Public projects you can open today."),
            (38.1, 46.0, "Kwéyòl Dictionary · Programming Foundations"),
            (46.1, 54.0, "Request a quote — get a clear next step."),
        ],
    },
    "short": {
        "duration": 29,
        "text": (
            "Abel Solutions — technology and construction without the runaround. "
            "Repairs, custom PCs, media walls and site support for homes and businesses. "
            "See live public projects, then request a clear quote."
        ),
        "cues": [
            (0.2, 4.0, "Tech + construction, without the runaround."),
            (4.1, 12.0, "Repairs · Custom PCs · Media walls · Site support"),
            (12.1, 20.0, "Live public projects you can open today."),
            (20.1, 28.0, "Request a clear quote."),
        ],
    },
    "social15": {
        "duration": 15,
        "text": (
            "Stop juggling providers. "
            "Abel Solutions — technology and construction under one trusted company. "
            "Request a quote today."
        ),
        "cues": [
            (0.1, 2.8, "Stop juggling providers."),
            (2.9, 8.5, "Tech and construction. One company."),
            (8.6, 14.2, "Request a quote today."),
        ],
    },
    "micro": {
        "duration": 8.5,
        "text": "Abel Solutions. Technology and construction. Request a clear quote.",
        "cues": [
            (0.1, 2.2, "Abel Solutions"),
            (2.3, 5.2, "Technology + Construction"),
            (5.3, 8.0, "Request a clear quote"),
        ],
    },
    "explainer": {
        "duration": 72,
        "text": (
            "Abel Solutions Limited is a practical dual-trade company for homes and businesses "
            "across London and surrounding areas. "
            "Technology services cover computer repairs, upgrades, custom PC builds, networks "
            "and small-business IT support. "
            "Construction services include media walls, TV mounting, shelving, stud walls "
            "and labour support — assessed carefully for scope and safety. "
            "You can also review genuine public digital work, including the Kwéyòl Dictionary "
            "and Programming Foundations course. "
            "The process is straightforward: tell us what you need, receive an assessment, "
            "get a clear quotation, then arrange the work. "
            "We do not invent certifications, reviews or results. "
            "Request a quote on the website to get started."
        ),
        "cues": [
            (0.2, 6.0, "A practical dual-trade company."),
            (6.1, 16.0, "Technology: repairs, PCs, networks, business IT."),
            (16.1, 28.0, "Construction: media walls, mounting, fitting, labour."),
            (28.1, 40.0, "Public projects: Kwéyòl Dictionary · Programming Foundations."),
            (40.1, 52.0, "Tell us what you need → assessment → clear quotation."),
            (52.1, 62.0, "No invented certifications, reviews or results."),
            (62.1, 71.0, "Request a quote on the website."),
        ],
    },
    "features": {
        "duration": 46,
        "text": (
            "Here is what you can actually use today. "
            "Technology support with clear diagnosis before quoting. "
            "Custom PC builds scoped to budget and workload. "
            "Media walls and mounting planned around your room. "
            "And live digital projects — the Kwéyòl Dictionary and Programming Foundations — "
            "that show how Abel Solutions delivers. "
            "Discuss a similar brief by requesting a quote."
        ),
        "cues": [
            (0.2, 3.5, "What you can use today."),
            (3.6, 11.0, "Technology support with clear diagnosis."),
            (11.1, 18.5, "Custom PC builds, scoped carefully."),
            (18.6, 26.5, "Media walls and mounting, planned properly."),
            (26.6, 37.0, "Live digital projects you can open."),
            (37.1, 45.0, "Request a quote to discuss a similar brief."),
        ],
    },
    "brand": {
        "duration": 30,
        "text": (
            "Abel Solutions. "
            "Dependable technology. Careful construction. "
            "Public work you can open. "
            "Technology and construction solutions you can depend on."
        ),
        "cues": [
            (0.3, 3.5, "Abel Solutions"),
            (5.0, 10.0, "Dependable technology."),
            (11.0, 16.0, "Careful construction."),
            (17.0, 22.0, "Public work you can open."),
            (23.0, 29.0, "Solutions you can depend on."),
        ],
    },
}


def run(cmd: list[str]) -> None:
    subprocess.run(cmd, check=True)


def make_music(dest: Path, seconds: float, mood: str = "confident") -> None:
    """Original multi-layer instrumental (licence-safe, generated locally)."""
    # Slightly different voicing per mood
    freqs = {
        "confident": (98, 146.83, 196, 293.66, 392),
        "warm": (87.31, 130.81, 174.61, 261.63, 349.23),
        "cinematic": (73.42, 110, 164.81, 220, 329.63),
    }[mood if mood in ("confident", "warm", "cinematic") else "confident"]
    fade_out = max(seconds - 2.2, 0)
    inputs: list[str] = []
    for f in freqs:
        inputs += ["-f", "lavfi", "-i", f"sine=frequency={f}:duration={seconds}"]
    inputs += ["-f", "lavfi", "-i", f"anoisesrc=color=pink:amplitude=0.012:duration={seconds}"]
    # Soft pulse using tremolo on mixed pad
    filter_complex = (
        f"[0:a][1:a][2:a][3:a][4:a][5:a]amix=inputs=6:normalize=0,"
        f"lowpass=f=2400,highpass=f=70,"
        f"tremolo=f=0.18:d=0.22,"
        f"afade=t=in:st=0:d=1.4,afade=t=out:st={fade_out}:d=2.0,"
        f"volume=0.28"
    )
    wav = dest.with_suffix(".wav.tmp")
    run(
        [
            "ffmpeg",
            "-y",
            *inputs,
            "-filter_complex",
            filter_complex,
            "-ar",
            "48000",
            "-ac",
            "2",
            str(wav),
        ]
    )
    # Store compressed AAC for the repository / mixer
    out = dest if dest.suffix == ".m4a" else dest.with_suffix(".m4a")
    run(
        [
            "ffmpeg",
            "-y",
            "-i",
            str(wav),
            "-c:a",
            "aac",
            "-b:a",
            "192k",
            str(out),
        ]
    )
    wav.unlink(missing_ok=True)


def make_whoosh(dest: Path) -> None:
    run(
        [
            "ffmpeg",
            "-y",
            "-f",
            "lavfi",
            "-i",
            "anoisesrc=color=white:amplitude=0.2:duration=0.35",
            "-af",
            "highpass=f=800,lowpass=f=6000,afade=t=in:st=0:d=0.05,afade=t=out:st=0.15:d=0.2,volume=0.25",
            str(dest),
        ]
    )


def write_subs(stem: str, cues: list[tuple[float, float, str]]) -> None:
    def ts_srt(v: float) -> str:
        h = int(v // 3600)
        m = int((v % 3600) // 60)
        s = int(v % 60)
        ms = int(round((v - int(v)) * 1000))
        return f"{h:02d}:{m:02d}:{s:02d},{ms:03d}"

    def ts_vtt(v: float) -> str:
        return ts_srt(v).replace(",", ".")

    srt_lines = []
    vtt_lines = ["WEBVTT\n\n"]
    for i, (start, end, text) in enumerate(cues, 1):
        srt_lines.append(f"{i}\n{ts_srt(start)} --> {ts_srt(end)}\n{text}\n\n")
        vtt_lines.append(f"{ts_vtt(start)} --> {ts_vtt(end)}\n{text}\n\n")
    (SUBS / f"{stem}.srt").write_text("".join(srt_lines), encoding="utf-8")
    (SUBS / f"{stem}.vtt").write_text("".join(vtt_lines), encoding="utf-8")


async def speak(text: str, dest: Path) -> None:
    await edge_tts.Communicate(text, VOICE_NAME, rate="-4%").save(str(dest))


async def main() -> None:
    for d in (MUSIC, VOICE, SFX, SUBS):
        d.mkdir(parents=True, exist_ok=True)

    make_whoosh(SFX / "whoosh.wav")
    moods = {
        "hero": "cinematic",
        "short": "confident",
        "social15": "confident",
        "micro": "confident",
        "explainer": "warm",
        "features": "confident",
        "brand": "cinematic",
        "autoplay": "warm",
    }

    for key, payload in SCRIPTS.items():
        print("Audio for", key)
        make_music(MUSIC / f"{key}.m4a", payload["duration"] + 1.5, moods.get(key, "confident"))
        await speak(payload["text"], VOICE / f"{key}.mp3")
        write_subs(key, payload["cues"])

    # silent autoplay has no VO — music only
    make_music(MUSIC / "autoplay.m4a", 21, "warm")
    write_subs(
        "autoplay",
        [
            (0.2, 3.5, "Technology + Construction"),
            (4.0, 8.5, "Practical help. Clear scope."),
            (9.0, 13.5, "Open live examples today"),
            (14.0, 19.5, "Request a Quote"),
        ],
    )

    meta = {k: {"duration": v["duration"], "cues": v["cues"], "text": v["text"]} for k, v in SCRIPTS.items()}
    (ROOT / "manifests" / "scripts.json").write_text(json.dumps(meta, indent=2), encoding="utf-8")
    print("Audio + captions ready")


if __name__ == "__main__":
    asyncio.run(main())
