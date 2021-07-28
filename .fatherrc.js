export default {
  entry: "src/index.tsx",
  esm: "rollup",
  cjs: "rollup",
  umd: {
    name: "index",
    minFile: false,
  },
  extractCSS: true,
  runtimeHelpers: true,
};
