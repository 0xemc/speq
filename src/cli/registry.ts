const REGISTRY_BASE = "https://raw.githubusercontent.com/0xemc/speq/main";

export const PRIMITIVES: Record<string, string[]> = {
  // browser (Cypress) adapter
  core: ["src/adapters/browser/parameter-types.ts", "src/adapters/browser/index.ts"],
  setup: ["src/adapters/browser/steps/setup.steps.ts"],
  interaction: ["src/adapters/browser/steps/interaction.steps.ts"],
  assertion: ["src/adapters/browser/steps/assertion.steps.ts"],
  state: ["src/adapters/browser/steps/state.steps.ts"],
  // cli adapter
  "cli-core": ["src/adapters/cli/world.ts", "src/adapters/cli/index.ts"],
  "cli-setup": ["src/adapters/cli/steps/setup.steps.ts"],
  "cli-interaction": ["src/adapters/cli/steps/interaction.steps.ts"],
  "cli-assertion": ["src/adapters/cli/steps/assertion.steps.ts"],
};

export const ALL_PRIMITIVES = [
  "core", "setup", "interaction", "assertion", "state",
  "cli-core", "cli-setup", "cli-interaction", "cli-assertion",
];

export async function fetchFile(repoPath: string): Promise<string> {
  const url = `${REGISTRY_BASE}/${repoPath}`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Failed to fetch ${url} (${res.status})`);
  }
  return res.text();
}

/** "src/steps/interaction.steps.ts" → "steps/interaction.steps.ts" */
export function destPath(repoPath: string): string {
  return repoPath.replace(/^src\//, "");
}
