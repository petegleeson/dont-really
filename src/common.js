import { exec, spawn } from "child_process";

export const run = command =>
  new Promise((resolve, reject) => {
    const [name, ...args] = command.split(" ");
    const program = spawn(name, args, {
      stdio: "inherit",
      cwd: process.cwd(),
      env: process.env
    });
    program.on("error", err => reject(err));
    program.on("close", code => (code === 0 ? resolve() : reject(code)));
  });

export const getRegistryUrl = async () => {
  // ports looks like 0.0.0.0:32768->4873/tcp
  const ports = await new Promise((resolve, reject) => {
    exec(
      'docker ps --filter ancestor=verdaccio/verdaccio --format "{{.Ports}}"',
      (error, stdout, stderr) => {
        if (error) {
          reject(error);
        } else if (stderr) {
          reject(stderr);
        } else {
          resolve(stdout);
        }
      }
    );
  });
  // includes the colon
  const port = ports.match(":\\d*");
  if (!port) {
    throw "unable to find verdaccio container";
  }
  return "http://localhost" + port;
};
