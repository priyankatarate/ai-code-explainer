# AI-Powered JavaScript Code Explainer

A CLI tool that accepts JavaScript code and generates a plain-English explanation using an LLM.  
The tool uses AST parsing to ground explanations and reduce hallucinations.

---

## Features
- Accepts JavaScript files as input
- Parses code using Babel AST
- Generates a 2–4 sentence explanation using an LLM
- Detects functions, loops, and conditionals
- CLI-based, fast to run and easy to extend
- Designed to minimize hallucinations

---

## Tech Stack
- Node.js
- @babel/parser + @babel/traverse
- OpenAI API (pluggable with Claude / Mistral)
- dotenv

---

## Installation

```bash
git clone https://github.com/priyankatarate/ai-code-explainer.git
cd ai-code-explainer
npm install
