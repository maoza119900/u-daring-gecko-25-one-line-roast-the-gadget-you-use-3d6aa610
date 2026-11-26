/**
 * One-Line Roast: The Gadget You Use Every Day
 * (make.fun competition u-daring-gecko-25-one-line-roast-the-gadget-you-use-3d6aa610)
 *
 * Writes one original roast line to $MAKEFUN_OUTPUT_DIR/entry.txt
 * (default /output). Deterministic: no clock, no randomness, no network,
 * no file reads. The gate is self-checked before anything is written:
 * entry.txt must be UTF-8 text of 1 to 200 characters, not only whitespace.
 */

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY: string =
  "My robot vacuum has a perfect map of my house and still gets stuck on the same rug every day \u2014 a cartographer with amnesia.";

const MIN_CHARS = 1;
const MAX_CHARS = 200;

function checkGate(text: string): void {
  // Count characters as Unicode code points, matching the gate's
  // 1-to-200-character rule.
  const charCount: number = Array.from(text).length;
  if (charCount < MIN_CHARS || charCount > MAX_CHARS) {
    throw new Error(
      `Gate failed: entry is ${charCount} characters, must be ${MIN_CHARS}-${MAX_CHARS}.`,
    );
  }
  if (text.trim().length === 0) {
    throw new Error("Gate failed: entry must not be only whitespace.");
  }
  // Must be encodable as UTF-8 (a lone surrogate would fail here).
  new TextEncoder().encode(text);
}

function main(): void {
  checkGate(ENTRY);
  const outputDir: string = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  if (outputDir.trim().length === 0) {
    throw new Error("MAKEFUN_OUTPUT_DIR must not be empty.");
  }
  mkdirSync(outputDir, { recursive: true });
  writeFileSync(join(outputDir, "entry.txt"), ENTRY, "utf8");
}

main();
