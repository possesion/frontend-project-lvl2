import _ from 'lodash';

const indentation = ' '.repeat(2);
const getIndent = (count) => indentation.repeat(count);
const getDepth = (lines, spaces) => ['{', ...lines, `${spaces}}`].join('\n');

const getSubstr = (data, depth) => {
  if (!_.isObject(data)) {
    return data;
  }
  const lines = Object.entries(data).map(([key, value]) => {
    const nestedValue = getSubstr(value, depth + 2);
    return `  ${getIndent(depth + 2)}${key}: ${nestedValue}`;
  });
  return getDepth(lines, getIndent(depth + 1));
};

const styleDiff = (node, depth, hasChildren) => {
  const indent = getIndent(depth);
  const {
    key, type, value, value1, value2, children,
  } = node;
  const diffValue = getSubstr(value, depth);
  const file1Value = getSubstr(value1, depth);
  const file2Value = getSubstr(value2, depth);
  switch (type) {
    case 'parent':
      return `${indent}  ${key}: {\n${hasChildren(
        children,
        depth + 1,
      )}\n  ${indent}}`;
    case 'modified':
      return [
        `${indent}- ${key}: ${file1Value}`,
        `${indent}+ ${key}: ${file2Value}`,
      ];
    case 'added':
      return `${indent}+ ${key}: ${diffValue}`;
    case 'deleted':
      return `${indent}- ${key}: ${diffValue}`;
    case 'unchanged':
      return `${indent}  ${key}: ${diffValue}`;
    default:
      throw new Error(`Unknown type: ${type}`);
  }
};

export default (tree) => {
  const iter = (subtree, depth = 0) => subtree.flatMap((node) => styleDiff(node, depth + 1, iter)).join('\n');
  return `{\n${iter(tree)}\n}`;
};
