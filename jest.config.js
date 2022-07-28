//import { pathsToModuleNameMapper } from "ts-jest/dist/index.js";
var jest = require("ts-jest/dist");
//import { compilerOptions } from "./tsconfig.json";
var tsconfig = require("./tsconfig.json");

module.exports = {
  bail: true,
  clearMocks: true,
  coverageProvider: "v8",
  moduleNameMapper: jest.pathsToModuleNameMapper(
    tsconfig.compilerOptions.paths,
    {
      prefix: "<rootDir>/src/",
    }
  ),
  preset: "ts-jest",
  testMatch: ["**/*.spec.ts"],
};
