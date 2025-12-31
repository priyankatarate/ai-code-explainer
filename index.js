import fs from "fs";
import { analyzeCode } from "./ast.js";
import { explainCode, optimizeCode } from "./llm.js";
import { printDiff } from "./diff.js";

async function main() {
  const filePath = process.argv[2];

  if (!filePath) {
    console.error("Usage: node index.js <file.js>");
    process.exit(1);
  }

  const code = fs.readFileSync(filePath, "utf-8");

  console.log("\n📥 Code received\n");

  const analysis = analyzeCode(code);

  console.log("🔍 Detected Structure:");
  console.log(analysis);

  console.log("\n🤖 Explanation:\n");
  const explanation = await explainCode(code, analysis);
  console.log(explanation);

  console.log("\n⚡ Generating optimized version...\n");
  const optimized = await optimizeCode(code);

  if (optimized === code) {
    console.log("✅ No meaningful optimization suggested.");
  } else {
    printDiff(code, optimized);
  }
}

main();
