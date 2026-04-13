import fs from "fs";
import path from "path";
import prompts from "prompts";
import { detectSupportFile, detectTypeScript, detectCypress, missingPeerDeps } from "../detect";
import { PRIMITIVES, ALL_PRIMITIVES, fetchFile, destPath } from "../registry";

const CONFIG_FILE = "speq.json";

export async function init(opts: { yes?: boolean; dir?: string }): Promise<void> {
  const cwd = process.cwd();

  console.log("\nInitialising speq...\n");

  // ── Pre-flight ─────────────────────────────────────────────────────────────

  if (!detectCypress(cwd)) {
    console.warn(
      "⚠  No cypress.config.ts / cypress.config.js found.\n" +
        "   Make sure you run this from your project root.\n"
    );
  }

  const hasTs = detectTypeScript(cwd);
  const supportFile = detectSupportFile(cwd);

  // ── Prompts ────────────────────────────────────────────────────────────────

  const answers = opts.yes
    ? { supportDir: opts.dir ?? "cypress/support/speq", typescript: hasTs }
    : await prompts(
        [
          {
            type: "text",
            name: "supportDir",
            message: "Where should speq be installed?",
            initial: opts.dir ?? "cypress/support/speq",
          },
          {
            type: "confirm",
            name: "typescript",
            message: "Using TypeScript?",
            initial: hasTs,
          },
        ],
        { onCancel: () => process.exit(0) }
      );

  const { supportDir, typescript } = answers as { supportDir: string; typescript: boolean };
  const targetDir = path.join(cwd, supportDir);

  // ── Fetch & write files ────────────────────────────────────────────────────

  console.log("\nFetching primitives from registry...\n");

  const allFiles = ALL_PRIMITIVES.flatMap((p) => PRIMITIVES[p]);

  for (const repoPath of allFiles) {
    const dest = path.join(targetDir, destPath(repoPath));
    fs.mkdirSync(path.dirname(dest), { recursive: true });

    process.stdout.write(`  · ${destPath(repoPath)}...`);
    try {
      const content = await fetchFile(repoPath);
      fs.writeFileSync(dest, content, "utf8");
      process.stdout.write(" ✓\n");
    } catch (err) {
      process.stdout.write(" ✗\n");
      console.error(`    ${(err as Error).message}`);
      process.exit(1);
    }
  }

  // ── Update Cypress support entry file ─────────────────────────────────────

  if (supportFile) {
    const supportPath = path.join(cwd, supportFile);
    const content = fs.readFileSync(supportPath, "utf8");

    const rel = path.relative(
      path.dirname(supportPath),
      path.join(targetDir, "index")
    );
    const importPath = rel.startsWith(".") ? rel : `./${rel}`;
    const importLine = `import '${importPath}';`;

    if (!content.includes(importLine) && !content.includes(`import "${importPath}"`)) {
      fs.appendFileSync(supportPath, `\n${importLine}\n`);
      console.log(`\n✓ Added import to ${supportFile}`);
    } else {
      console.log(`\n✓ ${supportFile} already imports speq`);
    }
  } else {
    const rel = path.relative(
      path.join(cwd, "cypress/support"),
      path.join(targetDir, "index")
    );
    console.log(
      `\n⚠  Could not detect support file — add this manually:\n` +
        `     import './${rel}';`
    );
  }

  // ── Write speq.json ────────────────────────────────────────────────────────

  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const pkg = require("../../package.json") as { version: string };
  const config = {
    version: pkg.version,
    supportDir,
    typescript,
    primitives: ALL_PRIMITIVES.filter((p) => p !== "core"),
  };

  fs.writeFileSync(
    path.join(cwd, CONFIG_FILE),
    JSON.stringify(config, null, 2) + "\n",
    "utf8"
  );
  console.log(`✓ Created ${CONFIG_FILE}`);

  // ── Peer dependency check ──────────────────────────────────────────────────

  const missing = missingPeerDeps(cwd);
  if (missing.length) {
    console.log("\n⚠  Missing peer dependencies:");
    console.log(`\n   npm install --save-dev \\\n     ${missing.join(" \\\n     ")}\n`);
  }

  // ── Next steps ─────────────────────────────────────────────────────────────

  console.log(`
─────────────────────────────────────────────────────
Add to cypress.config.ts:
─────────────────────────────────────────────────────
import createBundler from '@bahmutov/cypress-esbuild-preprocessor';
import { addCucumberPreprocessorPlugin } from '@badeball/cypress-cucumber-preprocessor';
import createEsbuildPlugin from '@badeball/cypress-cucumber-preprocessor/esbuild';

export default defineConfig({
  e2e: {
    async setupNodeEvents(on, config) {
      await addCucumberPreprocessorPlugin(on, config);
      on('file:preprocessor', createBundler({
        plugins: [createEsbuildPlugin(config)],
      }));
      return config;
    },
    specPattern: '**/*.feature',
  },
});
─────────────────────────────────────────────────────

Implement your state stubs in:
  ${supportDir}/steps/state.steps.ts
`);
}
