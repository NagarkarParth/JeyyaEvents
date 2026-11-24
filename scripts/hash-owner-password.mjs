import { createInterface } from "node:readline/promises";
import { stdin, stdout } from "node:process";
import bcrypt from "bcryptjs";

const terminal = createInterface({ input: stdin, output: stdout });
const password = await terminal.question("Owner password (input is visible): ");
terminal.close();
if (password.length < 12) {
  console.error("Use at least 12 characters.");
  process.exit(1);
}
const hash = await bcrypt.hash(password, 12);
console.log(`OWNER_PASSWORD_HASH="${hash.replaceAll("$", "\\$")}"`);
