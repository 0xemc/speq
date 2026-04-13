import { When } from "@cucumber/cucumber";
import { spawnSync } from "child_process";
import { CliWorld } from "../world";

When("I run {string}", function(this: CliWorld, command: string) {
  const result = spawnSync(command, {
    shell: true,
    cwd: this.tmpDir,
    encoding: "utf8",
    env: this.env,
  });
  this.result = {
    exitCode: result.status ?? 1,
    output: (result.stdout ?? "") + (result.stderr ?? ""),
  };
});

When("I run {string} with input {string}", function(this: CliWorld, command: string, input: string) {
  const result = spawnSync(command, {
    shell: true,
    cwd: this.tmpDir,
    encoding: "utf8",
    env: this.env,
    input,
  });
  this.result = {
    exitCode: result.status ?? 1,
    output: (result.stdout ?? "") + (result.stderr ?? ""),
  };
});
