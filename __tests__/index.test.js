import { test, expect } from '@jest/globals';
import compareObjects from '../src/index.js';

const eg1 = '{\n  host: hexlet.io\n- follow: false\n- proxy: 123.234.53.22\n- timeout: 50\n+ timeout: 20\n+ verbose: true\n}';

test('string test', () => {
    expect(compareObjects('src/before.json', 'src/after.json')).toMatch(eg1)});

// test('string test', () => {
//     expect(typeof(compareObjects('src/before.json', 'src/after.json'))).toBe(typeof(String))});

// test('first test', () => {
//     expect(compareObjects('src/before.json', 'src/after.json')).toMatch();
// });
