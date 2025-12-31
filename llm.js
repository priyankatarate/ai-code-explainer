import OpenAI from "openai";
import "dotenv/config";

if (!process.env.OPENAI_API_KEY?.startsWith("sk-")) {
  throw new Error("Invalid OpenAI API key");
}

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export async function explainCode(code, analysis) {
  const prompt = `
You are a JavaScript code explainer.

Rules:
- Explain ONLY what the code does
- Do NOT guess missing behavior
- 2–4 sentences only

Detected structure:
Functions: ${analysis.functions.join(", ") || "None"}
Loops: ${analysis.loops}
Conditionals: ${analysis.conditionals}

Code:
${code}
`;

  const res = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }],
    temperature: 0
  });

  return res.choices[0].message.content;
}

export async function optimizeCode(code) {
  const prompt = `
You are a senior JavaScript engineer.

Rules:
- Optimize for readability and performance
- DO NOT change behavior
- If no meaningful optimization exists, return the original code
- Return ONLY JavaScript code (no explanation)

Code:
${code}
`;

  const res = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }],
    temperature: 0
  });

  return res.choices[0].message.content.trim();
}
