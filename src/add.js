import fs from "fs";
import path from "path";
import { url } from "./config";
import { run } from "./common";

const usingYarn = () => fs.existsSync(path.join(process.cwd(), "yarn.lock"));

const add = async args => {
  const packageName = args.pop();
  const command = usingYarn() ? "yarn add " : "npm install ";
  const result = await run(
    command + args.join(" ") + " --registry " + url + " " + packageName
  );
  console.log(result);
};

export default add;
