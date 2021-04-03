import _ from 'lodash';

const indentationSm = ' '.repeat(2);

const getIndent = (count) => indentationSm.repeat(count);

const getDepth = (lines, spaces) => ['{', ...lines, `${spaces}}`].join('\n'); // нужная скобка sett3

const getSubstr = (data, depth) => {
  if (!_.isObject(data)) {
    return data;
  }
  const lines = Object.entries(data).map(([key, value]) => {
    const nestedValuez = getSubstr(value, depth);
    // console.log('глубина', depth);
    return `  ${getIndent(depth + 2)}${key}: ${nestedValuez}`; // setting3 child ind
  });
  return getDepth(lines, getIndent(depth + 1)); // закрывающая setting3 key
};

const styleDiff = (node, depth, hasChildren) => {
  const indent = getIndent(depth);
  const {
    key, type, value, value1, value2, children,
  } = node;
  const nestedValue = getSubstr(value, depth); // setting5 child indent
  const nestedValue1 = getSubstr(value1, depth);
  const nestedValue2 = getSubstr(value2, depth);
  switch (type) {
    case 'parent':
      // console.log('dept -|', depth);
      return `${indent}  ${key}: {\n${hasChildren(
        children,
        depth + 1, // sett6 children
      )}\n  ${indent}}`; // закрывающая основного блока
    case 'modified':
      return [
        `${indent}- ${key}: ${nestedValue1}`,
        `${indent}+ ${key}: ${nestedValue2}`,
      ];
    case 'added':
      return `${indent}+ ${key}: ${nestedValue}`; // wrong naming
    case 'deleted':
      return `${indent}- ${key}: ${nestedValue}`;
    case 'unchanged':
      return `${indent}  ${key}: ${nestedValue}`; // not nested
    default:
      throw new Error(`Unknown type: ${type}`);
  }
};

export default (tree) => {
  const iter = (subtree, depth = 0) => subtree.flatMap((node) => styleDiff(node, depth + 1, iter)).join('\n');
  return `{\n${iter(tree)}\n}`;
};
