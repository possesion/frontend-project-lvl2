import _ from "lodash";

const getSubstr = (value) => {
  if (_.isPlainObject(value)) {
    return "[complex value]";
  }
  if (_.isString(value)) {
    return `'${value}'`;
  }
  return value;
};

const getDataInPlainType = (tree, parent = "") => {
  return tree.flatMap((node) => {
    const { key, type, value, value1, value2, children } = node;
    const propName = `${parent}${key}`;
    const newParent = `${propName}.`;
    switch (type) {
      case "parent":
        return getDataInPlainType(children, newParent);
      case "modified":
        return `Property '${propName}' was updated. From ${getSubstr(
          value1
        )} to ${getSubstr(value2)}`;
      case "added":
        return `Property '${propName}' was added with value: ${getSubstr(
          value
        )}`;
      case "deleted":
        return `Property '${propName}' was removed`;
      case "unchanged":
        return [];
      default:
        throw new Error(`Unknown type: ${type}`);
    }
  });
};

export default (tree) => getDataInPlainType(tree).join("\n");
