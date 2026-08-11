#!/usr/bin/env python3
"""Generate warm British voiceovers + fun study/concentration instrumentals + captions."""

from __future__ import annotations

import asyncio
import json
import re
import subprocess
import wave
from pathlib import Path

import edge_tts
import numpy as np

ROOT = Path(__file__).resolve().parents[1]
MUSIC = ROOT / "audio" / "music"
VOICE = ROOT / "audio" / "voice"
SFX = ROOT / "audio" / "sfx"
SUBS = ROOT / "subtitles"

# Warm, friendly British neural voice (closest free/local "human" option)
VOICE_NAME = "en-GB-LibbyNeural"
VOICE_RATE = "-8%"
VOICE_PITCH = "-2Hz"
SAMPLE_RATE = 44100


SCRIPTS = {
    "hero": {
        "duration": 55,
        "text": (
            "Two trades. One clear point of contact. "
            "When technology fails, or a space needs practical construction help, "
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


def write_wav_stereo(path: Path, left: np.ndarray, right: np.ndarray | None = None) -> None:
    if right is None:
        right = left
    n = min(len(left), len(right))
    stereo = np.column_stack([left[:n], right[:n]])
    clipped = np.clip(stereo, -1.0, 1.0)
    pcm = (clipped * 32767.0).astype(np.int16)
    with wave.open(str(path), "wb") as wf:
        wf.setnchannels(2)
        wf.setsampwidth(2)
        wf.setframerate(SAMPLE_RATE)
        wf.writeframes(pcm.tobytes())


def env_exp(n: int, attack: float, release: float) -> np.ndarray:
    a = max(1, int(attack * SAMPLE_RATE))
    r = max(1, int(release * SAMPLE_RATE))
    env = np.ones(n, dtype=np.float64)
    if a < n:
        env[:a] = np.linspace(0, 1, a, endpoint=False)
    else:
        env[:] = np.linspace(0, 1, n, endpoint=False)
        return env
    if r < n:
        env[-r:] = np.linspace(1, 0, r)
    return env


def soft_kick(n: int) -> np.ndarray:
    t = np.arange(n) / SAMPLE_RATE
    freq = 140 * np.exp(-18 * t) + 45
    body = np.sin(2 * np.pi * freq * t) * env_exp(n, 0.002, n / SAMPLE_RATE * 0.9)
    click = np.sin(2 * np.pi * 1800 * t) * env_exp(n, 0.0005, 0.012) * 0.25
    return (body * 0.9 + click) * 0.55


def soft_snare(n: int) -> np.ndarray:
    t = np.arange(n) / SAMPLE_RATE
    noise = np.random.default_rng(7).normal(0, 1, n) * env_exp(n, 0.001, 0.12)
    tone = np.sin(2 * np.pi * 180 * t) * env_exp(n, 0.001, 0.08) * 0.35
    return (noise * 0.55 + tone) * 0.28


def soft_hat(n: int) -> np.ndarray:
    noise = np.random.default_rng(3).normal(0, 1, n)
    # crude highpass
    hat = np.diff(noise, prepend=noise[0])
    return hat * env_exp(n, 0.0005, 0.04) * 0.12


def chord_tone(freq: float, n: int, vibrato: float = 0.0) -> np.ndarray:
    t = np.arange(n) / SAMPLE_RATE
    phase = 2 * np.pi * freq * t
    if vibrato:
        phase += vibrato * np.sin(2 * np.pi * 4.5 * t)
    # soft triangle-ish / warm sine blend
    wave_ = 0.72 * np.sin(phase) + 0.22 * np.sin(2 * phase) + 0.06 * np.sin(3 * phase)
    return wave_


def make_study_bed(seconds: float, seed: int = 11) -> tuple[np.ndarray, np.ndarray]:
    """Fun learning / concentration lo-fi instrumental (original, licence-safe)."""
    rng = np.random.default_rng(seed)
    n = int(seconds * SAMPLE_RATE)
    bpm = 88.0
    beat = 60.0 / bpm
    left = np.zeros(n, dtype=np.float64)
    right = np.zeros(n, dtype=np.float64)

    # Warm educational progression (Cmaj7 – Am7 – Fmaj7 – G7), looping
    chords = [
        [130.81, 164.81, 196.00, 246.94],  # Cmaj7-ish
        [110.00, 164.81, 196.00, 261.63],  # Am7
        [174.61, 220.00, 261.63, 329.63],  # Fmaj7
        [196.00, 246.94, 293.66, 349.23],  # G7-ish
    ]
    bar = beat * 4
    chord_len = int(bar * SAMPLE_RATE)

    # Soft pad + gentle arpeggio
    pos = 0
    ci = 0
    while pos < n:
        end = min(n, pos + chord_len)
        length = end - pos
        pad = np.zeros(length)
        for i, f in enumerate(chords[ci % len(chords)]):
            tone = chord_tone(f, length, vibrato=0.4 + 0.1 * i)
            pad += tone * (0.18 if i < 2 else 0.12)
        pad *= env_exp(length, 0.08, 0.25)
        # light stereo spread
        left[pos:end] += pad * 0.85
        right[pos:end] += pad * 0.95
        # playful rising arpeggio notes within bar
        for step, f in enumerate(chords[ci % len(chords)]):
            start = pos + int(step * beat * SAMPLE_RATE * 0.5)
            note_n = int(0.28 * SAMPLE_RATE)
            if start + note_n > n:
                break
            pluck = chord_tone(f * 2, note_n) * env_exp(note_n, 0.005, 0.22) * 0.11
            left[start : start + note_n] += pluck * (0.9 if step % 2 == 0 else 0.7)
            right[start : start + note_n] += pluck * (0.7 if step % 2 == 0 else 0.95)
        pos = end
        ci += 1

    # Drum groove: kick on 1/3, snare on 2/4, hats on 8ths
    t = 0.0
    beat_i = 0
    while t < seconds:
        i = int(t * SAMPLE_RATE)
        if beat_i % 2 == 0:
            k = soft_kick(int(0.22 * SAMPLE_RATE))
            end = min(n, i + len(k))
            left[i:end] += k[: end - i]
            right[i:end] += k[: end - i] * 0.92
        else:
            s = soft_snare(int(0.16 * SAMPLE_RATE))
            end = min(n, i + len(s))
            left[i:end] += s[: end - i] * 0.9
            right[i:end] += s[: end - i]
        # hats
        for h in (0.0, 0.5):
            hi = int((t + h * beat) * SAMPLE_RATE)
            hat = soft_hat(int(0.05 * SAMPLE_RATE))
            end = min(n, hi + len(hat))
            if hi < n:
                pan = 0.7 + 0.2 * ((beat_i + int(h * 2)) % 2)
                left[hi:end] += hat[: end - hi] * (1.2 - pan)
                right[hi:end] += hat[: end - hi] * pan
        t += beat
        beat_i += 1

    # Soft vinyl / room noise for concentration warmth
    crackle = rng.normal(0, 1, n) * 0.008
    crackle = np.convolve(crackle, np.ones(32) / 32, mode="same")
    left += crackle
    right += crackle * 0.9

    # Learning-friendly soft lead motif (pentatonic-ish)
    motif = [392.00, 440.00, 523.25, 493.88, 440.00, 349.23, 392.00]
    motif_start = int(2.0 * SAMPLE_RATE)
    mi = 0
    while motif_start < n - SAMPLE_RATE:
        f = motif[mi % len(motif)]
        note_n = int(0.42 * SAMPLE_RATE)
        lead = chord_tone(f, note_n, vibrato=1.2) * env_exp(note_n, 0.02, 0.3) * 0.09
        end = min(n, motif_start + note_n)
        left[motif_start:end] += lead[: end - motif_start] * 0.85
        right[motif_start:end] += lead[: end - motif_start]
        motif_start += int(beat * 2 * SAMPLE_RATE)
        mi += 1

    # Fade in/out + gentle limiter
    fade_in = int(1.2 * SAMPLE_RATE)
    fade_out = int(2.0 * SAMPLE_RATE)
    left[:fade_in] *= np.linspace(0, 1, fade_in)
    right[:fade_in] *= np.linspace(0, 1, fade_in)
    left[-fade_out:] *= np.linspace(1, 0, fade_out)
    right[-fade_out:] *= np.linspace(1, 0, fade_out)

    peak = max(np.max(np.abs(left)), np.max(np.abs(right)), 1e-9)
    gain = 0.72 / peak
    return left * gain, right * gain


def make_music(dest: Path, seconds: float, seed: int = 11) -> None:
    left, right = make_study_bed(seconds, seed=seed)
    wav = dest.with_suffix(".wav.tmp")
    write_wav_stereo(wav, left, right)
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


def split_phrases(text: str) -> list[str]:
    parts = re.split(r"(?<=[.!?])\s+", text.strip())
    return [p.strip() for p in parts if p.strip()]


async def speak_phrase(text: str, dest: Path) -> None:
    communicate = edge_tts.Communicate(
        text,
        VOICE_NAME,
        rate=VOICE_RATE,
        pitch=VOICE_PITCH,
        volume="+2%",
    )
    await communicate.save(str(dest))


async def speak(text: str, dest: Path) -> None:
    """Sentence-paced VO for a warmer, more human delivery."""
    phrases = split_phrases(text)
    tmp_dir = dest.parent / f".vo_{dest.stem}"
    tmp_dir.mkdir(parents=True, exist_ok=True)
    parts: list[Path] = []
    try:
        for i, phrase in enumerate(phrases):
            part = tmp_dir / f"p{i:02d}.mp3"
            await speak_phrase(phrase, part)
            parts.append(part)
            # short breath gap between phrases
            silence = tmp_dir / f"s{i:02d}.wav"
            run(
                [
                    "ffmpeg",
                    "-y",
                    "-f",
                    "lavfi",
                    "-i",
                    "anullsrc=r=24000:cl=mono",
                    "-t",
                    "0.22" if i < len(phrases) - 1 else "0.05",
                    str(silence),
                ]
            )
            parts.append(silence)

        concat_list = tmp_dir / "list.txt"
        lines = []
        for p in parts:
            lines.append(f"file '{p.resolve()}'")
        concat_list.write_text("\n".join(lines) + "\n", encoding="utf-8")
        run(
            [
                "ffmpeg",
                "-y",
                "-f",
                "concat",
                "-safe",
                "0",
                "-i",
                str(concat_list),
                "-af",
                "highpass=f=80,lowpass=f=12000,acompressor=threshold=-18dB:ratio=2.5:attack=10:release=120,loudnorm=I=-14:TP=-1.5:LRA=9",
                "-ar",
                "48000",
                "-ac",
                "1",
                "-c:a",
                "libmp3lame",
                "-b:a",
                "192k",
                str(dest),
            ]
        )
    finally:
        for p in tmp_dir.glob("*"):
            p.unlink(missing_ok=True)
        tmp_dir.rmdir()


async def main() -> None:
    for d in (MUSIC, VOICE, SFX, SUBS):
        d.mkdir(parents=True, exist_ok=True)

    make_whoosh(SFX / "whoosh.wav")
    seeds = {
        "hero": 11,
        "short": 17,
        "social15": 23,
        "micro": 29,
        "explainer": 31,
        "features": 37,
        "brand": 41,
        "autoplay": 43,
    }

    for key, payload in SCRIPTS.items():
        print("Audio for", key)
        make_music(MUSIC / f"{key}.m4a", payload["duration"] + 1.5, seed=seeds.get(key, 11))
        await speak(payload["text"], VOICE / f"{key}.mp3")
        write_subs(key, payload["cues"])

    # silent autoplay has no VO — music only
    make_music(MUSIC / "autoplay.m4a", 21, seed=seeds["autoplay"])
    write_subs(
        "autoplay",
        [
            (0.2, 3.5, "Technology + Construction"),
            (4.0, 8.5, "Practical help. Clear scope."),
            (9.0, 13.5, "Open live examples today"),
            (14.0, 19.5, "Request a Quote"),
        ],
    )

    meta = {
        k: {
            "duration": v["duration"],
            "cues": v["cues"],
            "text": v["text"],
            "voice": VOICE_NAME,
            "music": "study-concentration-lofi",
        }
        for k, v in SCRIPTS.items()
    }
    (ROOT / "manifests" / "scripts.json").write_text(json.dumps(meta, indent=2), encoding="utf-8")
    print("Warm VO + study music + captions ready")


if __name__ == "__main__":
    asyncio.run(main())
