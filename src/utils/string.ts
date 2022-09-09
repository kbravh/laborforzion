export const capitalizeFirstLetter = ([first, ...rest]: string): string =>
  [first?.toUpperCase(), ...rest].join('');
