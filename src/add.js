import fs from "fs";
import path from "path";
import { run, getRegistryUrl } from "./common";

const usingYarn = () => fs.existsSync(path.join(process.cwd(), "yarn.lock"));

const add = async args => {
  const packageName = args.pop();
  const command = usingYarn() ? "yarn add " : "npm install ";
  const url = await getRegistryUrl();
  const result = await run(
    command + args.join(" ") + "--registry " + url + " " + packageName
  );
};

export default add;
