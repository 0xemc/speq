import { Given } from "@cucumber/cucumber";
import fs from "fs";
import path from "path";
import { CliWorld } from "../world";

Given("I am in a temporary directory", function(this: CliWorld) {
  this.createTmpDir();
});

Given("a file {string} exists with content {string}", function(this: CliWorld, filePath: string, content: string) {
  const dest = this.resolvePath(filePath);
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.writeFileSync(dest, content, "utf8");
});

Given("the environment variable {string} is {string}", function(this: CliWorld, key: string, value: string) {
  this.env = { ...this.env, [key]: value };
});
