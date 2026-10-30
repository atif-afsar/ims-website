"""
Pick the photos to publish from the old website download (Images/old-site/).

Burst shots are common in those albums, so near-identical photos (small
perceptual-hash distance) are collapsed to the largest one. Writes
scripts/old-site.json, which media.config.js reads.

  python scripts/dedupe-old-site.py
"""
import json
from pathlib import Path
from PIL import Image, ImageOps

FRONTEND = Path(__file__).resolve().parent.parent
SRC = FRONTEND.parent / "Images" / "old-site"
OUT = FRONTEND / "scripts" / "old-site.json"

# Images that are not school photos (stock art, text documents, posters)
SKIP = {"events-image.jpg", "IIT-student-speach.jpg", "sibration-image.jpg", "summar-camp-1.jpg",
        "image-for-creative-writing-comp-2025-26.jpg", "neet1-attempt.jpg"}
THRESHOLD = 10  # max differing bits (of 64) to count as the same shot
# Folders placed by hand in media.config.js (NEET cards share one layout, so they hash alike)
MANUAL = {"neet-achievers", "newsletter", "campus-misc"}


def dhash(path, size=8):
    im = ImageOps.exif_transpose(Image.open(path)).convert("L").resize((size + 1, size), Image.LANCZOS)
    px = list(im.getdata())
    bits = 0
    for row in range(size):
        for col in range(size):
            bits = (bits << 1) | (px[row * (size + 1) + col] > px[row * (size + 1) + col + 1])
    return bits


def main():
    result = {}
    for group in sorted(p for p in SRC.iterdir() if p.is_dir() and p.name not in MANUAL):
        files = sorted(f for f in group.iterdir() if f.suffix.lower() in {".jpg", ".jpeg", ".png"} and f.name not in SKIP)
        # Largest first, so the sharpest copy of each shot is the one kept
        files.sort(key=lambda f: -f.stat().st_size)
        kept = []
        for f in files:
            h = dhash(f)
            if all(bin(h ^ k).count("1") > THRESHOLD for k, _ in kept):
                kept.append((h, f))
        names = sorted(f.name for _, f in kept)
        result[group.name] = names
        print(f"{group.name:24s} {len(files):3d} -> {len(names):3d}")
    OUT.write_text(json.dumps(result, indent=1), encoding="utf-8")
    print("total", sum(len(v) for v in result.values()))


if __name__ == "__main__":
    main()
