import _ from 'lodash';
// import fs from 'fs';
// import path from 'path';
import parsers from './parsers.js';


const compareObjects = (pathOne, pathTwo) => {
  const obj1 = parsers(pathOne);
  const obj2 = parsers(pathTwo);
  // console.log(obj1);
  // console.log(obj2);
  const entries1 = Object.entries(obj1);
  const entries2 = Object.entries(obj2);
  const acc = [];
  const combinedObjects = [...entries1, ...entries2].sort();
  combinedObjects.forEach(([key, value]) => {
    if (_.has(obj1, key) && obj1[key] === obj2[key]) {
      acc.unshift(`  ${key}: ${value}`);
    }
    if (_.has(obj1, key) && obj1[key] !== value) {
      acc.push(`- ${key}: ${obj1[key]}`);
    }
    if (_.has(obj2, key) && obj1[key] !== value) {
      acc.push(`+ ${key}: ${obj2[key]}`);
    }
    if (!_.has(obj2, key)) {
      acc.push(`- ${key}: ${obj1[key]}`);
    }
  });
  const similarities = _.uniq(acc);
  const differences = similarities.join('\n');
  return `{\n${differences}\n}`;
};

export default compareObjects;
