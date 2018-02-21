import { exec } from "child_process";

export const run = command =>
  new Promise((resolve, reject) =>
    exec(command, (error, stdout = "", stderr = "") => {
      if (error) {
        reject(error);
      } else {
        resolve(stderr + stdout);
      }
    })
  );

export const getRegistryUrl = async () => {
  // ports looks like 0.0.0.0:32768->4873/tcp
  const ports = await run(
    'docker ps --filter ancestor=verdaccio/verdaccio --format "{{.Ports}}"'
  );
  // includes the colon
  const port = ports.match(":\\d*");
  if (!port) {
    throw "unable to find verdaccio container";
  }
  return "http://localhost" + port;
};
