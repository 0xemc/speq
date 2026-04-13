#!/usr/bin/env node

import { Command } from "commander";
import { init } from "./commands/init";
import { add } from "./commands/add";

// eslint-disable-next-line @typescript-eslint/no-require-imports
const pkg = require("../../package.json") as { version: string };

const program = new Command();

program
  .name("speq")
  .description("Deterministic spec-driven primitives for Cypress + Cucumber")
  .version(pkg.version);

program
  .command("init")
  .description("Set up speq in a Cypress project")
  .option("-y, --yes", "skip prompts and use defaults")
  .option("--dir <dir>", "target support directory", "cypress/support/speq")
  .action(init);

program
  .command("add [primitives...]")
  .description("Add or update primitive sets: interaction, assertion, setup, state")
  .option("-y, --yes", "skip confirmation prompts")
  .action(add);

program.parse();
