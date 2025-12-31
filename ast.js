import { parse } from "@babel/parser";
import traverseModule from "@babel/traverse";

const traverse = traverseModule.default;

export function analyzeCode(code) {
  const ast = parse(code, {
    sourceType: "module",
    plugins: ["jsx"]
  });

  const result = {
    functions: [],
    loops: 0,
    conditionals: 0
  };

  traverse(ast, {
    FunctionDeclaration(path) {
      result.functions.push(path.node.id.name);
    },
    ArrowFunctionExpression() {
      result.functions.push("anonymous arrow function");
    },
    ForStatement() {
      result.loops++;
    },
    WhileStatement() {
      result.loops++;
    },
    IfStatement() {
      result.conditionals++;
    }
  });

  return result;
}
