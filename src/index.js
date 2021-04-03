import fs from 'fs';
import path from 'path';
import parse from './parsers.js';
import buildAST from './tree.js';
import formatDocument from './formatters/index.js';

const getExtension = (fileName) => path.extname(fileName).slice(1);

const parseData = (fileName) => {
  const fileExt = getExtension(fileName);
  const filePath = path.resolve(process.cwd(), fileName);
  const data = fs.readFileSync(filePath, 'utf8');
  const result = parse(data, fileExt);
  return result;
};

export default (file1, file2, formatter = 'stylish') => {
  const data1 = parseData(file1);
  const data2 = parseData(file2);
  const diffTree = buildAST(data1, data2);
  return formatDocument(diffTree, formatter);
};
