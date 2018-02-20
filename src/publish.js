import fs from "fs";
import path from "path";
import semver from "semver";
import fetch from "node-fetch";
import { url, postfix } from "./config";

const publish = async () => {
  // get the real information about the package
  const packageJsonPath = path.join(__dirname, "../package.json");
  const original = fs.readFileSync(packageJsonPath, {
    encoding: "utf-8"
  });
  const json = JSON.parse(original);
  const { name, version } = json;
  // find the package on the local npm
  const info = await fetch(url + "/react-select").then(resp => resp.json());
  const tags = info["dist-tags"];
  const currentVersion = tags ? tags.latest : version;
  // increment the latest version
  const nextVersion = semver.inc(currentVersion, "patch");
  const nextPackageJson = Object.assign({}, json, {
    version: nextVersion
  });
  // write the new package json
  fs.writeFileSync(packageJsonPath, JSON.stringify(nextPackageJson, null, 2));
  // console.log(nextPackageJson);
};

export default publish;
