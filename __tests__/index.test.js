import { test, expect } from '@jest/globals';
import compareObjects from '../src/index.js';

const example = '{\n  host: hexlet.io\n- follow: false\n- proxy: 123.234.53.22\n- timeout: 50\n+ timeout: 20\n+ verbose: true\n}';
const example2 = '{\n  host: hexlet.io\n + timeout: 20\n+ verbose: true\n- follow: false\n- proxy: 123.234.53.22\n- timeout: 50\n}';

describe('compare different formats', () => {
  test('compare json', () => {
    expect(compareObjects('__tests__/fixtures/before.json', '__tests__/fixtures/after.json')).toMatch(example);
  });

  test('wrong test', () => {
    expect(compareObjects('__tests__/fixtures/before.json', '__tests__/fixtures/after.json')).not.toMatch(example2);
  });

  test('compare yaml', () => {
    expect(compareObjects('__tests__/fixtures/before.yaml', '__tests__/fixtures/after.yaml')).toMatch(example);
  });

  test('compare ini', () => {
    expect(compareObjects('__tests__/fixtures/before.yaml', '__tests__/fixtures/after.yaml')).toMatch(example);
  });
});
