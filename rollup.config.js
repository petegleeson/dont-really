import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import hashbang from "rollup-plugin-hashbang";

export default {
  input: "src/index.js",
  output: {
    file: "dist/bundle.js",
    format: "cjs"
  },
  external: ["fs", "path", "child_process"],
  plugins: [hashbang(), resolve({ preferBuiltins: true }), commonjs()]
};
