import { Then } from "@cucumber/cucumber";
import assert from "assert";
import fs from "fs";
import { CliWorld } from "../world";

Then("the exit code should be {int}", function(this: CliWorld, code: number) {
  assert.equal(this.result.exitCode, code);
});

Then("the output should contain {string}", function(this: CliWorld, text: string) {
  assert.ok(
    this.result.output.includes(text),
    `Expected output to contain "${text}"\n\nActual output:\n${this.result.output}`
  );
});

Then("the output should not contain {string}", function(this: CliWorld, text: string) {
  assert.ok(
    !this.result.output.includes(text),
    `Expected output not to contain "${text}"\n\nActual output:\n${this.result.output}`
  );
});

Then("the output should match {string}", function(this: CliWorld, pattern: string) {
  assert.match(
    this.result.output,
    new RegExp(pattern),
    `Expected output to match /${pattern}/\n\nActual output:\n${this.result.output}`
  );
});

Then("the file {string} should exist", function(this: CliWorld, filePath: string) {
  assert.ok(
    fs.existsSync(this.resolvePath(filePath)),
    `Expected file to exist: ${filePath}`
  );
});

Then("the file {string} should not exist", function(this: CliWorld, filePath: string) {
  assert.ok(
    !fs.existsSync(this.resolvePath(filePath)),
    `Expected file not to exist: ${filePath}`
  );
});

Then("the file {string} should contain {string}", function(this: CliWorld, filePath: string, text: string) {
  const content = fs.readFileSync(this.resolvePath(filePath), "utf8");
  assert.ok(
    content.includes(text),
    `Expected file "${filePath}" to contain "${text}"\n\nActual content:\n${content}`
  );
});

Then("the file {string} should match {string}", function(this: CliWorld, filePath: string, pattern: string) {
  const content = fs.readFileSync(this.resolvePath(filePath), "utf8");
  assert.match(
    content,
    new RegExp(pattern),
    `Expected file "${filePath}" to match /${pattern}/\n\nActual content:\n${content}`
  );
});
