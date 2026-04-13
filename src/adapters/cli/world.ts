import { World, setWorldConstructor } from "@cucumber/cucumber";
import fs from "fs";
import os from "os";
import path from "path";

export interface SpawnResult {
  exitCode: number;
  output: string;
}

export class CliWorld extends World {
  tmpDir = "";
  result: SpawnResult = { exitCode: 0, output: "" };
  env: NodeJS.ProcessEnv = { ...process.env };

  resolvePath(filePath: string): string {
    return path.join(this.tmpDir, filePath);
  }

  createTmpDir(): void {
    this.tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "speq-"));
  }
}

setWorldConstructor(CliWorld);
