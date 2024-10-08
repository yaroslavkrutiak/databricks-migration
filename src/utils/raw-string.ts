export const SQLString = (value: unknown) => {
  switch (typeof value) {
    case 'string':
      return `"${value}"`;
    case 'number':
      return `${value}`;
    case 'bigint':
      return `${value}`;
    case 'boolean':
      return `${value}`.toUpperCase();
    case 'symbol':
      throw new Error('Cannot convert symbol to raw string');
    case 'undefined':
      return '""';
    case 'object': {
      if (value instanceof Date) {
        return `"${value.toISOString()}"`;
      } else {
        throw new Error('Cannot convert object to raw string');
      }
    }
    case 'function':
      throw new Error('Cannot convert function to raw string');
  }
};
