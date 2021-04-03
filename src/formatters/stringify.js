export default (data) => JSON.stringify(data, null, 2);

// Собственный Stringify  в процессе написания
// const stringify = (value, replacer = ' ', spacesCount = 2) => {
//   const iter = (currentValue, depth) => {
//     if (typeof currentValue !== 'object') {
//       return `"${currentValue.toString()}",`;
//     }

//     const deepIndentSize = depth + spacesCount;
//     const deepIndent = replacer.repeat(deepIndentSize);
//     const currentIndent = replacer.repeat(depth);
//     const lines = Object.entries(currentValue).map(
//       ([key, val]) => `${deepIndent}"${key}": ${iter(val, deepIndentSize)}`,
//     );

//     return ['{', ...lines, `${currentIndent}}`].join('\n');
//   };

//   return iter(value, 0);
// };

// export default stringify;
