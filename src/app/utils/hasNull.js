export const hasNull = (object) => {
  let isnull = false;

  Object.values(object).map((e) => {
    if (!e) {
      isnull = true;
    }
    return [];
  });

  return isnull;
};
