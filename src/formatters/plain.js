import _ from 'lodash';

const getSubstr = (value) => {
  if (_.isPlainObject(value)) {
    return '[complex value]';
  }
  if (_.isString(value)) {
    return `'${value}'`;
  }
  return value;
};

const getPlainFormat = (tree, parent = '') => tree.flatMap((node) => {
  const {
    key, type, value, value1, value2, children,
  } = node;
  const prop = `${parent}${key}`;
  const newParent = `${prop}.`;
  switch (type) {
    case 'parent':
      return getPlainFormat(children, newParent);
    case 'modified':
      return `Property '${prop}' was updated. From ${getSubstr(
        value1,
      )} to ${getSubstr(value2)}`;
    case 'added':
      return `Property '${prop}' was added with value: ${getSubstr(
        value,
      )}`;
    case 'deleted':
      return `Property '${prop}' was removed`;
    case 'unchanged':
      return [];
    default:
      throw new Error(`Unknown type: ${type}`);
  }
});

export default (tree) => getPlainFormat(tree).join('\n');
