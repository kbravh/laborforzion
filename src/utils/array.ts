export const splitArray = <T>(groups: number, items: T[]): T[][] => {
  if (groups < 1) {
    throw new Error('Group must be 1 or greater');
  }
  const collection: T[][] = [];
  let counter = 0;

  // Split into sub-arrays using modulo and columns
  while (counter < groups) {
    const set = items.filter((_, i) => i % groups === counter);
    collection.push(set);
    counter++;
  }

  return collection;
};
