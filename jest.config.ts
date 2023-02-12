import type { Config } from "@jest/types";

const config: Config.InitialOptions = {
  preset: "ts-jest",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  snapshotFormat: {
    compareKeys: null,
  },
};

export default config;
