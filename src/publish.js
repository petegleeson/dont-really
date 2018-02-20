import fs from "fs";
import path from "path";
import { exec } from "child_process";
import semver from "semver";
import fetch from "node-fetch";
import { url, postfix } from "./config";

const promiseExec = command =>
  new Promise((resolve, reject) =>
    exec(command, (error, stdout, stderr) => {
      if (error) {
        reject(error);
      } else if (stderr) {
        reject(stderr);
      } else {
        resolve(stdout);
      }
    })
  );

const publish = async args => {
  // get the real information about the package
  const packageJsonPath = path.join(process.cwd(), "package.json");
  const original = fs.readFileSync(packageJsonPath, {
    encoding: "utf-8"
  });
  const packageJson = JSON.parse(original);
  const { name, version } = packageJson;
  // find the package on local registry
  const info = await fetch(url + "/" + name).then(resp => resp.json());
  const tags = info["dist-tags"];
  const currentVersion = tags ? tags.latest : version;
  // increment the latest version and write it to package json
  const nextVersion = semver.inc(currentVersion, "patch");
  const nextPackageJson = Object.assign({}, packageJson, {
    version: nextVersion
  });
  fs.writeFileSync(packageJsonPath, JSON.stringify(nextPackageJson, null, 2));
  try {
    // publish the new version to local registry
    const publishResult = await promiseExec("npm publish --registry " + url);
    console.log("published " + publishResult.trim() + " 🙌");
  } finally {
    // reset the package json
    fs.writeFileSync(packageJsonPath, original);
  }
};

export default publish;
