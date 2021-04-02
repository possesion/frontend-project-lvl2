import _ from "lodash";

const indent = " ".repeat(4);
const getIndent = (count) => indent.repeat(count);
const getDepth = (lines, spaces) => ["{", ...lines, `${spaces}}`].join("\n");

const getSubstr = (data, depth) => {
  if (!_.isObject(data)) {
    return data;
  }
  const lines = Object.entries(data).map(([key, value]) => {
    const nestedValue = getSubstr(value, depth + 1);
    return `${getIndent(depth)}${indent}${key}: ${nestedValue}`;
  });
  return getDepth(lines, getIndent(depth));
};

const styleDiff = (node, depth, hasChildren) => {
  const indent = getIndent(depth);
  const { key, type, value, value1, value2, children } = node;
  const nestedValue = getSubstr(value, depth);
  const nestedValue1 = getSubstr(value1, depth);
  const nestedValue2 = getSubstr(value2, depth);
  switch (type) {
    case "parent":
      return `${indent}${key}: {\n${hasChildren(
        children,
        depth + 1
      )}\n${indent}}`;
    case "modified":
      return [
        `${indent}- ${key}: ${nestedValue1}`,
        `${indent}+ ${key}: ${nestedValue2}`,
      ];
    case "added":
      return `${indent}+ ${key}: ${nestedValue}`;
    case "deleted":
      return `${indent}- ${key}: ${nestedValue}`;
    case "unchanged":
      return `${indent}${key}: ${nestedValue}`;
    default:
      throw new Error(`Unknown type: ${type}`);
  }
};

export default (tree) => {
  const iter = (subtree, depth = 1) =>
    subtree.flatMap((node) => styleDiff(node, depth, iter)).join("\n");
  return `{\n${iter(tree)}\n}`;
};
