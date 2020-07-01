import yaml from 'js-yaml';
import path from 'path';
import fs from 'fs';
import ini from 'ini';


const parsers = (url) => {
  const curDir = process.cwd();
  const format = path.extname(url);
  const link = path.resolve(curDir, url);
  const data = fs.readFileSync(link, 'utf8');
  let parse;
  if (format === '.yaml') {
    parse = yaml.safeLoad;
  }
  if (format === '.json') {
    parse = JSON.parse;
  }
  if (format === '.ini') {
    parse = ini.parse;
  }
  return parse(data);
};

export default parsers;
