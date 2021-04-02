import { test, expect } from "@jest/globals";
import fs from "fs";
import { fileURLToPath } from "url";
import path from "path";
import genDiff from "../src/index.js";

const getFixturePath = (filePath) =>
  path.join(__dirname, "..", "__fixtures__", filePath);
const __dirname = path.dirname(__filename);
// const example =
//   "{\n  host: hexlet.io\n- follow: false\n- proxy: 123.234.53.22\n- timeout: 50\n+ timeout: 20\n+ verbose: true\n}";
// const example2 =
//   "{\n  host: hexlet.io\n + timeout: 20\n+ verbose: true\n- follow: false\n- proxy: 123.234.53.22\n- timeout: 50\n}";

describe("compare different formats", () => {
  test("compare json", () => {
    expect(
      genDiff("__tests__/fixtures/before.json", "__tests__/fixtures/after.json")
    ).toMatch(example);
  });

  test("wrong test", () => {
    expect(
      genDiff("__tests__/fixtures/before.json", "__tests__/fixtures/after.json")
    ).not.toMatch(example2);
  });

  test("compare yaml", () => {
    expect(
      genDiff("__tests__/fixtures/before.yaml", "__tests__/fixtures/after.yaml")
    ).toMatch(example);
  });

  test("compare ini", () => {
    expect(
      genDiff("__tests__/fixtures/before.yaml", "__tests__/fixtures/after.yaml")
    ).toMatch(example);
  });
});
