import formatPlain from './plain.js';
import formatJson from './stringify.js';
import formatStylish from './stylish.js';

export default (data, formatter) => {
  switch (formatter) {
    case 'json':
      return formatJson(data);
    case 'plain':
      return formatPlain(data);
    case 'stylish':
      return formatStylish(data);
    default:
      throw new Error(`Unknown formatter: ${formatter}`);
  }
};
