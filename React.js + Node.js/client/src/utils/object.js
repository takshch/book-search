const { assign } = Object;

export const pick = (obj1, arr) => {
  const obj2 = {};

  arr.forEach((key) => {
    const value = obj1[key];
    if (value) {
      assign(obj2, { [key]: value });
    }
  });

  return obj2;
};
