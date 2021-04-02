import yaml from "js-yaml";
import ini from "ini";
import _ from "lodash";

const isNumber = (value) => typeof value === "number";

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
    case "yaml": {
      return yaml.safeLoad(data);
    }
    case "json": {
      return JSON.parse(data);
    }
    case "ini": {
      return makeNumberFromStr(ini.parse(data));
    }
    default:
      throw new Error(`Unknown file extension: ${extname}`);
  }
};

export default parse;
