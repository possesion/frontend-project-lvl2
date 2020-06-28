import yaml from 'js-yaml';
import path from 'path';
import fs from 'fs';

const parsers = (url) => {
  let res;
  const type = path.extname(url);
  const curDir = process.cwd();
  const link = path.resolve(curDir, url);
  if (type === '.yaml') {
    res = yaml.safeLoad(fs.readFileSync(link, 'utf8'));
  }
  if (type === '.json') {
    res = JSON.parse(fs.readFileSync(link, 'utf8'));
  }
  return res;
};

export default parsers;
