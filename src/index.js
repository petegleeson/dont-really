#!/usr/bin/env node
import publish from "./publish";
import command from "./command";

const args = process.argv.slice(2);
const [cmd] = args;

if (cmd === "publish") {
  publish();
} else {
  command(args);
}
