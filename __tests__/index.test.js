import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import genDiff from '../src/index.js';
// добавляем совместимость чтения пути файла
const __filepath = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filepath);
const getFixturePath = (filePath) => path.join(__dirname, '..', '__fixtures__', filePath);
let jsonResult;
let plainResult;
let stylishResult;
beforeAll(() => {
  // тут читаем файлы c правильными результатами
  jsonResult = fs.readFileSync(getFixturePath('jsonFormatter.json'), 'utf-8');
  plainResult = fs.readFileSync(getFixturePath('plainFormatter.txt'), 'utf-8');
  stylishResult = fs.readFileSync(getFixturePath('stylishFormatter.txt'), 'utf-8');
});

const extensions = ['ini', 'json', 'yaml'];
const payload = extensions.map((ext) => {
  const x = getFixturePath('file1');
  const y = getFixturePath('file2');
  return [`${x}.${ext}`, `${y}.${ext}`];
});

test.each(payload)('compare files', (file1, file2) => {
  expect(genDiff(file1, file2, 'json')).toEqual(jsonResult);
  expect(genDiff(file1, file2, 'plain')).toEqual(plainResult);
  expect(genDiff(file1, file2)).toEqual(stylishResult);
});
