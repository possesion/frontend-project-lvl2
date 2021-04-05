import _ from 'lodash';

const buildAST = (obj1, obj2) => {
  const firstObjKeys = Object.keys(obj1);
  const secondObjKeys = Object.keys(obj2);

  const keys = _.union(firstObjKeys, secondObjKeys).sort();
  const ast = keys.map((key) => {
    const value1 = obj1[key];
    const value2 = obj2[key];
    if (!_.hasIn(obj2, key)) {
      return { key, type: 'deleted', value: value1 };
    }
    if (!_.hasIn(obj1, key)) {
      return { key, type: 'added', value: value2 };
    }
    if (value1 === value2) {
      return { key, type: 'unchanged', value: value1 };
    }
    if (_.isPlainObject(value2) && _.isPlainObject(value1)) {
      return { key, type: 'parent', children: buildAST(value1, value2) };
    }
    return {
      key,
      type: 'modified',
      value1,
      value2,
    };
  });
  // console.log('show AST ', ast);

  return ast;
};

export default buildAST;
