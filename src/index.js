#!/usr/bin/env node
import publish from "./publish";
import add from "./add";

const [command, ...args] = process.argv.slice(2);

if (command === "publish") {
  publish();
} else if (command === "add") {
  add(args);
}
