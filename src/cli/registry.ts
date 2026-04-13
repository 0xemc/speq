const REGISTRY_BASE = "https://raw.githubusercontent.com/0xemc/speq/main";

export const PRIMITIVES: Record<string, string[]> = {
  core: ["src/parameter-types.ts", "src/index.ts"],
  setup: ["src/steps/setup.steps.ts"],
  interaction: ["src/steps/interaction.steps.ts"],
  assertion: ["src/steps/assertion.steps.ts"],
  state: ["src/steps/state.steps.ts"],
};

export const ALL_PRIMITIVES = ["core", "setup", "interaction", "assertion", "state"];

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
