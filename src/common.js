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
