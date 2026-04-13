import fs from "fs";
import path from "path";

const SUPPORT_CANDIDATES = [
  "cypress/support/e2e.ts",
  "cypress/support/e2e.js",
  "cypress/support/index.ts",
  "cypress/support/index.js",
];

export function detectSupportFile(cwd: string): string | null {
  return SUPPORT_CANDIDATES.find((f) => fs.existsSync(path.join(cwd, f))) ?? null;
}

export function detectTypeScript(cwd: string): boolean {
  return fs.existsSync(path.join(cwd, "tsconfig.json"));
}

export function detectCypress(cwd: string): boolean {
  return (
    fs.existsSync(path.join(cwd, "cypress.config.ts")) ||
    fs.existsSync(path.join(cwd, "cypress.config.js"))
  );
}

export function missingPeerDeps(cwd: string): string[] {
  const pkgPath = path.join(cwd, "package.json");
  if (!fs.existsSync(pkgPath)) return [];
  const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf8")) as {
    dependencies?: Record<string, string>;
    devDependencies?: Record<string, string>;
  };
  const installed = { ...pkg.dependencies, ...pkg.devDependencies };
  return [
    "cypress",
    "@badeball/cypress-cucumber-preprocessor",
    "@bahmutov/cypress-esbuild-preprocessor",
    "@testing-library/cypress",
  ].filter((dep) => !installed[dep]);
}
