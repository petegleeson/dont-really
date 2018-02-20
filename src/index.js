#!/usr/bin/env node
import publish from "./publish";

const [command] = process.argv.slice(2);

if (command === "publish") {
  publish();
}
