#!/usr/bin/env python3
"""Build Abel Solutions promotional MP4s with VO, instrumental bed, and burned-in subtitles."""

from __future__ import annotations

import asyncio
import subprocess
import textwrap
from pathlib import Path

import edge_tts

ROOT = Path("/workspace")
WORK = Path("/tmp/promo-video")
AUDIO = WORK / "audio"
SUBS = WORK / "subs"
OUT = ROOT / "public" / "marketing" / "videos"
FRAMES = WORK / "frames"

VOICE = "en-GB-RyanNeural"
W, H = 1080, 1920
FPS = 30


def run(cmd: list[str]) -> None:
    print("+", " ".join(cmd[:8]), "...")
    subprocess.run(cmd, check=True)


async def speak(text: str, dest: Path, rate: str = "-5%") -> None:
    communicate = edge_tts.Communicate(text, VOICE, rate=rate)
    await communicate.save(str(dest))


def make_instrumental(dest: Path, seconds: float) -> None:
    """Warm ambient pad — practical / premium feel, not EDM."""
    fade_out_start = max(seconds - 1.8, 0)
    run(
        [
            "ffmpeg",
            "-y",
            "-f",
            "lavfi",
            "-i",
            f"sine=frequency=110:duration={seconds}",
            "-f",
            "lavfi",
            "-i",
            f"sine=frequency=164.81:duration={seconds}",
            "-f",
            "lavfi",
            "-i",
            f"sine=frequency=220:duration={seconds}",
            "-f",
            "lavfi",
            "-i",
            f"sine=frequency=329.63:duration={seconds}",
            "-f",
            "lavfi",
            "-i",
            f"anoisesrc=color=pink:amplitude=0.02:duration={seconds}",
            "-filter_complex",
            (
                "[0:a][1:a][2:a][3:a][4:a]amix=inputs=5:normalize=0,"
                "lowpass=f=1800,highpass=f=80,"
                f"afade=t=in:st=0:d=1.2,afade=t=out:st={fade_out_start}:d=1.8,"
                "volume=0.22"
            ),
            "-ar",
            "44100",
            "-ac",
            "2",
            str(dest),
        ]
    )


def write_ass(path: Path, cues: list[tuple[float, float, str]]) -> None:
    header = textwrap.dedent(
        f"""\
        [Script Info]
        ScriptType: v4.00+
        PlayResX: {W}
        PlayResY: {H}
        WrapStyle: 0

        [V4+ Styles]
        Format: Name, Fontname, Fontsize, PrimaryColour, SecondaryColour, OutlineColour, BackColour, Bold, Italic, Underline, StrikeOut, ScaleX, ScaleY, Spacing, Angle, BorderStyle, Outline, Shadow, Alignment, MarginL, MarginR, MarginV, Encoding
        Style: Default,Arial,54,&H00FFFFFF,&H000000FF,&H00101010,&H80000000,-1,0,0,0,100,100,0,0,1,3,1,2,70,70,140,1

        [Events]
        Format: Layer, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text
        """
    )

    def ts(seconds: float) -> str:
        h = int(seconds // 3600)
        m = int((seconds % 3600) // 60)
        s = seconds % 60
        return f"{h}:{m:02d}:{s:05.2f}"

    lines = [header]
    for start, end, text in cues:
        safe = text.replace("\n", "\\N")
        lines.append(f"Dialogue: 0,{ts(start)},{ts(end)},Default,,0,0,0,,{safe}\n")
    path.write_text("".join(lines), encoding="utf-8")


def probe_duration(path: Path) -> float:
    out = subprocess.check_output(
        [
            "ffprobe",
            "-v",
            "error",
            "-show_entries",
            "format=duration",
            "-of",
            "default=noprint_wrappers=1:nokey=1",
            str(path),
        ],
        text=True,
    ).strip()
    return float(out)


def ken_burns_clip(image: Path, seconds: float, dest: Path, zoom_end: float = 1.12) -> None:
    frames = max(int(seconds * FPS), 1)
    # Centered gentle zoom for vertical reel canvas with cover crop
    vf = (
        f"scale={W}:{H}:force_original_aspect_ratio=increase,"
        f"crop={W}:{H},"
        f"zoompan=z='min(zoom+0.00035,{zoom_end})':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':d={frames}:s={W}x{H}:fps={FPS},"
        f"format=yuv420p"
    )
    run(
        [
            "ffmpeg",
            "-y",
            "-loop",
            "1",
            "-i",
            str(image),
            "-vf",
            vf,
            "-t",
            str(seconds),
            "-r",
            str(FPS),
            "-an",
            str(dest),
        ]
    )


def concat_videos(parts: list[Path], dest: Path) -> None:
    list_file = WORK / "concat.txt"
    list_file.write_text("".join(f"file '{p}'\n" for p in parts), encoding="utf-8")
    run(
        [
            "ffmpeg",
            "-y",
            "-f",
            "concat",
            "-safe",
            "0",
            "-i",
            str(list_file),
            "-c",
            "copy",
            str(dest),
        ]
    )


def mix_and_burn(
    video: Path,
    vo: Path,
    bed: Path,
    ass: Path,
    dest: Path,
) -> None:
    # Copy ASS beside workdir with a simple name for the ass filter
    local_ass = WORK / "burn.ass"
    local_ass.write_text(ass.read_text(encoding="utf-8"), encoding="utf-8")
    filter_complex = (
        "[1:a]loudnorm=I=-14:TP=-1.5:LRA=11,afade=t=in:st=0:d=0.12[vo];"
        "[2:a]volume=0.55,aloop=loop=-1:size=2e+09[musicloop];"
        "[musicloop][vo]amix=inputs=2:duration=first:dropout_transition=2,loudnorm=I=-16:TP=-1.5:LRA=11[mix];"
        f"[0:v]ass={local_ass}[v]"
    )
    run(
        [
            "ffmpeg",
            "-y",
            "-i",
            str(video),
            "-i",
            str(vo),
            "-i",
            str(bed),
            "-filter_complex",
            filter_complex,
            "-map",
            "[v]",
            "-map",
            "[mix]",
            "-c:v",
            "libx264",
            "-preset",
            "veryfast",
            "-crf",
            "20",
            "-c:a",
            "aac",
            "-b:a",
            "192k",
            "-shortest",
            "-movflags",
            "+faststart",
            str(dest),
        ]
    )


async def build_one(
    slug: str,
    images: list[tuple[Path, float]],
    script: str,
    cues: list[tuple[float, float, str]],
) -> Path:
    vo = AUDIO / f"{slug}-vo.mp3"
    bed = AUDIO / f"{slug}-bed.wav"
    ass = SUBS / f"{slug}.ass"
    silent = WORK / f"{slug}-silent.mp4"
    dest = OUT / f"{slug}.mp4"

    await speak(script, vo)
    vo_dur = probe_duration(vo)
    total = max(sum(sec for _, sec in images), vo_dur + 0.8)

    # Stretch last image if VO longer than planned visuals
    planned = sum(sec for _, sec in images)
    if total > planned:
        last_img, last_sec = images[-1]
        images = images[:-1] + [(last_img, last_sec + (total - planned))]

    make_instrumental(bed, total + 1.0)
    write_ass(ass, cues)

    parts: list[Path] = []
    for idx, (img, sec) in enumerate(images):
        part = WORK / f"{slug}-part-{idx}.mp4"
        ken_burns_clip(img, sec, part, zoom_end=1.08 + (idx % 3) * 0.02)
        parts.append(part)

    concat_videos(parts, silent)
    mix_and_burn(silent, vo, bed, ass, dest)
    print(f"Built {dest} ({probe_duration(dest):.1f}s)")
    return dest


async def main() -> None:
    for d in (AUDIO, SUBS, OUT, FRAMES):
        d.mkdir(parents=True, exist_ok=True)

    tech = FRAMES / "tech-services.jpg"
    construction = FRAMES / "construction-services.jpg"
    kweyol = FRAMES / "cover-kweyol-dictionary.jpg"
    dual = FRAMES / "cover-dual-services.jpg"
    quote = FRAMES / "story-request-quote.jpg"
    tower = FRAMES / "tower-looking-up.jpg"

    jobs = [
        (
            "01-tech-services",
            [(tech, 8.0), (dual, 7.0), (quote, 5.0)],
            (
                "Abel Solutions. Practical technology support for homes and businesses. "
                "Computer repairs, custom PC builds, and clear IT help across London and nearby areas. "
                "Request a quote today."
            ),
            [
                (0.2, 3.2, "Abel Solutions"),
                (3.3, 8.5, "Technology support\\Nfor homes & businesses"),
                (8.6, 14.5, "Repairs · Custom PCs · IT help"),
                (14.6, 19.5, "Request a quote today"),
            ],
        ),
        (
            "02-construction-services",
            [(construction, 8.0), (tower, 8.0), (quote, 5.0)],
            (
                "From media walls and TV mounting to practical site support, "
                "Abel Solutions brings careful construction help with clear scope and honest quotations. "
                "Serving London and surrounding areas."
            ),
            [
                (0.2, 3.5, "Construction support"),
                (3.6, 9.0, "Media walls · Mounting · Site help"),
                (9.1, 15.5, "Clear scope. Honest quotations."),
                (15.6, 20.5, "London & surrounding areas"),
            ],
        ),
        (
            "03-kweyol-dictionary",
            [(kweyol, 9.0), (dual, 7.0), (quote, 6.0)],
            (
                "Public project: the Kwéyòl Dictionary. "
                "A Dominican Kwéyòl to English learning site — learn, preserve, and celebrate. "
                "Built by Abel Solutions. Open it from our Projects page."
            ),
            [
                (0.2, 3.8, "Public project"),
                (3.9, 9.5, "Kwéyòl Dictionary"),
                (9.6, 15.0, "Learn · Preserve · Celebrate"),
                (15.1, 21.5, "Built by Abel Solutions"),
            ],
        ),
        (
            "04-dual-services",
            [(dual, 8.0), (tech, 5.0), (construction, 5.0), (quote, 5.0)],
            (
                "Technology and construction. One trusted company. "
                "Whether you need help with computers and networks, or media walls and site support, "
                "Abel Solutions keeps both under one clear point of contact."
            ),
            [
                (0.2, 4.0, "Tech + Construction"),
                (4.1, 9.0, "One trusted company"),
                (9.1, 15.5, "Computers · Networks · Media walls"),
                (15.6, 22.0, "One clear point of contact"),
            ],
        ),
        (
            "05-request-quote",
            [(quote, 8.0), (dual, 7.0)],
            (
                "Need help with technology or construction? "
                "Tell Abel Solutions what you need and get a clear initial response. "
                "Request a quote through the link in bio."
            ),
            [
                (0.2, 4.2, "Need help?"),
                (4.3, 9.0, "Tech or construction"),
                (9.1, 14.5, "Get a clear quote"),
            ],
        ),
    ]

    built: list[Path] = []
    for slug, images, script, cues in jobs:
        built.append(await build_one(slug, images, script, cues))

    readme = OUT / "README.md"
    readme.write_text(
        textwrap.dedent(
            """\
            # Promotional MP4s

            Vertical Reels / Stories / Snap-ready videos with:
            - British English voiceover (`en-GB-RyanNeural`)
            - Soft instrumental bed (original ambient pad)
            - Burned-in subtitles

            | File | Topic |
            | --- | --- |
            | `01-tech-services.mp4` | Technology services |
            | `02-construction-services.mp4` | Construction services |
            | `03-kweyol-dictionary.mp4` | Kwéyòl Dictionary public project |
            | `04-dual-services.mp4` | Dual-division brand |
            | `05-request-quote.mp4` | Quote CTA |

            Suggested post size: 1080×1920. Upload directly to Instagram Reels, Snapchat Spotlight/Stories, or TikTok.
            """
        ),
        encoding="utf-8",
    )
    print("Done:", ", ".join(p.name for p in built))


if __name__ == "__main__":
    asyncio.run(main())
