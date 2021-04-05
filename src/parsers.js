import yaml from 'js-yaml';
import ini from 'ini';
import _ from 'lodash';

const isNumber = (value) => _.isString(value) && value.match(/^[0-9]/);

const makeNumberFromStr = (data) => {
  const keys = Object.keys(data);

  return keys.reduce((acc, key) => {
    const currentValue = data[key];
    const newValue = isNumber(currentValue)
      ? parseFloat(currentValue)
      : currentValue;
    if (_.isPlainObject(newValue)) {
      return { ...acc, [key]: makeNumberFromStr(newValue) };
    }
    return { ...acc, [key]: newValue };
  }, {});
};

const parse = (data, ext) => {
  switch (ext) {
    case 'yaml': {
      return yaml.safeLoad(data);
    }
    case 'yml': {
      return yaml.safeLoad(data);
    }
    case 'json': {
      return JSON.parse(data);
    }
    case 'ini': {
      return makeNumberFromStr(ini.parse(data));
    }
    default:
      throw new Error(`Unknown file extension: ${ext}`);
  }
};

export default parse;
