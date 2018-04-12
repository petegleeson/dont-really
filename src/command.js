import fs from "fs";
import path from "path";
import { run, getRegistryUrl } from "./common";

const usingYarn = () => fs.existsSync(path.join(process.cwd(), "yarn.lock"));

// figures out whether the package uses yarn or npm
// inserts the --registry flag and runs whatever command was
const command = async args => {
  const program = usingYarn() ? "yarn" : "npm";
  const [cmd, ...rest] = args;
  const url = await getRegistryUrl();
  const result = await run(
    program + " " + cmd + " --registry " + url + " " + rest.join(" ")
  );
};

export default command;
