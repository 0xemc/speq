import fs from "fs";
import path from "path";
import prompts from "prompts";
import { PRIMITIVES, ALL_PRIMITIVES, fetchFile, destPath } from "../registry";

const CONFIG_FILE = "speq.json";

interface SpeqConfig {
  supportDir: string;
}

export async function add(targets: string[], opts: { yes?: boolean }): Promise<void> {
  const cwd = process.cwd();

  // ── Load config ────────────────────────────────────────────────────────────

  const configPath = path.join(cwd, CONFIG_FILE);
  if (!fs.existsSync(configPath)) {
    console.error("✗  speq.json not found — run `speq init` first");
    process.exit(1);
  }

  const config = JSON.parse(fs.readFileSync(configPath, "utf8")) as SpeqConfig;
  const targetDir = path.join(cwd, config.supportDir);

  // ── Resolve targets ────────────────────────────────────────────────────────

  const validTargets = ALL_PRIMITIVES.filter((p) => p !== "core");

  let selected: string[] =
    targets.length === 0
      ? opts.yes
        ? validTargets
        : (
            await prompts(
              {
                type: "multiselect",
                name: "primitives",
                message: "Which primitives would you like to add or update?",
                choices: validTargets.map((p) => ({ title: p, value: p })),
              },
              { onCancel: () => process.exit(0) }
            )
          ).primitives
      : targets;

  const unknown = selected.filter((t) => !PRIMITIVES[t]);
  if (unknown.length) {
    console.error(`✗  Unknown primitives: ${unknown.join(", ")}`);
    console.error(`   Available: ${validTargets.join(", ")}`);
    process.exit(1);
  }

  // ── Confirm overwrite ──────────────────────────────────────────────────────

  if (!opts.yes) {
    const { confirmed } = await prompts(
      {
        type: "confirm",
        name: "confirmed",
        message: `Update ${selected.join(", ")} in ${config.supportDir}?`,
        initial: true,
      },
      { onCancel: () => process.exit(0) }
    );
    if (!confirmed) process.exit(0);
  }

  // ── Fetch & write ──────────────────────────────────────────────────────────

  console.log("");

  const files = selected.flatMap((p) => PRIMITIVES[p]);

  for (const repoPath of files) {
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

  console.log("\nDone.\n");
}
