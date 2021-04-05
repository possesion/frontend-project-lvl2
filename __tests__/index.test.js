import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import genDiff from '../src/index.js';
// добавляем совместимость чтения пути файла
const __filepath = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filepath);
const getFixturePath = (filePath) => path.join(__dirname, '..', '__fixtures__', filePath);

// тут читаем файлы c правильными результатами
const jsonResult = fs.readFileSync(getFixturePath('jsonFormatter.json'), 'utf-8');
const plainResult = fs.readFileSync(getFixturePath('plainFormatter.txt'), 'utf-8');
const stylishResult = fs.readFileSync(getFixturePath('stylishFormatter.txt'), 'utf-8');

const extensions = ['ini', 'json', 'yaml'];
const payload = extensions.map((ext) => {
  const file1path = getFixturePath('file1');
  const file2path = getFixturePath('file2');
  return [`${file1path}.${ext}`, `${file2path}.${ext}`];
});

test.each(payload)('right functionality check', (file1, file2) => {
  expect(genDiff(file1, file2, 'json')).toEqual(jsonResult);
  expect(genDiff(file1, file2, 'plain')).toEqual(plainResult);
  expect(genDiff(file1, file2)).toEqual(stylishResult);
});
