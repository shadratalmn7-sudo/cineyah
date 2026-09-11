#!/usr/bin/env python3
"""Translate a licensed English SRT to Arabic WebVTT with an Argos model.

The script preserves every cue boundary and timing value. It is intended for
works whose licence explicitly permits derivatives; it does not fetch subtitle
files or grant permission to translate them.
"""

from __future__ import annotations

import argparse
import re
from pathlib import Path

import ctranslate2
import sentencepiece as spm


BLOCK = re.compile(
    r"(?ms)^\s*(\d+)\s*\n"
    r"(\d{2}:\d{2}:\d{2}[,.]\d{3}\s+-->\s+\d{2}:\d{2}:\d{2}[,.]\d{3})\s*\n"
    r"(.*?)(?=\n\s*\n|\Z)"
)


def parse_srt(text: str) -> list[tuple[str, str, str]]:
    cues = [(number, timing.replace(",", "."), body.strip()) for number, timing, body in BLOCK.findall(text)]
    if not cues:
        raise ValueError("No SRT cues found")
    return cues


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("input", type=Path)
    parser.add_argument("output", type=Path)
    parser.add_argument("--model", type=Path, required=True)
    parser.add_argument("--batch-size", type=int, default=32)
    args = parser.parse_args()

    cues = parse_srt(args.input.read_text(encoding="utf-8-sig"))
    processor = spm.SentencePieceProcessor(model_file=str(args.model / "sentencepiece.model"))
    translator = ctranslate2.Translator(str(args.model / "model"), device="cpu")
    texts = [re.sub(r"\s+", " ", cue[2]).strip() for cue in cues]
    translated: list[str] = []

    for start in range(0, len(texts), args.batch_size):
        batch = texts[start : start + args.batch_size]
        tokens = [processor.encode(text, out_type=str) for text in batch]
        results = translator.translate_batch(tokens, beam_size=4, max_decoding_length=256)
        translated.extend(processor.decode(result.hypotheses[0]).strip() for result in results)

    if len(translated) != len(cues):
        raise RuntimeError("Translation changed the cue count")

    lines = [
        "WEBVTT",
        "",
        "NOTE Cineyah Arabic translation of the official English Valkaama subtitles.",
        "NOTE Valkaama and this adaptation are licensed CC BY-SA 4.0; attribution: Tim Baumann and Valkaama contributors.",
        "",
    ]
    for (number, timing, _), arabic in zip(cues, translated, strict=True):
        lines.extend((number, timing, arabic, ""))

    args.output.parent.mkdir(parents=True, exist_ok=True)
    args.output.write_text("\n".join(lines), encoding="utf-8")
    print(f"wrote {len(cues)} cues to {args.output}")


if __name__ == "__main__":
    main()
