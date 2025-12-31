import { diffLines } from "diff";

export function printDiff(original, optimized) {
  const diff = diffLines(original, optimized);

  console.log("\n🧾 Diff (Original → Optimized):\n");

  diff.forEach(part => {
    if (part.added) {
      console.log("\x1b[32m+ " + part.value + "\x1b[0m");
    } else if (part.removed) {
      console.log("\x1b[31m- " + part.value + "\x1b[0m");
    } else {
      console.log("  " + part.value);
    }
  });
}
